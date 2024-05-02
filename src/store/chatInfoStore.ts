import { create } from 'zustand';

export interface ChatInfoState {
  roomId: number;
  worryId: number;
  isOwner: boolean;
  isAccepted: boolean;
  setRoomId: (id: number) => void;
  setWorryId: (id: number) => void;
  setIsOwner: (owner: boolean) => void;
  setIsAccepted: (accept: boolean) => void;
}

export const useChatInfoStore = create<ChatInfoState>((set) => ({
  roomId: 0,
  worryId: 0,
  isOwner: false,
  isAccepted: false,
  setRoomId: (id) => set(() => ({ roomId: id })),
  setWorryId: (id) => set(() => ({ worryId: id })),
  setIsOwner: (owner) => set(() => ({ isOwner: owner })),
  setIsAccepted: (accept) => set(() => ({ isAccepted: accept })),
}));
