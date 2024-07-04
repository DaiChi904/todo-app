import { useEffect, useRef } from "react";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
}

export default function Modal({ children, isOpen }: Props) {
    const bodyRef = useRef(document.body.style.overflow);
    useEffect(() => {
        if (isOpen) {
            bodyRef.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [isOpen]);

    return (
        <div
            id="modal"
            className={
                isOpen
                    ? "fixed inset-0 z-30 flex h-screen w-screen items-center justify-center overflow-hidden bg-black/90"
                    : "hidden"
            }
        >
            <div className="relative z-30 flex h-5/6 w-11/12 flex-col rounded-2xl bg-white shadow-2xl">{children}</div>
        </div>
    );
}
