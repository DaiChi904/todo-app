export default function Content({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="relative flex size-full grow flex-col">{children}</div>;
}
