import { SetStateAction } from "jotai";
import { ChangeEvent, Dispatch, useState } from "react";

import { CheckList } from "@/hooks/useTodo";

interface Props {
    list: CheckList[];
    setList: Dispatch<SetStateAction<CheckList[]>>;
}

export default function List({ list, setList }: Props) {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(true);
    const [content, setContent] = useState("");
    const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleConfirm = () => {
        const id = "listid" + Math.random().toString(16).slice(2);
        setList([...list, { id: id, content: content, isChecked: false }]);
        setContent("");
        setIsConfirmed(true);
    };

    return (
        <>
            <text>List</text>
            <div className="flex flex-col">
                {list?.map((element) => (
                    <div key={element.id} className="flex flex-row">
                        <text>{element.content}</text>
                        <div>{element.isChecked}</div>
                    </div>
                ))}
                {isConfirmed ? (
                    <button onClick={() => setIsConfirmed(false)}>Add List</button>
                ) : (
                    <>
                        <input
                            name="title"
                            className="h-min resize-none items-center rounded-2xl border-2 border-sky-600/60 p-2 text-justify text-xl shadow-2xl"
                            value={content}
                            onChange={(e) => handleTitleInput(e)}
                            maxLength={40}
                        />
                        <button onClick={() => handleConfirm()}>Confirm</button>
                        <button onClick={() => setIsConfirmed(true)}>Cancel</button>
                    </>
                )}
            </div>
        </>
    );
}
