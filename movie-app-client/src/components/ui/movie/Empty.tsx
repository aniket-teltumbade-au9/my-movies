import Button from "../Button";

type Props = {
    onAddMovie?: () => void;
};

export default function EmptyState({ onAddMovie }: Props) {
    return (
        <div className="flex flex-col items-center justify-center flex-1 px-6 h-screen">
            <h2 className="text-white text-center text-5xl font-bold leading-[56px] mb-12">
                Your movie list is empty
            </h2>
            <Button onClick={onAddMovie} className="max-w-[202px]">
                Add a new movie
            </Button>
        </div>
    );
}
