import { useMemo, useState } from "react";

import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { CheckList, Todo, useEditTodo, useGetID, useTodo } from "@/hooks/useTodo";

import CheckBox from "../checkBox";
import ErrorModalContent from "../ErrorModalContent";
import TextAreaInput from "../TextAreaInput";
import TextInput from "../TextInput";
import FooterContent from "./FooterContent";
import HeaderContent from "./HeaderContent";

export default function EditTodoModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const getTodo = useTodo();
    const getID = useGetID();
    const todo = getTodo(getID());
    const updateTodo = useEditTodo();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [useCheckBox, setUseCheckBox] = useState<boolean>(false);
    const [checkList, setCheckList] = useState<CheckList[]>([]);

    useMemo(() => {
        setTitle(todo ? todo.title : "");
        setContent(todo ? todo.content : "");
        setUseCheckBox(todo && todo.checkList?.length > 0 ? true : false);
        setCheckList(todo && todo.checkList?.length > 0 ? todo.checkList : []);
    }, [getID(), todo]);

    // Return if it fail to get todo.
    if (!todo) {
        return (
            <Modal isOpen={modal === "editTodo"}>
                <ErrorModalContent />
            </Modal>
        );
    }

    const confirmEdit = () => {
        const editedDate = new Date();
        const newTodo: Todo = {
            id: todo.id,
            title: title,
            content: content,
            checkList: checkList,
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

    return (
        <Modal isOpen={modal === "editTodo"}>
            <Page>
                <Header>
                    <HeaderContent todo={todo} />
                </Header>
                <Content>
                    <main className="relative flex flex-col p-3">
                        <TextInput label="Title" subText="Within 40 letters" maxLength={40} value={title} setValue={setTitle} />
                        <TextAreaInput label="content" subText="" maxLength={undefined} value={content} setValue={setContent} />
                        <div className="flex w-full flex-col">
                            {useCheckBox && <CheckBox checkList={checkList} setCheckList={setCheckList} />}
                        </div>
                    </main>
                </Content>
                <Footer>
                    <FooterContent useCheckBox={useCheckBox} setUseCheckBox={setUseCheckBox} confirmEdit={confirmEdit} />
                </Footer>
            </Page>
        </Modal>
    );
}
