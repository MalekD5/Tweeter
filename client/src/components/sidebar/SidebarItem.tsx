import { SidebarContext } from '@/context/SidebarContext';
import { useContext } from 'react';
import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

type SidebarProps = {
  Icon: IconType;
  ActiveIcon?: IconType;
  to: string;
  text?: string;
  first?: boolean;
};

function SidebarItem({ Icon, ActiveIcon, to, text, first }: SidebarProps) {
  const { value } = useContext(SidebarContext);
  const bold = !first && text === value;
  return (
    <Link
      to={to}
      className={`flex items-center justify-center text-3xl ${
        first ? 'lg:px-2 lg:py-2' : 'pr-3 p-3 lg:pr-10'
      } w-fit hover:rounded-full hover:bg-bordergray`}
    >
      {bold && !!ActiveIcon ? (
        <ActiveIcon className='text-2xl lg:mr-6' />
      ) : (
        <Icon className={`text-2xl ${!first && 'lg:mr-6'}`} />
      )}
      {text && (
        <span
          className={`hidden lg:block text-xl ${
            bold ? 'font-bold' : 'font-normal'
          }`}
        >
          {text}
        </span>
      )}
    </Link>
  );
}

export default SidebarItem;
