import { Dispatch, SetStateAction, useMemo, useState } from "react";

import getDaysInMonth from "@/utils/getDaysInMonth";

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

interface Props {
    selectedDate: YearMonth;
    value: Date | undefined;
    setValue: Dispatch<SetStateAction<Date | undefined>>;
}

/**
 * The number of cells in this calendar compornent
 */
const NUM_OF_CELLS = 42;

export default function CalendarDays({ selectedDate, value, setValue }: Props) {
    const selectDate = (date: _Date) => {
        const _date = new Date(date.year, date.month, date.date, date.day);
        setValue(_date);
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
        <>
            {calendarDays.map((day) =>
                value &&
                `${day.year}-${day.month}-${day.date}` === `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}` ? (
                    <div
                        key={`${day.year}-${day.month}-${day.date}`}
                        className="grid border bg-sky-400"
                        onClick={() => selectDate(day)}
                    >
                        {day.date}
                    </div>
                ) : day.month === selectedDate.month ? (
                    <div
                        key={`${day.year}-${day.month}-${day.date}`}
                        className="grid border bg-lime-200"
                        onClick={() => selectDate(day)}
                    >
                        {day.date}
                    </div>
                ) : (
                    <div key={`${day.year}-${day.month}-${day.date}`} className="grid border bg-gray-500">
                        {day.date}
                    </div>
                ),
            )}
        </>
    );
}
