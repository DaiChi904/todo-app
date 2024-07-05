import Modal from "@/components/elements/Modal";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useGetModal, useSetModal } from "@/hooks/useModals";
import useResetTodosAtom from "@/hooks/useTodo";

export default function SettingModal() {
    const modal = useGetModal();
    const setModal = useSetModal();

    const reset = useResetTodosAtom();

    return (
        <Modal isOpen={modal === "setting"}>
            <Page>
                <Header>
                    <div className="m-2">
                        <text className="text-3xl">Settings</text>
                    </div>
                </Header>
                <Content>
                    <div className="ml-2 flex flex-col">
                        <text className="text-xl">Data</text>
                        <button className="m-1 w-48 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl" onClick={() => reset()}>
                            <text className="text-xl text-white">Delete all todos</text>
                        </button>
                    </div>
                </Content>
                <Footer>
                    <div className="flex flex-row justify-center">
                        <button className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-2xl" onClick={() => setModal(null)}>
                            <text className="text-xl text-white">Close</text>
                        </button>
                    </div>
                </Footer>
            </Page>
        </Modal>
    );
}
