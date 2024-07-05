import { atom, useAtomValue, useSetAtom } from "jotai";

const menuAtom = atom<boolean>(false);

/**
 * Get menu is opened or not.
 */
export function useCheckMenu(): boolean {
    const menu = useAtomValue<boolean>(menuAtom);
    return menu;
}

/**
 * Open or Close menu.
 * @param boolean
 */
export function useControlMenu() {
    const setModal = useSetAtom(menuAtom);
    return setModal;
}
