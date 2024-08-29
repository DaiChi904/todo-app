import { Dispatch, SetStateAction } from "react";

import { useSetModal } from "@/hooks/useModals";

import { CalendarDays, ChevronLeft, MapPin, MapPinSolid } from "../../../../../public/HeroiconsSVGs";

interface Props {
    isPinned: boolean;
    setIsPinned: Dispatch<SetStateAction<boolean>>;
}

export default function HeaderContent({ isPinned, setIsPinned }: Props) {
    const setModal = useSetModal();
    return (
        <div className="flex items-center">
            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setModal(null)}>
                <ChevronLeft />
            </button>
            <div className="m-2">
                <text className="text-3xl">Create New Todo</text>
            </div>
            <div className="ml-auto">
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                    <CalendarDays />
                </button>
                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setIsPinned(!isPinned)}>
                    {isPinned ? <MapPinSolid /> : <MapPin />}
                </button>
            </div>
        </div>
    );
}
