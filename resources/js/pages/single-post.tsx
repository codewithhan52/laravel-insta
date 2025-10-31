import PostCard from '@/components/post-card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Post } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function SinglePost({ post }: { post: Post }) {
    return (
        <AppLayout>
            <Head title={post.caption?.substring(0, 15)} />

            <div className="mt-6 flex h-full flex-1 flex-col items-center overflow-x-auto px-3">
                <div className="max-w-xl md:min-w-xl">
                    <div className="mb-4">
                        <Link
                            href={dashboard()}
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                            &larr; Back to Timeline
                        </Link>
                    </div>

                    <PostCard post={post} displayComment={true} />
                </div>
            </div>
        </AppLayout>
    );
}
