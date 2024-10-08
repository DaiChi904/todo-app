import Link from "next/link";

import { List, Lists } from "@/components/elements/List";
import Content from "@/components/layouts/Content";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Page from "@/components/layouts/Page";
import { useControlMenu } from "@/hooks/useMenu";
import { useSetModal } from "@/hooks/useModals";
import { useArchived } from "@/hooks/useTodo";

import { ArchiveBox, Cog8Tooth, Home, User } from "../../../../public/HeroiconsSVGs";
import Menu from "./Menu";

export default function MainMenu() {
    const setModal = useSetModal();
    const controlMenu = useControlMenu();
    const setArchived = useArchived();

    const openSetting = () => {
        controlMenu(false);
        setModal("setting");
    };

    return (
        <Menu>
            <Page>
                <Header>
                    <div className="flex justify-between">
                        <text className="p-2 text-2xl">Todo-App</text>
                        <button
                            className="m-1 w-32 rounded-2xl bg-sky-600 px-2 py-1 shadow-xl"
                            onClick={() => controlMenu(false)}
                        >
                            <text className="text-xl text-white">Close</text>
                        </button>
                    </div>
                </Header>
                <Content>
                    <Lists>
                        <List>
                            <div className="flex cursor-pointer items-center" onClick={() => setArchived(false)}>
                                <Home />
                                <text className="ml-2">Home</text>
                            </div>
                        </List>
                        <List>
                            <div className="flex cursor-pointer items-center" onClick={() => setArchived(true)}>
                                <ArchiveBox />
                                <text className="ml-2">Archive</text>
                            </div>
                        </List>
                    </Lists>
                    <Lists>
                        <List onClickFunction={() => openSetting()}>
                            <div className="flex items-center">
                                <Cog8Tooth />
                                <text className="ml-2">Setting</text>
                            </div>
                        </List>
                    </Lists>
                    <Lists>
                        <List>
                            <Link href={"https://daichi904.github.io/daichi904.com/"}>
                                <div className="flex items-center">
                                    <User />
                                    <text className="ml-2">Visit Creater&apos;s Home Page</text>
                                </div>
                            </Link>
                        </List>
                    </Lists>
                </Content>
                <Footer>
                    <text className="p-1 text-center text-lg">Copyright(C) 2024 DaiChi All Rights Reserved.</text>
                </Footer>
            </Page>
        </Menu>
    );
}
