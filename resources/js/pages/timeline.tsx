import { PostCard } from '@/components/post-card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Timeline() {
    return (
        <AppLayout>
            <Head title="Timeline" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <PostCard />
            </div>
        </AppLayout>
    );
}
