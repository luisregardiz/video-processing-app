import create from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
    persist(
        (set) => ({
            token: "",
            setToken: (token: string) => set((state) => ({ ...state, token })),
            removeToken: () => set((state) => ({ ...state, token: "" })),
        }),
        { name: "vpa-auth" }
    )
);
