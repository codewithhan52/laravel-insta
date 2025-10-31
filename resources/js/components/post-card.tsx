import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { simplifyNumber } from '@/lib/utils';
import { Post } from '@/types';
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    MessageCircle,
    Send,
} from 'lucide-react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface PostCardProps {
    post: Post;
}

interface PostCarouselProps {
    images: {
        original: string;
        thumbnail: string;
    }[];
}

const PostCard = ({ post }: PostCardProps) => {
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
            <PostAction post={post} />

            <p className="text-gray-600">{post.caption}</p>
        </div>
    );
};

const PostInformation = ({ post }: PostCardProps) => {
    const getInitials = useInitials();

    return (
        <div className="flex items-center gap-3">
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

const PostAction = ({ post }: PostCardProps) => {
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
        <div className="flex items-center gap-4">
            <div
                className={`hover:cursor-pointer ${post.is_liked > 0 ? 'text-red-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
                <div className={'flex items-center gap-1'}>
                    <Heart
                        className={'h-5 w-5'}
                        fill={post.is_liked > 0 ? 'red' : 'white'}
                    />
                    <span className={'text-[13px] text-gray-600'}>
                        {simplifyNumber(post.post_likes_count)}
                    </span>
                </div>
            </div>
            <div className="text-gray-600 hover:cursor-pointer hover:text-gray-800">
                <div className={'flex items-center gap-1'}>
                    <MessageCircle className={'h-5 w-5'} />
                    <span className={'text-[13px]'}>
                        {simplifyNumber(post.post_comments_count)}
                    </span>
                </div>
            </div>
            <div
                className="text-gray-600 hover:cursor-pointer hover:text-gray-800"
                onClick={() => handleShare()}
            >
                <Send className={'h-5 w-5'} />
            </div>
        </div>
    );
};

export default PostCard;
