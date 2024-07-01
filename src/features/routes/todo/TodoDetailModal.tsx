import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import { useDeleteTodo, useGetID, useSetID, useTodo } from "@/hooks/useTodo";

export default function TodoDetailModal() {
    const modal = useGetModal();
    const setModal = useSetModal();
    const getTodo = useTodo();
    const getID = useGetID();
    const setID = useSetID();
    const deleteTodo = useDeleteTodo();

    const todo = getTodo(getID());

    const handleClose = () => {
        setModal(null);
        setID(null);
    };

    const handleDelete = () => {
        deleteTodo(getID());
        setModal(null);
    };

    // Return if it fail to get todo.
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
                    <div className="flex flex-row">
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => handleClose()}>
                            <text className="text-xl text-white">Close</text>
                        </button>
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl"
                            onClick={() => setModal("editTodo")}
                        >
                            <text className="text-xl text-white">Edit</text>
                        </button>
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => handleDelete()}>
                            <text className="text-xl text-white">Delete</text>
                        </button>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
