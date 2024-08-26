import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useSetModal } from "@/hooks/useModals";
import { useSetID } from "@/hooks/useTodo";

import { ArchiveBoxArrowDown, CheckBadge, ChevronLeft, MapPin, PencilSquare, Trash } from "../../../../../public/HeroiconsSVGs";

export default function ErrorModalContent() {
    const setModal = useSetModal();
    const setID = useSetID();

    const closeModal = () => {
        setModal(null);
        setID(null);
    };
    return (
        <Page>
            <Header>
                <div className="flex items-center">
                    <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl" onClick={() => closeModal()}>
                        <ChevronLeft />
                    </button>
                    <div className="m-2">
                        <text className="text-3xl">Todo Detail</text>
                    </div>
                    <div className="ml-auto">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                            <ArchiveBoxArrowDown />
                        </button>
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                            <MapPin />
                        </button>
                    </div>
                </div>
            </Header>
            <Content>
                <text className="mt-auto text-center text-4xl">Failed to get todo.</text>
            </Content>
            <Footer>
                <div className="flex flex-row">
                    <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                        <CheckBadge />
                    </button>
                    <div className="ml-auto flex">
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                            <PencilSquare />
                        </button>
                        <button className="m-1 size-fit rounded-full bg-sky-600 p-2 shadow-2xl">
                            <Trash />
                        </button>
                    </div>
                </div>
            </Footer>
        </Page>
    );
}
