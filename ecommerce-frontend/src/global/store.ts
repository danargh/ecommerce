import { create } from "zustand";
import { UserSetting } from "@/interfaces";
import { persist } from "zustand/middleware";

export interface UserSlice {
   user: UserSetting | null;
   setUser: (user: UserSetting | null) => void;
}

export interface UIStateSlice {
   activeSidebar: boolean;
   setActiveSidebar: (nav: boolean) => void;
}

export const useUserSlice = create<UserSlice>()(
   persist(
      (set) => ({
         user: null,
         setUser: (user) => set(() => ({ user })),
      }),
      {
         name: "user",
      }
   )
);

export const useUIStateSlice = create<UIStateSlice>()((set) => ({
   activeSidebar: false,
   setActiveSidebar: (nav) => set(() => ({ activeSidebar: nav })),
}));
