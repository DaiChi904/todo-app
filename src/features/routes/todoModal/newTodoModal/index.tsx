import { useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { CheckList, Todo, useSetNewTodo } from "@/hooks/useTodo";
import getDateString from "@/utils/getDateString";

import CheckBox from "../checkBox";
import TextAreaInput from "../TextAreaInput";
import TextInput from "../TextInput";
import FooterContent from "./FooterContent";
import HeaderContent from "./HeaderContent";

export default function NewTodoModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const addTodo = useSetNewTodo();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [useCheckBox, setUseCheckBox] = useState<boolean>(false);
    const [checkList, setCheckList] = useState<CheckList[]>([]);
    const [begin, setBegin] = useState<Date | undefined>(undefined);
    const [end, setEnd] = useState<Date | undefined>(undefined);
    const [isPinned, setIsPinned] = useState<boolean>(false);

    const confirmCreate = () => {
        const id = "id" + Math.random().toString(16).slice(2);
        const createdDate = new Date();
        const newTodo: Todo = {
            id: id,
            title: title,
            content: content,
            checkList: checkList,
            begin: begin,
            end: end,
            createdAt: createdDate,
            lastEditAt: null,
            isChecked: false,
            isPinned: isPinned,
            isArchived: false,
        };
        addTodo(newTodo);
        setModal(null);
        setTitle("");
        setContent("");
    };

    return (
        <Modal isOpen={modal === "newTodo"}>
            <Page>
                <Header>
                    <HeaderContent
                        isPinned={isPinned}
                        setIsPinned={setIsPinned}
                        begin={begin}
                        setBegin={setBegin}
                        end={end}
                        setEnd={setEnd}
                    />
                </Header>
                <Content>
                    <main className="relative flex grow flex-col overflow-y-auto p-3">
                        <TextInput label="Title" subText="Within 40 letters" maxLength={40} value={title} setValue={setTitle} />
                        <TextAreaInput label="content" subText="" maxLength={undefined} value={content} setValue={setContent} />
                        <div className="relative flex w-full flex-col">
                            {useCheckBox && <CheckBox checkList={checkList} setCheckList={setCheckList} />}
                            <div className="flex flex-col">
                                <text>{begin && `Begin: ${getDateString(begin)}`}</text>
                                <text>{end && `Deadline: ${getDateString(end)}`}</text>
                            </div>
                        </div>
                    </main>
                </Content>
                <Footer>
                    <FooterContent useCheckBox={useCheckBox} setUseCheckBox={setUseCheckBox} confirmCreate={confirmCreate} />
                </Footer>
            </Page>
        </Modal>
    );
}
