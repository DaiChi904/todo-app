export function Card({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="relative z-0 m-1 flex flex-col rounded-2xl border-2 bg-white p-2 shadow-lg transition-all duration-300 hover:z-20 hover:-translate-y-3 hover:shadow-2xl">
            {children}
        </div>
    );
}

export function CardTitle({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col">
            <text className="underline decoration-solid underline-offset-4">{children}</text>
        </div>
    );
}

export function CardContent({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex flex-col">{children}</div>;
}
