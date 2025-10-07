import { useState, useRef } from "react";
import Image from "next/image";

type Props = {
    onFileSelect?: (file: File) => void;
    onFileUpload?: (url: string) => void;
};

export default function FileUpload({ onFileSelect }: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('File selected:', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onFileSelect?.(file);
            // Note: File upload should typically happen on form submission, not immediately on file selection
            // const { data } = await uploadMutation({
            //     variables: { file: file },
            // });
            // console.log(data, 'upload data')
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onFileSelect?.(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="w-full h-[300px] lg:h-[504px] rounded-[10px] border-2 border-dashed border-white bg-[#224957] flex flex-col items-center justify-center cursor-pointer hover:bg-[#2a5766] transition-colors relative"
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {preview ? (
                <Image src={preview!} alt="Preview" fill className="object-cover rounded-[10px]" />
            ) : (
                <div className="flex flex-col items-center gap-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_9_134)">
                            <path
                                d="M18 15V18H6V15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18ZM17 11L15.59 9.59L13 12.17V4H11V12.17L8.41 9.59L7 11L12 16L17 11Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_9_134">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p className="text-white text-sm font-normal text-center">Drop an image here</p>
                </div>
            )}
        </div>
    );
}
