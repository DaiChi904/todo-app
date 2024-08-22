export default function Footer({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex h-fit w-full flex-col self-end border-t-2">{children}</div>;
}
