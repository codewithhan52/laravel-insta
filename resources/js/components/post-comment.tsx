import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { formatDate } from '@/lib/utils';
import posts from '@/routes/posts';
import { PostComment as PostCommentType, SharedData } from '@/types';
import { router } from '@inertiajs/react';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface PostCommentProps {
    comments: PostCommentType[];
    postId: number;
    user: SharedData['auth']['user'] | null;
}

interface CommentItemProps {
    comment: PostCommentType;
    postId: number;
    user: SharedData['auth']['user'] | null;
    isReply?: boolean;
}

const PostComment = ({ comments, postId, user }: PostCommentProps) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = (e: FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        router.post(
            posts.comment.store(postId),
            { message: newComment.trim() },
            {
                onSuccess: () => {
                    toast.success('Comment added successfully!');
                },
                onError: () => {
                    toast.error('Failed to add comment. Please try again.');
                },
                onFinish: () => {
                    setNewComment('');
                },
            },
        );
    };

    return (
        <div className="mt-2">
            <p className="text-lg font-medium text-gray-900">Comments</p>

            <div className="flex h-[140] flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto py-4">
                    {comments.length === 0 ? (
                        <div className="py-8 text-center text-gray-500">
                            <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-50" />
                            <p>No comments yet. Be the first to comment!</p>
                        </div>
                    ) : (
                        // top level comment
                        comments
                            .filter((comment) => !comment.parent_id)
                            .map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    postId={postId}
                                    user={user}
                                />
                            ))
                    )}
                </div>

                <div className="border-t bg-gray-50 p-4">
                    <form onSubmit={handleSubmitComment} className="flex gap-3">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 resize-none rounded-sm border border-gray-300 p-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={2}
                            maxLength={500}
                        />
                        <button
                            type="submit"
                            disabled={!newComment.trim()}
                            className="self-end rounded-sm bg-blue-500 p-3 text-white transition-colors hover:cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const CommentItem = ({
    comment,
    postId,
    user,
    isReply = false,
}: CommentItemProps) => {
    const getInitials = useInitials();
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isSubmittingReply, setIsSubmittingReply] = useState(false);

    const canDeleteComment = user && comment.user_id === user.id;

    const handleSubmitReply = (e: FormEvent) => {
        e.preventDefault();

        const trimmedReply = replyText.trim();
        if (!trimmedReply || isSubmittingReply) return;

        setIsSubmittingReply(true);

        router.post(
            posts.comment.reply({ post: postId, postComment: comment.id }),
            {
                message: trimmedReply,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Reply added successfully!');
                    setReplyText('');
                    setShowReplyInput(false);
                },
                onError: (errors) => {
                    if (errors.message) {
                        toast.error(errors.message);
                    } else {
                        toast.error('Failed to add reply. Please try again.');
                    }
                },
                onFinish: () => {
                    setIsSubmittingReply(false);
                },
            },
        );
    };

    const handleDeleteComment = () => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        router.delete(
            posts.comment.delete({ post: postId, postComment: comment.id }),
            {
                onSuccess: () => {
                    toast.success('Comment deleted successfully!');
                },
                onError: () => {
                    toast.error('Failed to delete comment. Please try again.');
                },
            },
        );
    };

    return (
        <div className={`${isReply ? 'ml-8' : ''}`}>
            <div className="flex gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage
                        src={comment.user?.avatar}
                        alt={comment.user?.name}
                    />
                    <AvatarFallback className="bg-neutral-200 text-xs text-black">
                        {getInitials(comment.user?.name || 'Anonymous')}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                    <div className="rounded-sm bg-gray-100 p-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                                {comment.user?.name || 'Anonymous'}
                            </div>
                            {canDeleteComment && (
                                <button
                                    onClick={handleDeleteComment}
                                    className="text-gray-400 transition-colors hover:cursor-pointer hover:text-red-500"
                                    title="Delete comment"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <p className="mt-1 text-sm break-words text-gray-700">
                            {comment.message}
                        </p>
                    </div>

                    <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span>{formatDate(comment.created_at)}</span>
                        {!isReply && (
                            <button
                                onClick={() =>
                                    setShowReplyInput(!showReplyInput)
                                }
                                className="font-medium hover:cursor-pointer hover:text-gray-700"
                            >
                                Reply
                            </button>
                        )}
                    </div>

                    {showReplyInput && !isReply && (
                        <form
                            onSubmit={handleSubmitReply}
                            className="mt-3 flex gap-2"
                        >
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${comment.user?.name}...`}
                                className="flex-1 resize-none rounded-sm border border-gray-300 p-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={2}
                                maxLength={500}
                            />
                            <div className="flex flex-col justify-center gap-1">
                                <button
                                    type="submit"
                                    disabled={
                                        !replyText.trim() || isSubmittingReply
                                    }
                                    className="rounded bg-blue-500 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >
                                    {isSubmittingReply
                                        ? 'Replying...'
                                        : 'Reply'}
                                </button>
                                <button
                                    type="button"
                                    disabled={isSubmittingReply}
                                    onClick={() => {
                                        setShowReplyInput(false);
                                        setReplyText('');
                                    }}
                                    className="rounded bg-gray-300 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* reply top level comment */}
            {!isReply && comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 space-y-3">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            postId={postId}
                            user={user}
                            isReply={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostComment;
