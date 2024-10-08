interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

export default function Modal({ children, isOpen }: Props) {
    return (
        <div
            className={
                isOpen
                    ? "fixed inset-0 z-30 flex h-screen w-screen items-center justify-center overflow-hidden bg-black"
                    : "hidden"
            }
            style={{ backgroundColor: isOpen ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)" }}
        >
            <div className="relative z-30 flex h-5/6 w-11/12 flex-col rounded-2xl bg-white shadow-2xl">{children}</div>
        </div>
    );
}
