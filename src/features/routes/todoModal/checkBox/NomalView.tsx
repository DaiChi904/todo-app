import { SetStateAction } from "jotai";
import { ChangeEvent, Dispatch, useState } from "react";

import Button from "@/components/elements/Button";
import { CheckList } from "@/hooks/useTodo";

import { CheckBadge, CheckBadgeSolid, Trash } from "../../../../../public/HeroiconsSVGs";

interface Props {
    checkList: CheckList[];
    setCheckList: Dispatch<SetStateAction<CheckList[]>>;
}

export default function NomalView({ checkList, setCheckList }: Props) {
    const [isConfirmed, setIsConfirmed] = useState<boolean>(true);
    const [content, setContent] = useState("");
    const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleConfirm = () => {
        const id = "listid" + Math.random().toString(12).slice(2);
        setCheckList([...checkList, { id: id, content: content, isChecked: false }]);
        setContent("");
        setIsConfirmed(true);
    };

    const handleDelete = (target: CheckList) => {
        const pendingCheckList = checkList.filter((element) => element.id !== target.id);
        setCheckList(pendingCheckList);
    };

    return (
        <>
            <div className="flex w-full flex-col">
                {checkList?.map((element) => (
                    <div key={element.id} className="my-1 flex flex-row items-center">
                        <div>{element.isChecked ? <CheckBadgeSolid /> : <CheckBadge />}</div>
                        <div className="ml-1">
                            <text className="break-all">{element.content}</text>
                        </div>
                        <Button customStyle="m-1" onClick={() => handleDelete(element)}>
                            <Trash />
                        </Button>
                    </div>
                ))}

                {isConfirmed ? (
                    <div className="flex flex-row">
                        <Button onClick={() => setIsConfirmed(false)}>Add List</Button>
                    </div>
                ) : (
                    <>
                        <input
                            name="title"
                            className="h-min resize-none items-center rounded-2xl border-2 border-sky-600/60 p-2 text-justify text-xl shadow-2xl"
                            value={content}
                            onChange={(e) => handleTitleInput(e)}
                            maxLength={80}
                        />
                        <div className="flex flex-row">
                            <Button onClick={() => handleConfirm()}>Confirm</Button>
                            <Button onClick={() => setIsConfirmed(true)}>Cancel</Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
