import { selector } from "recoil";
import { loginAtom } from "../atoms/loginAtom";

const isLoggedIn = selector({
  key: "isLoggedIn",
  get: ({ get }) => {
    const storedToken = get(loginAtom);

    if (!!storedToken) {
      return true;
    } else return false;
  },
});

export default isLoggedIn;
