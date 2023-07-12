import { create } from "zustand";

type State = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const useStore = create<State>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export default useStore;
