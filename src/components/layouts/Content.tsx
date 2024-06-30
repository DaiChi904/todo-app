export default function Content({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex w-full grow flex-col">{children}</div>;
}
