// h-0とかにしとくといい感じにモーダル内のスクールができる。良くわからんので調査が必要

export default function Content({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className="flex h-auto w-full grow flex-col overflow-y-auto overflow-x-hidden break-words">{children}</div>;
}
