import { SetStateAction } from "jotai";
import { Dispatch, useState } from "react";

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
                    <button
                        className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                        onClick={() => setIsSorting(!isSorting)}
                    >
                        Start Sorting
                    </button>
                </>
            ) : (
                <>
                    <SortView checkList={checkList} setCheckList={setCheckList} />
                    <button
                        className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                        onClick={() => setIsSorting(!isSorting)}
                    >
                        End Sorting
                    </button>
                </>
            )}
        </>
    );
}
