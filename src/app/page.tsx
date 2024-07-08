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

import { ListBullet } from "../../public/HeroiconsSVGs";

export default function Home() {
    const setModal = useSetModal();

    const controlMenu = useControlMenu();

    // Todo一覧の高さの調整（全体の画面の縦幅が100vhになるようにする。
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
                            <ListBullet />
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
