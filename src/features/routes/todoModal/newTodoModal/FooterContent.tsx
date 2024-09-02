import { Dispatch, SetStateAction } from "react";

import Button from "@/components/elements/Button";

import { Check, ListBullet } from "../../../../../public/HeroiconsSVGs";

interface Props {
    useCheckBox: boolean;
    setUseCheckBox: Dispatch<SetStateAction<boolean>>;
    confirmCreate: VoidFunction;
}

export default function FooterContent({ useCheckBox, setUseCheckBox, confirmCreate }: Props) {
    return (
        <div className="flex w-full flex-row justify-between">
            <Button fullRounded onClick={() => setUseCheckBox(!useCheckBox)}>
                <ListBullet />
            </Button>
            <Button fullRounded onClick={() => confirmCreate()}>
                <Check />
            </Button>
        </div>
    );
}
