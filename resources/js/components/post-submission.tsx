import posts from '@/routes/posts';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

const PostSubmission = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        caption: '',
        images: [] as File[],
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages(filesArray);
            setData('images', filesArray);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        setSelectedImages(updatedImages);
        setData('images', updatedImages);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('caption', data.caption);

        selectedImages.forEach((image) => {
            formData.append('images[]', image);
        });

        post(posts.create(), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                setSelectedImages([]);
                reset();

                const fileInput = document.querySelector(
                    'input[type="file"]',
                ) as HTMLInputElement;

                if (fileInput) {
                    fileInput.value = '';
                }

                toast.success('Post created successfully!');
            },
            onError: () => {
                toast.error('There was an error creating the post.');
            },
        });
    };

    return (
        <div className="rounded-sm border p-5">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={data.caption}
                    onChange={(e) => setData('caption', e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full rounded-sm border border-gray-300 p-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    rows={3}
                />
                {errors.caption && (
                    <div className="mt-1 text-sm text-red-600">
                        {errors.caption}
                    </div>
                )}

                <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Add Images
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.images && (
                        <div className="mt-1 text-sm text-red-600">
                            {errors.images}
                        </div>
                    )}

                    {selectedImages.length > 0 && (
                        <div className="mt-3">
                            <p className="mb-2 text-sm text-gray-600">
                                {selectedImages.length} image(s) selected
                            </p>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                                {selectedImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            className="h-24 w-full rounded-lg border border-gray-300 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-colors hover:bg-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-3 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded-full px-4 py-2 text-white transition-colors ${
                            processing
                                ? 'cursor-not-allowed bg-gray-400'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostSubmission;
