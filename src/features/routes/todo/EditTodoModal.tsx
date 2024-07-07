import { ChangeEvent, useEffect, useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { Todo, useEditTodo, useGetID, useTodo } from "@/hooks/useTodo";

import { CalendarDays, Check, ChevronLeft, ListBullet, MapPin, MapPinSolid } from "../../../../public/HeroiconsSVG";

export default function EditTodoModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const getTodo = useTodo();
    const getID = useGetID();
    const todo = getTodo(getID());
    const updateTodo = useEditTodo();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setTitle(todo ? todo.title : "");
        setContent(todo ? todo.content : "");
    }, [getID(), todo]);

    // Return if it fail to get todo.
    if (!todo) {
        return (
            <Modal isOpen={modal === "editTodo"}>
                <Page>
                    <Header>
                        <div className="flex items-center">
                            <button
                                className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                                onClick={() => setModal(null)}
                            >
                                <ChevronLeft />
                            </button>
                            <div className="m-2">
                                <text className="text-3xl">Edit Todo</text>
                            </div>
                            <div className="ml-auto">
                                <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                    <CalendarDays />
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
                        <button
                            className="m-1 ml-auto size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                            onClick={() => setModal(null)}
                        >
                            <Check />
                        </button>
                    </Footer>
                </Page>
            </Modal>
        );
    }

    const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleContentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleUpdate = () => {
        const editedDate = new Date();
        const newTodo: Todo = {
            id: todo.id,
            title: title,
            content: content,
            checkList: null,
            createdAt: todo.createdAt,
            lastEditAt: editedDate,
            isChecked: todo.isChecked,
            isPinned: todo.isPinned,
            isArchived: todo.isArchived,
        };
        updateTodo(getID(), newTodo);
        setModal("detailTodo");
        setTitle("");
        setContent("");
    };

    const handlePin = () => {
        if (!todo) return;
        const pinnedTodo: Todo = { ...todo, isPinned: !todo.isPinned };
        updateTodo(getID(), pinnedTodo);
    };

    return (
        <Modal isOpen={modal === "editTodo"}>
            <Page>
                <Header>
                    <div className="flex items-center">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setModal(null)}>
                            <ChevronLeft />
                        </button>
                        <div className="m-2">
                            <text className="text-3xl">Edit Todo</text>
                        </div>
                        <div className="ml-auto">
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                <CalendarDays />
                            </button>
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => handlePin()}>
                                {todo.isPinned ? <MapPinSolid /> : <MapPin />}
                            </button>
                        </div>
                    </div>
                </Header>
                <Content>
                    <main className="relative flex flex-col p-3">
                        <div className="flex flex-col">
                            <label htmlFor="title">
                                <text className="text-sm text-sky-600/80">Title</text>
                            </label>
                            <input
                                name="title"
                                className="h-min resize-none items-center rounded-2xl border-2 border-sky-600/60 p-2 text-justify text-xl shadow-2xl"
                                value={title}
                                onChange={(e) => handleTitleInput(e)}
                                maxLength={40}
                            />
                            <text className="text-right text-xs">Within 40 letters</text>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="content">
                                <text className="text-sm text-sky-600/80">Content</text>
                            </label>
                            <textarea
                                name="content"
                                className="h-64 max-h-full resize-y items-center rounded-2xl border-2 border-sky-600/60 p-2 text-justify text-xl shadow-2xl"
                                value={content}
                                onChange={(e) => handleContentInput(e)}
                            />
                            <text className="text-right text-xs">Within 40 letters</text>
                        </div>
                    </main>
                </Content>
                <Footer>
                    <div className="flex w-full flex-row">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                            <ListBullet />
                        </button>
                        <button
                            className="m-1 ml-auto size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                            onClick={() => handleUpdate()}
                        >
                            <Check />
                        </button>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
