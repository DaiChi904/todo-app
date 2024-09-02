import { SetStateAction } from "jotai";
import { Dispatch, useState } from "react";

import Button from "@/components/elements/Button";
import { CheckList } from "@/hooks/useTodo";

import NomalView from "./NomalView";
import SortView from "./SortView";

interface Props {
    checkList: CheckList[];
    setCheckList: Dispatch<SetStateAction<CheckList[]>>;
}

export default function CheckBox({ checkList, setCheckList }: Props) {
    const [isSorting, setIsSorting] = useState<boolean>(false);

    return (
        <>
            <text>Check List</text>
            {!isSorting ? (
                <>
                    <NomalView checkList={checkList} setCheckList={setCheckList} />
                    <Button onClick={() => setIsSorting(!isSorting)}>Start Sorting</Button>
                </>
            ) : (
                <>
                    <SortView checkList={checkList} setCheckList={setCheckList} />
                    <Button onClick={() => setIsSorting(!isSorting)}>End Sorting</Button>
                </>
            )}
        </>
    );
}
