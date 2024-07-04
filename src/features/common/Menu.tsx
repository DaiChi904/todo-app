import { useEffect, useRef } from "react";

import { useCheckMenu } from "@/hooks/useMenu";

export default function Menu({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const menu = useCheckMenu();

    const bodyRef = useRef(document.body.style.overflow);
    useEffect(() => {
        if (menu) {
            bodyRef.current = document.body.style.overflow;
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [menu]);

    return (
        <div
            className={
                menu
                    ? "fixed inset-0 z-30 flex h-screen w-screen items-center justify-center overflow-hidden bg-black opacity-90 transition-opacity duration-700 ease-in-out"
                    : "fixed -left-0 bg-black opacity-0 transition-opacity duration-700 ease-in-out"
            }
        >
            <div
                className={
                    menu
                        ? "fixed left-0 top-0 z-30 flex h-screen w-2/5 flex-col bg-white shadow-2xl transition-transform duration-700 ease-in-out"
                        : "fixed left-0 top-0 z-30 flex h-screen w-2/5 -translate-x-full flex-col bg-white shadow-2xl transition-transform duration-700 ease-in-out"
                }
            >
                {children}
            </div>
        </div>
    );
}
