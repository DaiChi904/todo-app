import { Dispatch, SetStateAction, useState } from "react";

import CalendarDays from "./CalendarDays";
import CalendarHeader from "./CalendarHeader";

type YearMonth = {
    year: number;
    month: number;
};

interface Props {
    value: Date | undefined;
    setValue: Dispatch<SetStateAction<Date | undefined>>;
}

export default function Calendar({ value, setValue }: Props) {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState<YearMonth>({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
    });

    const setNextMonth = () => {
        const numOfMonth = selectedDate.month + 1;
        numOfMonth > 11
            ? setSelectedDate({ year: selectedDate.year + 1, month: 0 })
            : setSelectedDate({ year: selectedDate.year, month: selectedDate.month + 1 });
    };
    const setPreviousMonth = () => {
        const numOfMonth = selectedDate.month - 1;
        numOfMonth < 0
            ? setSelectedDate({ year: selectedDate.year - 1, month: 11 })
            : setSelectedDate({ year: selectedDate.year, month: selectedDate.month - 1 });
    };

    return (
        <div className="flex size-fit flex-col">
            <text>
                {selectedDate.year}. {selectedDate.month + 1}
            </text>
            <div className="flex">
                <button onClick={() => setNextMonth()}>Next month</button>
                <button onClick={() => setPreviousMonth()}>Previous month</button>
            </div>
            <div className="grid grid-flow-row grid-cols-7 grid-rows-7">
                <CalendarHeader />
                <CalendarDays selectedDate={selectedDate} value={value} setValue={setValue} />
            </div>
        </div>
    );
}
