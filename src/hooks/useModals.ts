import { atom, useAtom, useAtomValue } from "jotai";

type Modals = null | "newTodo" | "detailTodo" | "editTodo";

const modalAtom = atom<Modals>(null);

/**
 * Get being used modal.
 */
export function useGetModal(): Modals {
    const modal = useAtomValue<Modals>(modalAtom);
    return modal;
}

/**
 * Set new modal.
 * @param newModal Modal which you want to use.
 */
export function useSetModal() {
    const [, setModal] = useAtom(modalAtom);
    return setModal;
}
