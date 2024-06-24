import { useContext } from 'react';
import { NavContext } from '../_context/nav-context';

export const useNav = () => useContext(NavContext);
