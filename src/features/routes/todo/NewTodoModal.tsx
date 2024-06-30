import { ChangeEvent, useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { Todo, useSetNewTodo } from "@/hooks/useTodo";

export default function NewTodoModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const setTodo = useSetNewTodo();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleContentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleCreate = () => {
        const id = "id" + Math.random().toString(16).slice(2);
        const newTodo: Todo = {
            id: id,
            title: title,
            content: content,
            isChecked: false,
        };
        setTodo(newTodo);
        setModal(null);
        setTitle("");
        setContent("");
    };

    return (
        <Modal isOpen={modal === "newTodo"}>
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
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => setModal(null)}>
                            <text className="text-xl text-white">Close</text>
                        </button>
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => handleCreate()}>
                            <text className="text-xl text-white">Create</text>
                        </button>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
