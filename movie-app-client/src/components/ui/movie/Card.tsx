import { Movie } from "./List";

export default function Card({ title, releaseYear, poster }: Movie) {
    return (
        <div style={{ padding: 8, borderRadius: 16 }} className="h-[500px] px-2 basis-[280px] bg-[#092C39] rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="w-full h-[400px] rounded-xl overflow-hidden">
                <img
                    src={poster}
                    alt={title}
                    style={{ borderRadius: 16 }}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>
            <div className="pt-2 flex flex-col flex-grow">
                <h3 className="text-white text-xl font-normal leading-8">{title}</h3>
                <p className="text-white text-sm font-normal leading-6">{releaseYear}</p>
            </div>
        </div>
    );
}
