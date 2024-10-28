import { create } from 'zustand';

export interface FeedSotre {
  image: File[];
  previewImage: File[];
  content: string;
  price: string;
  showPrice: boolean;
  date: Date;

  setImage: (state: File[]) => void;
  setPreviewImage: (state: File[]) => void;
  resetImage: () => void;
  setShowPrice: () => void;
}

export const useFeedStore = create<FeedSotre>((set) => ({
  image: [],
  previewImage: [],
  content: '',
  price: '',
  showPrice: false, //false : 노출안함, true : 노출
  date: new Date(),

  setImage: (state: File[]) => set({ image: state }),
  setPreviewImage: (images: File[]) => {
    set((state) => ({
      previewImage: [...state.previewImage, ...images],
    }));
  },
  resetImage: () => set({ image: [] }),
  setShowPrice: () => set((state) => ({ showPrice: !state.showPrice })),
}));
