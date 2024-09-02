import { useCheckMenu } from "@/hooks/useMenu";

export default function Menu({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const menu = useCheckMenu();
    return (
        <div
            className={
                menu
                    ? "fixed inset-0 z-30 flex h-screen w-screen items-center justify-center overflow-hidden bg-black transition-opacity duration-700 ease-in-out"
                    : "fixed -left-0 bg-black transition-opacity duration-700 ease-in-out"
            }
            style={{ backgroundColor: menu ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0)" }}
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
