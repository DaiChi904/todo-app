"use client";

import { useEffect, useRef, useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/elements/Card";
import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import EditTodoModal from "@/features/routes/todo/EditTodoModal";
import NewTodoModal from "@/features/routes/todo/NewTodoModal";
import TodoDetailModal from "@/features/routes/todo/TodoDetailModal";
import TodoList from "@/features/routes/todo/TodoList";
import { useSetModal } from "@/hooks/useModals";
import useResetTodosAtom from "@/hooks/useTodo";

export default function Home() {
    const setModal = useSetModal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const reset = useResetTodosAtom();

    // Todo一覧の高さの調整（全体の画面の縦幅が100vhになるようにする。）
    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    useEffect(() => {
        if (headerRef.current === null || footerRef.current === null) return;
        setHeaderHeight(headerRef.current.offsetHeight);
        setFooterHeight(footerRef.current.offsetHeight);
    }, []);

    return (
        <>
            <Page>
                <div ref={headerRef}>
                    <Header>Header</Header>
                </div>
                <Content>
                    <div className="mt-2" style={{ height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }}>
                        <TodoList />
                    </div>
                </Content>
                <div ref={footerRef}>
                    <Footer>
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <text className="text-xl text-white">Open</text>
                        </button>
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl"
                            onClick={() => setModal("newTodo")}
                        >
                            <text className="text-xl text-white">Create</text>
                        </button>
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl" onClick={() => reset()}>
                            <text className="text-xl text-white">Reset</text>
                        </button>
                    </Footer>
                </div>
            </Page>

            <NewTodoModal />

            <TodoDetailModal />

            <EditTodoModal />

            {/**This is experimental modal */}
            <Modal isOpen={isModalOpen}>
                <Page>
                    <Header>
                        <text>test</text>
                    </Header>
                    <Content>
                        <Card>
                            <CardTitle>Title</CardTitle>
                            <CardContent>Content</CardContent>
                        </Card>
                        <Card>
                            <CardTitle>Title</CardTitle>
                            <CardContent>Content</CardContent>
                        </Card>
                    </Content>
                    <Footer>
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <text className="text-xl text-white">Close</text>
                        </button>
                    </Footer>
                </Page>
            </Modal>
        </>
    );
}
