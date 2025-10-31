import PostComment from '@/components/post-comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { simplifyNumber } from '@/lib/utils';
import posts from '@/routes/posts';
import { Post, SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MessageCircle,
    Send,
} from 'lucide-react';
import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface PostCardProps {
    post: Post;
    displayComment?: boolean;
}

interface PostCarouselProps {
    images: {
        original: string;
        thumbnail: string;
    }[];
}

interface PostActionProps {
    post: Post;
    displayComment?: boolean;
    hideComment?: boolean;
    user: SharedData['auth']['user'] | null;
}

const PostCard = ({ post, displayComment = false }: PostCardProps) => {
    const { auth } = usePage<SharedData>().props;

    const images = post.post_images?.map((image) => ({
        original: image.image_src,
        thumbnail: image.image_src,
        loading: 'lazy',
        thumbnailLoading: 'lazy',
        originalHeight: '400',
    }));

    return (
        <div className="flex w-full flex-col gap-4 border-b bg-white pt-4 pb-10">
            <PostInformation post={post} />
            <PostCarousel images={images} />
            <PostAction
                post={post}
                hideComment={displayComment}
                user={auth.user}
            />

            <p className="text-sm leading-relaxed text-gray-600">
                {post.caption}
            </p>

            {displayComment && (
                <PostComment
                    comments={post.post_comments}
                    postId={post.id}
                    user={auth.user}
                />
            )}
        </div>
    );
};

const PostInformation = ({ post }: PostCardProps) => {
    const getInitials = useInitials();

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(post.user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="font-medium">{post.user.name}</div>
            <div>•</div>
            <div className="text-xs text-foreground">
                {new Date(post.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </div>
        </div>
    );
};

const PostCarousel = ({ images }: PostCarouselProps) => {
    return (
        <ImageGallery
            items={images}
            autoPlay={false}
            lazyLoad={true}
            infinite={false}
            showThumbnails={false}
            showIndex={false}
            showPlayButton={false}
            showFullscreenButton={false}
            showBullets={false}
            renderLeftNav={(onClick, disabled) => {
                return (
                    <button
                        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/60 p-1 shadow-sm backdrop-blur-sm hover:cursor-pointer"
                        onClick={onClick}
                        disabled={disabled}
                    >
                        <ChevronLeft color={'#242424'} />
                    </button>
                );
            }}
            renderRightNav={(onClick, disabled) => {
                return (
                    <button
                        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/60 p-1 shadow-sm backdrop-blur-sm hover:cursor-pointer"
                        onClick={onClick}
                        disabled={disabled}
                    >
                        <ChevronRight color={'#242424'} />
                    </button>
                );
            }}
        />
    );
};

const PostAction = ({ post, hideComment, user }: PostActionProps) => {
    const [isLiked, setIsLiked] = useState(post.is_liked > 0);
    const [likesCount, setLikesCount] = useState(post.post_likes_count);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLikeToggle = () => {
        if (isProcessing) return;

        const newLikedState = !isLiked;
        const countChange = newLikedState ? 1 : -1;
        const endpoint = newLikedState
            ? posts.like(post.id)
            : posts.unlike(post.id);

        setIsProcessing(true);
        setIsLiked(newLikedState);
        setLikesCount((prev) => prev + countChange);

        router.post(
            endpoint,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: [],
                onError: () => {
                    setIsLiked(!newLikedState);
                    setLikesCount((prev) => prev - countChange);
                },
                onFinish: () => setIsProcessing(false),
            },
        );
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: 'Check out this post',
                    text: post.caption,
                    url: window.location.href,
                })
                .then(() => {
                    console.log('Post shared successfully');
                })
                .catch((error) => {
                    console.error('Error sharing post:', error);
                });
        } else {
            console.log('Web Share API not supported in this browser.');
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div
                    className={`transition-colors hover:cursor-pointer ${
                        isLiked
                            ? 'text-red-600'
                            : 'text-gray-600 hover:text-gray-800'
                    } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
                    onClick={handleLikeToggle}
                >
                    <div className={'flex items-center gap-1'}>
                        <Heart
                            className={'h-5 w-5 transition-all'}
                            fill={isLiked ? 'red' : 'white'}
                        />
                        <span className={'text-[13px] text-gray-600'}>
                            {simplifyNumber(likesCount)}
                        </span>
                    </div>
                </div>

                {!hideComment && (
                    <div className="text-gray-600 hover:cursor-pointer hover:text-gray-800">
                        <Link href={posts.show(post.id)}>
                            <div className={'flex items-center gap-1'}>
                                <MessageCircle className={'h-5 w-5'} />
                                <span className={'text-[13px]'}>
                                    {simplifyNumber(post.post_comments_count)}
                                </span>
                            </div>
                        </Link>
                    </div>
                )}

                <div
                    className="text-gray-600 hover:cursor-pointer hover:text-gray-800"
                    onClick={() => handleShare()}
                >
                    <Send className={'h-5 w-5'} />
                </div>
            </div>
        </div>
    );
};

export default PostCard;
