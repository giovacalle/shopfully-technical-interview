import { IFlyer } from "@/types/flyers";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IFlyersState {
  favorites: IFlyer[];
  setFavorites: (flyer: IFlyer) => void;
}

// thanks to zustand, we can create a store that can be used in any component
// in particular, we can use it to store the favorites flyers
export const useFlyersStore = create<IFlyersState>()(
  devtools(
    persist(
      (set) => ({
        favorites: [],
        setFavorites: (flyer) =>
          set((state) => {
            const { favorites } = state;
            const newFavorites = favorites.find((f) => f.id === flyer.id)
              ? favorites.filter((f) => f.id !== flyer.id)
              : [...favorites, flyer];
            return { favorites: newFavorites };
          })
      }),
      {
        name: "flyers-favorites"
      }
    )
  )
);
