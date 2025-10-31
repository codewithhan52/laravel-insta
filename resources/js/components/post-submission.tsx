import posts from '@/routes/posts';
import { Form, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const PostSubmission = ({ mode = 'create' }: { mode?: string }) => {
    const { processing } = useForm();
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages(filesArray);
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSuccess = () => {
        toast.success('Post created successfully!');
        setSelectedImages([]);
    };

    const handlerError = () => {
        toast.error('There was an error creating the post.');
    };

    return (
        <div className="rounded-sm border p-5">
            <Form
                action={posts.create()}
                method="post"
                resetOnSuccess
                onSuccess={handleSuccess}
                onError={handlerError}
            >
                <textarea
                    name="caption"
                    placeholder="What's on your mind?"
                    className="w-full rounded-sm border border-gray-300 p-4 focus:outline-none"
                    rows={3}
                ></textarea>

                <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Add Images
                    </label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    />

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
                                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
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
                        className={`rounded-full bg-blue-500 px-4 py-2 text-white hover:cursor-pointer hover:bg-blue-600 ${processing ? 'cursor-not-allowed opacity-50' : ''}`}
                        disabled={processing}
                    >
                        Post
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default PostSubmission;
