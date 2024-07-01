import { ChangeEvent, useEffect, useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { Todo, useEditTodo, useGetID, useTodo } from "@/hooks/useTodo";

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
                        <div className="m-2">
                            <text className="text-3xl">Edit Todo</text>
                        </div>
                    </Header>
                    <Content>
                        <text className="text-center text-4xl">Failed to get todo.</text>
                    </Content>
                    <Footer>
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => setModal(null)}>
                            <text className="text-xl text-white">Close</text>
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
        const newTodo: Todo = {
            id: todo.id,
            title: title,
            content: content,
            isChecked: false,
        };
        updateTodo(getID(), newTodo);
        setModal("detailTodo");
        setTitle("");
        setContent("");
    };

    return (
        <Modal isOpen={modal === "editTodo"}>
            <Page>
                <Header>
                    <div className="m-2">
                        <text className="text-3xl">Create New Todo</text>
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
                    <div className="flex flex-row">
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl"
                            onClick={() => setModal("detailTodo")}
                        >
                            <text className="text-xl text-white">Cancel</text>
                        </button>
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => handleUpdate()}>
                            <text className="text-xl text-white">Confirm</text>
                        </button>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
