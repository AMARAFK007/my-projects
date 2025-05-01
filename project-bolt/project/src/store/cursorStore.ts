import { create } from 'zustand';

type CursorType = 'default' | 'hover' | 'text' | 'link';

type CursorState = {
  position: { x: number; y: number };
  cursorType: CursorType;
  isVisible: boolean;
  updatePosition: (x: number, y: number) => void;
  setCursorType: (type: CursorType) => void;
  setIsVisible: (visible: boolean) => void;
};

export const useCursorStore = create<CursorState>((set) => ({
  position: { x: 0, y: 0 },
  cursorType: 'default',
  isVisible: false,
  updatePosition: (x, y) => set({ position: { x, y } }),
  setCursorType: (cursorType) => set({ cursorType }),
  setIsVisible: (visible) => set({ isVisible: visible }),
}));