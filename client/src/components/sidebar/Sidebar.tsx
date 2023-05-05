import { Link } from 'react-router-dom';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaHashtag } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import {
  MdOutlinePersonOutline,
  MdOutlineMore,
  MdOutlineBookmark,
  MdOutlineBookmarkBorder,
  MdPerson,
  MdMore
} from 'react-icons/md';
import { useAuth } from '@/hooks/AuthHook';
import { Divider } from '@mantine/core';
import { useUserStore } from '@/utils/storage';
import Dropdown, { ElementType } from '../Dropdown';
import { useMutation } from 'react-query';
import { logoutUser } from '@/api/authAPI';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import TweetModal from './SidebarTweetModal';

function Sidebar() {
  const [openModal, setModalOpen] = useState(false);
  const [reference, setReference] = useState<ElementType>(null);
  const [dropdown, setDropDown] = useState(false);
  const { logout } = useAuth();
  const logoutMutation = useMutation({
    mutationFn: logoutUser
  });
  const { user } = useUserStore();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    logout();
  };

  return (
    <>
      <TweetModal open={openModal} setOpen={setModalOpen} />
      <header className='hidden md:flex flex-col justify-between pt-2.5 pb-2.5 pl-3 lg:pl-[12%] w-[7%] lg:w-[29%] h-full fixed'>
        <div className='flex flex-col items-center lg:items-start w-fit lg:w-full h-1/2 justify-between'>
          <SidebarItem Icon={AiOutlineTwitter} first to='/explore' />
          <SidebarItem Icon={FaHashtag} to='/explore' text='Explore' />
          <SidebarItem
            Icon={MdOutlineBookmarkBorder}
            ActiveIcon={MdOutlineBookmark}
            to='/bookmarks'
            text='Bookmarks'
          />
          <SidebarItem
            Icon={MdOutlinePersonOutline}
            ActiveIcon={MdPerson}
            to='/profile'
            text='Profile'
          />
          <SidebarItem
            Icon={MdOutlineMore}
            ActiveIcon={MdMore}
            to='/settings'
            text='Settings'
          />
          <button
            className='hidden lg:block w-11/12 bg-blue-500 rounded-full hover:bg-blue-400 px-2 py-4 text-md cursor-pointer font-medium mt-4 transition-colors'
            onClick={() => setModalOpen(true)}
          >
            Tweet
          </button>
        </div>
        <div className='hidden md:block w-full h-1/3 pt-36'>
          <div className='relative inline-block w-full'>
            <div
              className='flex justify-between items-center py-4 lg:pr-2.5 lg:pl-4 mr-3 hover:rounded-full hover:bg-bordergray w-full'
              ref={setReference}
            >
              <img
                crossOrigin='anonymous'
                src={`${user?.pfp || 'defaultpfp.png'}`}
                alt='profile picture'
                className='w-10 h-10 object-fit rounded-full bg-white'
              />
              <div className='hidden lg:flex flex-col basis-[60%] justify-center'>
                <p className='text-md font-medium w-10/12 truncate'>
                  {user?.displayname}
                </p>
                <span className='text-sm text-gray-500'>@{user?.username}</span>
              </div>
              <button
                className='hidden lg:block'
                onClick={() => setDropDown((v) => !v)}
              >
                <FiMoreHorizontal className='text-xl' />
              </button>
            </div>
            <Dropdown
              className='shadow shadow-gray-500 py-2.5 w-10/12 rounded-lg bg-black'
              open={dropdown}
              setOpen={setDropDown}
              reference={reference}
              placement='top'
            >
              <Divider className='m-0' />
              <Link
                to='/'
                className='block text-red-500 font-bold w-full text-sm py-2 px-4 hover:bg-bordergray'
                onClick={handleLogout}
              >
                Logout
              </Link>
            </Dropdown>
          </div>
        </div>
      </header>
    </>
  );
}

export default Sidebar;
