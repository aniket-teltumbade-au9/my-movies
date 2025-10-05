type Props = {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
};

export default function FormInput({ id, label, type = "text", placeholder = "", ...props }: Props) {
    return (
        <div>
            {label ? (
                <label htmlFor={id} className="sr-only">
                    {label}
                </label>
            ) : null}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="bg-[#224957] border-none text-[#fff] placeholder-white h-[45px] rounded-[10px] px-4 text-sm focus:ring-[#2BD17E] focus:border-transparent w-full"
                style={{ paddingLeft: '12px' }}
                {...props}
            />
        </div>
    );
}
