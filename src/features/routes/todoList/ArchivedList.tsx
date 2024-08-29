import { Card, CardContent, CardTitle } from "@/components/elements/Card";
import { useSetModal } from "@/hooks/useModals";
import { Todo, useSetID } from "@/hooks/useTodo";

export default function ArchivedList({ todos }: { todos: Todo[] }) {
    const setModal = useSetModal();
    const setID = useSetID();

    const openDetailModal = (todo: Todo) => {
        setID(todo.id);
        setModal("detailTodo");
    };

    return (
        <div className="relative grid size-full grid-flow-row grid-cols-4 content-start overflow-scroll overflow-x-hidden pt-3">
            {todos?.map((todo) =>
                !todo.isArchived ? null : (
                    <div className="grid h-48" key={todo.id} onClick={() => openDetailModal(todo)}>
                        <Card>
                            <CardTitle>{todo?.title}</CardTitle>
                            <CardContent>{todo?.content}</CardContent>
                        </Card>
                    </div>
                ),
            )}
        </div>
    );
}
