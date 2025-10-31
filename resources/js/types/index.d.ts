import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface PostImage {
    id: number;
    image_src: string;
    post_id: number;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    caption?: string;
    post_likes_count: number;
    post_comments_count: number;
    is_liked: number;
    user: User;
    post_images: PostImage[];
    created_at: string;
    updated_at: string;
}

export interface PostPagination {
    current_page: number;
    data: Post[];
    first_page_url: string;
    from: number;
}
