import { create } from 'zustand';

interface ModalStore {
  isOpen: boolean;
  type: string;
  id: string;

  setIsOpen: (state: boolean) => void;
  setModalContent: (type: string, id: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  type: '',
  id: '',

  setIsOpen: (state: boolean) => set({ isOpen: state }),
  setModalContent: (type, id) => set({ type, id }),
}));
