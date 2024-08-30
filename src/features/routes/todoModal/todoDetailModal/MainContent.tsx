import { CheckList, Todo, useEditTodo } from "@/hooks/useTodo";

import { CheckBadge, CheckBadgeSolid } from "../../../../../public/HeroiconsSVGs";
import getDateString from "@/utils/getDateString";

export default function MainContent({ todo }: { todo: Todo }) {
    const updateTodo = useEditTodo();

    const handleCheckCheckList = (todo: Todo, list: CheckList) => {
        const targetIndex = todo.checkList.findIndex((element) => element.id === list.id);
        const pendingCheckList = todo.checkList.filter((element) => element.id !== list.id);
        const newCheckList = pendingCheckList.toSpliced(targetIndex, 0, {
            id: list.id,
            content: list.content,
            isChecked: !list.isChecked,
        });
        const updatedTodo = { ...todo, checkList: newCheckList };
        updateTodo(todo.id, updatedTodo);
    };
    return (
        <>
            <text>{todo?.title}</text>
            <text>{todo?.content}</text>

            <div className="border-t">
                {todo.checkList?.map((element) => (
                    <div key={element.id} className="my-1 flex flex-row items-center">
                        <div onClick={() => handleCheckCheckList(todo, element)}>
                            {element.isChecked ? <CheckBadgeSolid /> : <CheckBadge />}
                        </div>
                        <div className="ml-1">
                            <text className="break-all">{element.content}</text>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col border-t">
                {todo.begin && <text>Begin: {getDateString(todo.begin)}</text>}
                {todo.end && <text>Deadline: {getDateString(todo.end)}</text>}
            </div>
        </>
    );
}
