import { SetStateAction } from "jotai";
import { Dispatch } from "react";

import Button from "@/components/elements/Button";
import { CheckList } from "@/hooks/useTodo";

import { Arrows } from "../../../../../public/HeroiconsSVGs";

interface Props {
    checkList: CheckList[];
    setCheckList: Dispatch<SetStateAction<CheckList[]>>;
}

export default function SortView({ checkList, setCheckList }: Props) {
    const insertToFoward = (id: string) => {
        const targetIndex = checkList.findIndex((element) => element.id === id);
        if (targetIndex <= 0) return;
        const pendingCheckList = checkList.filter((element) => element.id !== id);
        const newCheckList = pendingCheckList.toSpliced(targetIndex - 1, 0, checkList[targetIndex]);
        setCheckList(newCheckList);
    };

    const insertToBackward = (id: string) => {
        const targetIndex = checkList.findIndex((element) => element.id === id);
        if (targetIndex >= checkList.length) return;
        const pendingCheckList = checkList.filter((element) => element.id !== id);
        const newCheckList = pendingCheckList.toSpliced(targetIndex + 1, 0, checkList[targetIndex]);
        setCheckList(newCheckList);
    };

    return (
        <>
            <text>Check List</text>
            <div className="flex w-full flex-col">
                {checkList?.map((element) => (
                    <div key={element.id} className="my-1 flex flex-row items-center">
                        <div className="flex flex-row">
                            <Button onClick={() => insertToFoward(element.id)} fullRounded>
                                <Arrows direction={"up"} />
                            </Button>
                            <Button onClick={() => insertToBackward(element.id)} fullRounded>
                                <Arrows direction={"down"} />
                            </Button>
                        </div>
                        <div className="ml-1">
                            <text className="break-all">{element.content}</text>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
