interface Props {
    customStyle?: string;
    fullRounded?: boolean;
    customWidth?: number;
    onClick: VoidFunction;
    children: React.ReactNode;
}

export default function Button({ customStyle, fullRounded, customWidth, onClick, children }: Props) {
    const width = customWidth === undefined ? 32 : customWidth;
    const defaultStyle = `m-1 w-${width} rounded-2xl bg-sky-600 px-2 py-1 shadow-xl`;
    const fullRoundedStyle = "m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl";
    const appliedStyle = customStyle ? customStyle : !fullRounded ? defaultStyle : fullRoundedStyle;
    return (
        <button className={appliedStyle} onClick={onClick}>
            <text className="text-xl">{children}</text>
        </button>
    );
}
