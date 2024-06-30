export default function Button({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl">
            <text className="text-xl text-white">{children}</text>
        </button>
    );
}
