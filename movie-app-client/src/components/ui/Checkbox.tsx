type Props = {
    id: string;
    label?: string;
};

export default function Checkbox({ id, label }: Props) {
    return (
        <div className="flex items-center justify-center gap-2.5 pt-5 pb-6">
            <input
                type="checkbox"
                id={id}
                className="&>input:w-[18px] h-[17px] &>input:rounded-[5px] &>input:text-[#2BD17E] &>input:bg-[#224957] border-none focus:ring-0"
            />
            <label htmlFor={id} className="text-[#fff] text-sm font-normal">
                {label}
            </label>
        </div>
    );
}
