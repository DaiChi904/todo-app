export default function Header({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex w-full flex-col justify-self-start border-b shadow-xl">{children}</div>;
}
