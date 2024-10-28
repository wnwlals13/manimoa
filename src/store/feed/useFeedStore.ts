import { create } from 'zustand';

export interface FeedSotre {
  image: string[];
  previewImage: File[];
  content: string;
  price: string;
  showPrice: boolean;
  date: Date;

  setImage: (state: string[]) => void;
  setPreviewImage: (state: File[]) => void;
  resetImage: () => void;
  resetPreviewImage: () => void;
  setShowPrice: () => void;
  setContent: (state: string) => void;
  setPrice: (state: string) => void;
  setDate: (state: Date) => void;
  delPreviewImage: (state: string) => void;
}

export const useFeedStore = create<FeedSotre>((set, get) => ({
  image: [],
  previewImage: [],
  content: '',
  price: '',
  showPrice: false, //false : 노출안함, true : 노출
  date: new Date(),

  setImage: (state: string[]) => set({ image: state }),
  setPreviewImage: (images: File[]) => {
    set((state) => ({
      previewImage: [...state.previewImage, ...images],
    }));
  },
  delPreviewImage: (state: string) => {
    const deleted = get().previewImage.filter((item) => item.name !== state);
    set((state) => ({
      previewImage: deleted,
    }));
  },
  resetImage: () => set({ image: [] }),
  resetPreviewImage: () => set({ previewImage: [] }),
  setShowPrice: () => set((state) => ({ showPrice: !state.showPrice })),
  setContent: (state: string) => set({ content: state }),
  setPrice: (state: string) => set({ price: state }),
  setDate: (state: Date) => set({ date: state }),
}));
