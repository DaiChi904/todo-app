import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { Todo, useDeleteTodo, useEditTodo, useGetID, useSetID, useTodo } from "@/hooks/useTodo";
import getDateString from "@/utils/getDateString";

import {
    ArchiveBoxArrowDown,
    ArrowUpTray,
    CheckBadge,
    CheckBadgeSolid,
    ChevronLeft,
    MapPin,
    MapPinSolid,
    PencilSquare,
    Trash,
} from "../../../../public/HeroiconsSVGs";

export default function TodoDetailModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const getTodo = useTodo();
    const getID = useGetID();
    const setID = useSetID();
    const updateTodo = useEditTodo();
    const deleteTodo = useDeleteTodo();

    const todo = getTodo(getID());

    const handleClose = () => {
        setModal(null);
        setID(null);
    };

    const handleDelete = () => {
        deleteTodo(getID());
        setModal(null);
    };

    const handleArchive = () => {
        if (!todo) return;
        const archivedTodo: Todo = { ...todo, isArchived: !todo.isArchived };
        updateTodo(getID(), archivedTodo);
        alert(todo.isArchived ? "Backuped" : "Archived");
    };

    const handlePin = () => {
        if (!todo) return;
        const pinnedTodo: Todo = { ...todo, isPinned: !todo.isPinned };
        updateTodo(getID(), pinnedTodo);
    };

    const handleCheck = () => {
        if (!todo) return;
        const checkedTodo: Todo = { ...todo, isChecked: !todo.isChecked };
        updateTodo(getID(), checkedTodo);
    };

    // Return if it fail to get todo.
    if (!todo) {
        return (
            <Modal isOpen={modal === "detailTodo"}>
                <Page>
                    <Header>
                        <div className="flex items-center">
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handleClose()}>
                                <ChevronLeft />
                            </button>
                            <div className="m-2">
                                <text className="text-3xl">Todo Detail</text>
                            </div>
                            <div className="ml-auto">
                                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                    <ArchiveBoxArrowDown />
                                </button>
                                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                    <MapPin />
                                </button>
                            </div>
                        </div>
                    </Header>
                    <Content>
                        <text className="mt-auto text-center text-4xl">Failed to get todo.</text>
                    </Content>
                    <Footer>
                        <div className="flex flex-row">
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                <CheckBadge />
                            </button>
                            <div className="ml-auto flex">
                                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                    <PencilSquare />
                                </button>
                                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    </Footer>
                </Page>
            </Modal>
        );
    }

    return (
        <Modal isOpen={modal === "detailTodo"}>
            <Page>
                <Header>
                    <div className="flex items-center">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setModal(null)}>
                            <ChevronLeft />
                        </button>
                        <div className="m-2">
                            <text className="text-3xl">Todo Detail</text>
                        </div>
                        <div className="ml-auto">
                            <button
                                className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                                onClick={() => handleArchive()}
                            >
                                {todo.isArchived ? <ArrowUpTray /> : <ArchiveBoxArrowDown />}
                            </button>
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handlePin()}>
                                {todo.isPinned ? <MapPinSolid /> : <MapPin />}
                            </button>
                        </div>
                    </div>
                </Header>
                <Content>
                    <text>{todo?.title}</text>
                    <text>{todo?.content}</text>
                </Content>
                <Footer>
                    <div className="flex flex-row justify-between">
                        <div id="left" className="flex">
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handleCheck()}>
                                {todo.isChecked ? <CheckBadgeSolid /> : <CheckBadge />}
                            </button>
                        </div>
                        <div id="middle" className="flex items-center">
                            <text>
                                {todo.createdAt
                                    ? `Created at ${getDateString(todo.createdAt)}`
                                    : `Edited at ${getDateString(todo.lastEditAt)}`}
                            </text>
                        </div>
                        <div id="right" className="flex">
                            <button
                                className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                                onClick={() => setModal("editTodo")}
                            >
                                <PencilSquare />
                            </button>
                            <button
                                className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                                onClick={() => handleDelete()}
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
