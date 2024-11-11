type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ICustomToastProps {
  message: string;
  type: ToastType;
}

export interface ICustomToastMotionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  visible: boolean;
}

export interface ToastStore {
  items: Toast[];
  toast: (params: ICustomToastProps) => void;
  addToast: (params: ICustomToastProps) => void;
  disposeAll: () => void;
}
