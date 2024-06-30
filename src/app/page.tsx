"use client";

import { useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import NewTodoModal from "@/features/routes/todo/NewTodoModal";
import Todos from "@/features/routes/todo/Todos";
import { useSetModal } from "@/hooks/useModals";
import useResetTodosAtom from "@/hooks/useTodo";
import TodoDetailModal from "@/features/routes/todo/TodoDetailModal";

export default function Home() {
    const setModal = useSetModal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reset = useResetTodosAtom();

    return (
        <>
            <Page>
                <Header>Header</Header>
                <Content>
                    <Todos />
                </Content>
                <Footer>
                    <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl" onClick={() => setIsModalOpen(true)}>
                        <text className="text-xl text-white">Open</text>
                    </button>
                    <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl" onClick={() => setModal("newTodo")}>
                        <text className="text-xl text-white">Create</text>
                    </button>
                    <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl" onClick={() => reset()}>
                        <text className="text-xl text-white">Reset</text>
                    </button>
                </Footer>
            </Page>

            <NewTodoModal />

            <TodoDetailModal />

            {/**This is experimental modal */}
            <Modal isOpen={isModalOpen}>
                <Page>
                    <Header>
                        <text>test</text>
                    </Header>
                    <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl" onClick={() => setIsModalOpen(false)}>
                        <text className="text-xl text-white">Close</text>
                    </button>
                </Page>
            </Modal>
        </>
    );
}
