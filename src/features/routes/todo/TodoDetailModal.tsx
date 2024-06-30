import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { useGetID, useTodo } from "@/hooks/useTodo";

export default function TodoDetailModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const getTodo = useTodo();
    const getID = useGetID();
    const todo = getTodo(getID());

    if (!todo) {
        return (
            <Modal isOpen={modal === "detailTodo"}>
                <Page>
                    <Header>
                        <div className="m-2">
                            <text className="text-3xl">Todo Detail</text>
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

    return (
        <Modal isOpen={modal === "detailTodo"}>
            <Page>
                <Header>
                    <div className="m-2">
                        <text className="text-3xl">Todo Detail</text>
                    </div>
                </Header>
                <Content>
                    <text>{todo?.title}</text>
                    <text>{todo?.content}</text>
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
