import PostCard from '@/components/post-card';
import PostSubmission from '@/components/post-submission';
import AppLayout from '@/layouts/app-layout';
import { Post, PostPagination } from '@/types';
import { Head, InfiniteScroll } from '@inertiajs/react';

export default function Timeline({ posts }: { posts: PostPagination }) {
    return (
        <AppLayout>
            <Head title="Timeline" />

            <div className="mt-6 flex h-full flex-1 flex-col items-center overflow-x-auto px-3">
                <div className="max-w-xl">
                    <PostSubmission />

                    <InfiniteScroll
                        data="posts"
                        className="mt-6 flex flex-col gap-4"
                    >
                        {posts.data.map((post: Post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </AppLayout>
    );
}
