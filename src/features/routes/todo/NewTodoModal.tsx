import { ChangeEvent, useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { CheckList, Todo, useSetNewTodo } from "@/hooks/useTodo";

import { CalendarDays, Check, ChevronLeft, ListBullet, MapPin, MapPinSolid } from "../../../../public/HeroiconsSVGs";
import List from "./list";

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

    const [list, setList] = useState<CheckList[]>([]);

    const [isPinned, setIsPinned] = useState<boolean>(false);

    const handleCreate = () => {
        const id = "id" + Math.random().toString(16).slice(2);
        const createdDate = new Date();
        const newTodo: Todo = {
            id: id,
            title: title,
            content: content,
            checkList: [],
            createdAt: createdDate,
            lastEditAt: null,
            isChecked: false,
            isPinned: isPinned,
            isArchived: false,
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
                    <div className="flex items-center">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => setModal(null)}>
                            <ChevronLeft />
                        </button>
                        <div className="m-2">
                            <text className="text-3xl">Create New Todo</text>
                        </div>
                        <div className="ml-auto">
                            <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                                <CalendarDays />
                            </button>
                            <button
                                className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                                onClick={() => setIsPinned(!isPinned)}
                            >
                                {isPinned ? <MapPinSolid /> : <MapPin />}
                            </button>
                        </div>
                    </div>
                </Header>
                <Content>
                    <main className="relative flex grow flex-col overflow-y-auto p-3">
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
                                className="h-64 resize-y items-center rounded-2xl border-2 border-sky-600/60 p-2 text-justify text-xl shadow-2xl"
                                value={content}
                                onChange={(e) => handleContentInput(e)}
                            />
                            <text className="text-right text-xs">Within 40 letters</text>
                        </div>
                        <List list={list} setList={setList} />
                    </main>
                </Content>
                <Footer>
                    <div className="flex w-full flex-row">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                            <ListBullet />
                        </button>
                        <button
                            className="m-1 ml-auto size-fit rounded-full bg-sky-600 p-2 shadow-2xl"
                            onClick={() => handleCreate()}
                        >
                            <Check />
                        </button>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
