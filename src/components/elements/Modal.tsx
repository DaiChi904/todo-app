import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

export default function Modal({ children, isOpen }: Props) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        // Cleanup function to reset overflow when the component unmounts
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div
            id="modal"
            className={
                isOpen
                    ? "fixed inset-0 z-20 flex h-screen w-screen items-center justify-center overflow-hidden bg-black/90"
                    : "hidden"
            }
        >
            <div className="relative z-30 flex h-5/6 w-11/12 flex-col rounded-2xl bg-white shadow-2xl">{children}</div>
        </div>
    );
}
