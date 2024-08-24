import { useMemo, useState } from "react";

import getDaysInMonth from "@/utils/getDaysInMonth";

import CalendarHeader from "./CalendarHeader";

type YearMonth = {
    year: number;
    month: number;
};

type _Date = {
    year: number;
    month: number;
    date: number;
    day: number;
};

/**
 * The number of cells in this calendar compornent
 */
const NUM_OF_CELLS = 42;

export default function Calendar() {
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

    const [calendarDays, setCalenadrDays] = useState<_Date[]>([]);

    useMemo(() => {
        const baseDate = new Date(selectedDate.year, selectedDate.month, 1);
        const previousMonth: _Date[] = [];
        const currentMonth: _Date[] = [];
        const nextMonth: _Date[] = [];
        const previousYearMonth: YearMonth =
            selectedDate.month > 0
                ? { year: selectedDate.year, month: selectedDate.month - 1 }
                : { year: selectedDate.year - 1, month: 11 };
        const nextYearMonth: YearMonth =
            selectedDate.month < 11
                ? { year: selectedDate.year, month: selectedDate.month + 1 }
                : { year: selectedDate.year + 1, month: 0 };
        for (
            let date = getDaysInMonth(previousYearMonth.month);
            date > getDaysInMonth(previousYearMonth.month) - baseDate.getDay();
            date--
        ) {
            const newDate = new Date(previousYearMonth.year, previousYearMonth.month, date);
            const _newDate: _Date = {
                year: newDate.getFullYear(),
                month: newDate.getMonth(),
                date: newDate.getDate(),
                day: newDate.getDay(),
            };
            previousMonth.unshift(_newDate);
        }
        for (let date = 1; date <= getDaysInMonth(selectedDate.month); date++) {
            const newDate = new Date(selectedDate.year, selectedDate.month, date);
            const _newDate: _Date = {
                year: newDate.getFullYear(),
                month: newDate.getMonth(),
                date: newDate.getDate(),
                day: newDate.getDay(),
            };
            currentMonth.push(_newDate);
        }
        for (let date = 1; date <= NUM_OF_CELLS - previousMonth.length - currentMonth.length; date++) {
            const newDate = new Date(nextYearMonth.year, nextYearMonth.month, date);
            const _newDate: _Date = {
                year: newDate.getFullYear(),
                month: newDate.getMonth(),
                date: newDate.getDate(),
                day: newDate.getDay(),
            };
            nextMonth.push(_newDate);
        }
        setCalenadrDays([...previousMonth, ...currentMonth, ...nextMonth]);
    }, [selectedDate]);

    return (
        <div className="flex size-fit flex-col">
            <text>
                {selectedDate.year}. {selectedDate.month + 1}
            </text>
            <button onClick={() => setNextMonth()}>Next month</button>
            <button onClick={() => setPreviousMonth()}>Previous month</button>
            <div className="grid grid-flow-row grid-cols-7 grid-rows-7">
                <CalendarHeader />
                {calendarDays.map((day) =>
                    day.month === selectedDate.month ? (
                        <div key={`${day.year}-${day.month}-${day.date}`} className="grid border bg-lime-200">
                            {day.date}
                        </div>
                    ) : (
                        <div key={`${day.year}-${day.month}-${day.date}`} className="grid border">
                            {day.date}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}
