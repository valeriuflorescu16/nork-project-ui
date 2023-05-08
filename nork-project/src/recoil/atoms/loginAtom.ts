import { atom } from "recoil";

export const loginAtom = atom({
  key: "loginState",
  default: localStorage.getItem("token"),
});
