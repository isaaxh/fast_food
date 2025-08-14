import { create } from 'zustand';

interface GlobalState {
    showModal: boolean;
    toggleModal: () => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
    showModal: false,
    toggleModal: () => set({ showModal: (!get().showModal) }),
}));

