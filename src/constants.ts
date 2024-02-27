import { DisplayTabs } from "./store/gameListSlice";

export interface navItem {
  name: string;
  tabName: DisplayTabs;
  disabled: boolean;
}

export const navigation = [
  { name: "Approved", tabName: DisplayTabs.approved, disabled: false },
  { name: "Completed", tabName: DisplayTabs.completed, disabled: false },
  { name: "Pending", tabName: DisplayTabs.pending, disabled: false },
  { name: "On Sale", tabName: DisplayTabs.onSale, disabled: false },
] as navItem[];

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
