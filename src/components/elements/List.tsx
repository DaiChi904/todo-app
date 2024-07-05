interface Props {
    children: React.ReactNode;
    onClickFunction?: () => void;
}

export function List({ children, onClickFunction }: Props) {
    const _onClickFunction = onClickFunction;
    return (
        <div className="flex w-11/12 rounded-r-2xl px-2 py-1 hover:bg-sky-500" onClick={_onClickFunction}>
            <text className="text-center text-xl">{children}</text>
        </div>
    );
}

export function Lists({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex flex-col border-b-2">{children}</div>;
}
