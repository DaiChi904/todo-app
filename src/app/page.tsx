"use client";

import { useEffect, useRef, useState } from "react";

import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import MainMenu from "@/features/common/menu";
import SettingModal from "@/features/common/SettingModal";
import EditTodoModal from "@/features/routes/todo/EditTodoModal";
import NewTodoModal from "@/features/routes/todo/NewTodoModal";
import TodoDetailModal from "@/features/routes/todo/TodoDetailModal";
import TodoList from "@/features/routes/todo/TodoList";
import { useControlMenu } from "@/hooks/useMenu";
import { useSetModal } from "@/hooks/useModals";

export default function Home() {
    const setModal = useSetModal();

    const controlMenu = useControlMenu();

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
                    <Header>
                        <div className="m-2 flex p-2" onClick={() => controlMenu(true)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </div>
                    </Header>
                </div>
                <Content>
                    <div style={{ height: `calc(100vh - ${headerHeight}px - ${footerHeight}px)` }}>
                        <TodoList />
                    </div>
                </Content>
                <div ref={footerRef}>
                    <Footer>
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl"
                            onClick={() => setModal("newTodo")}
                        >
                            <text className="text-xl text-white">Create</text>
                        </button>
                    </Footer>
                </div>
            </Page>

            <NewTodoModal />

            <TodoDetailModal />

            <EditTodoModal />

            <SettingModal />

            <MainMenu />
        </>
    );
}
