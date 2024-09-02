import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components/elements/Button";
import { useSetModal } from "@/hooks/useModals";

import { CalendarDays, ChevronLeft, MapPin, MapPinSolid } from "../../../../../public/HeroiconsSVGs";
import Calendar from "../../calendar";

interface Props {
    isPinned: boolean;
    setIsPinned: Dispatch<SetStateAction<boolean>>;
    begin: Date | undefined;
    setBegin: Dispatch<SetStateAction<Date | undefined>>;
    end: Date | undefined;
    setEnd: Dispatch<SetStateAction<Date | undefined>>;
}

export default function HeaderContent({ isPinned, setIsPinned, begin, setBegin, end, setEnd }: Props) {
    const setModal = useSetModal();
    const [useCalendar, setUseCalendar] = useState(false);
    const [isBegin, setIsBegin] = useState(false);
    return (
        <>
            <div className="flex items-center">
                <Button fullRounded onClick={() => setModal(null)}>
                    <ChevronLeft />
                </Button>
                <div className="m-2">
                    <text className="text-3xl">Create New Todo</text>
                </div>
                <div className="ml-auto">
                    <Button fullRounded onClick={() => setUseCalendar(!useCalendar)}>
                        <CalendarDays />
                    </Button>
                    <Button fullRounded onClick={() => setIsPinned(!isPinned)}>
                        {isPinned ? <MapPinSolid /> : <MapPin />}
                    </Button>
                </div>
            </div>

            {useCalendar && (
                <div className="absolute z-30 flex flex-col bg-white">
                    <div className="flex">
                        <Button onClick={() => setUseCalendar(!useCalendar)}>Close</Button>
                        <Button onClick={() => setIsBegin(!isBegin)}>{isBegin ? <>Begin</> : <>End</>}</Button>
                    </div>
                    {isBegin ? (
                        <div className="relative">
                            <Calendar value={begin} setValue={setBegin} />
                        </div>
                    ) : (
                        <div className="relative">
                            <Calendar value={end} setValue={setEnd} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
