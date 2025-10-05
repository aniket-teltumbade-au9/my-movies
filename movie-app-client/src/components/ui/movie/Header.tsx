type Props = {
    onAddMovie?: () => void;
    onLogout?: () => void;
};

export default function Header({ onAddMovie, onLogout }: Props) {
    return (
        <div className="w-full h-[fit-content] flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-4">
                <h1 className="text-white text-5xl font-bold leading-[56px]">My movies</h1>
                <button
                    onClick={onAddMovie}
                    className="w-8 h-8 flex items-center justify-center"
                    aria-label="Add movie"
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_8_65)">
                            <path
                                d="M17.3334 9.33329H14.6667V14.6666H9.33335V17.3333H14.6667V22.6666H17.3334V17.3333H22.6667V14.6666H17.3334V9.33329ZM16 2.66663C8.64002 2.66663 2.66669 8.63996 2.66669 16C2.66669 23.36 8.64002 29.3333 16 29.3333C23.36 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63996 23.36 2.66663 16 2.66663ZM16 26.6666C10.12 26.6666 5.33335 21.88 5.33335 16C5.33335 10.12 10.12 5.33329 16 5.33329C21.88 5.33329 26.6667 10.12 26.6667 16C26.6667 21.88 21.88 26.6666 16 26.6666Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_8_65">
                                <rect width="32" height="32" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>

            <button
                onClick={onLogout}
                className="flex items-center gap-3 group cursor-pointer"
                aria-label="Logout"
            >
                <span className="text-white font-bold text-base">Logout</span>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_8_58)">
                        <path
                            d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
                            fill="white"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_8_58">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
}
