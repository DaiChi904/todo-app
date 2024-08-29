import { Dispatch, SetStateAction } from "react";

import { Check, ListBullet } from "../../../../../public/HeroiconsSVGs";

interface Props {
    useCheckBox: boolean;
    setUseCheckBox: Dispatch<SetStateAction<boolean>>;
    confirmEdit: VoidFunction;
}

export default function FooterContent({ useCheckBox, setUseCheckBox, confirmEdit }: Props) {
    return (
        <div className="flex w-full flex-row">
            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setUseCheckBox(!useCheckBox)}>
                <ListBullet />
            </button>
            <button className="m-1 ml-auto size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => confirmEdit()}>
                <Check />
            </button>
        </div>
    );
}
