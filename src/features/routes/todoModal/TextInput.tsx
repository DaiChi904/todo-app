import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
    label: string;
    subText?: string;
    maxLength?: number;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function TextInput({ label, subText, maxLength, value, setValue }: Props) {
    const length = maxLength ? maxLength : undefined;
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <div className="flex flex-col">
            <label htmlFor={label}>
                <text className="text-sm text-sky-600/80">{label}</text>
            </label>
            <input
                name={label}
                className="h-min resize-none items-center rounded-2xl border-2 border-sky-600/60 p-2 text-justify text-xl shadow-2xl"
                value={value}
                onChange={handleInput}
                maxLength={length}
            />
            <text className="text-right text-xs">{subText}</text>
        </div>
    );
}
