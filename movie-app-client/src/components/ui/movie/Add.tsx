import { useContext, useState } from "react";
import FileUpload from "@/components/ui/FileUpload";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../Input";
import { useMutation } from "@apollo/client/react";
import { UPLOAD_IMAGE } from "@/gql/file";
import { ADD_MOVIE } from "@/gql/movie";
import { MovieContext } from "@/Provider/movie-provider";

interface Inputs {
    title: string;
    releaseYear: string;
}

interface UploadResponse {
    uploadImage: string;
}

export default function CreateMovie() {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const router = useRouter()
    const { refetch } = useContext(MovieContext);
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()


    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const [addMovie] = useMutation(ADD_MOVIE);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            let posterUrl = '';

            // Upload image first if a file is selected
            if (selectedFile) {
                console.log('Uploading file:', selectedFile);

                // Convert file to base64
                const base64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(selectedFile);
                });
                try {
                    const uploadResult = await uploadImage({
                        variables: { file: base64 }
                    });
                    console.log('Upload result:', uploadResult);
                    posterUrl = (uploadResult.data as UploadResponse).uploadImage;
                    // Show success toast here
                } catch (uploadError) {
                    console.error('Error uploading image:', uploadError);
                    // Show error toast here
                    setLoading(false);
                    return;
                }
            }

            // Create movie with the uploaded image URL
            try {
                const movieResult = await addMovie({
                    variables: {
                        input: {
                            title: data.title,
                            releaseYear: parseInt(data.releaseYear),
                            poster: posterUrl
                        }
                    }
                });
                console.log('Movie created:', movieResult.data);
                refetch();
                router.push('/movies');
                // Show success toast here
            } catch (movieError) {
                console.error('Error creating movie:', movieError);
                // Show error toast here
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            // Show error toast here
        } finally {
            setLoading(false);
        }
    }
    const handleClose = () => {
        router.push('/movies')
    }
    return (
        <div className="h-screen p-8 lg:p-[120px_120px_80px] rounded-lg relative">
            <h2 className="text-white text-5xl font-bold leading-[56px] mb-12">
                Create a new movie
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    <div className="w-full lg:w-[473px] flex-shrink-0">
                        <FileUpload onFileSelect={setSelectedFile} />
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="w-full">
                            <FormInput
                                type="text"
                                placeholder="Title"
                                {...register("title")}
                                label="Title"
                                id="title"
                            />
                        </div>

                        <div className="w-full lg:w-auto">
                            <FormInput
                                type="date"
                                {...register("releaseYear")}
                                label="Publishing Year"
                                id="releaseYear"
                                placeholder="Publishing year"
                            />
                        </div>

                        <div className="flex gap-3 pt-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="basis-1/2 h-[56px] rounded-[10px] border border-white text-white font-bold text-base hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <Button disabled={loading} type="submit" className="basis-1/2">
                                {loading ? "Adding" : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
