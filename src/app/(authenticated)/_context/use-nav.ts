import { useContext } from "react";
import { NavContext } from ".";

export const useNav = () => useContext(NavContext);
