interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

export default function Content({ children, isOpen }: Props) {
    return (
        <div
            className={
                isOpen
                    ? "absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden bg-black/90"
                    : "hidden"
            }
        >
            <div className="relative z-30 flex h-5/6 w-11/12 flex-col rounded-2xl bg-white shadow-2xl">{children}</div>
        </div>
    );
}
