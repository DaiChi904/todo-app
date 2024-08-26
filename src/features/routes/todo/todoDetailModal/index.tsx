import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal } from "@/hooks/useModals";
import { useGetID, useTodo } from "@/hooks/useTodo";

import ErrorModalContent from "./ErrorModalContent";
import FooterContent from "./FooterContent";
import HeaderContent from "./HeaderContent";
import MainContent from "./MainContent";

export default function TodoDetailModal() {
    const modal = useGetModal();
    const getTodo = useTodo();
    const getID = useGetID();

    const todo = getTodo(getID());

    // Return if it fail to get todo.
    if (!todo) {
        return (
            <Modal isOpen={modal === "detailTodo"}>
                <ErrorModalContent />
            </Modal>
        );
    }

    return (
        <Modal isOpen={modal === "detailTodo"}>
            <Page>
                <Header>
                    <HeaderContent todo={todo} />
                </Header>
                <Content>
                    <MainContent todo={todo} />
                </Content>
                <Footer>
                    <FooterContent todo={todo} />
                </Footer>
            </Page>
        </Modal>
    );
}
