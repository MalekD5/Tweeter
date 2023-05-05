import { Affix, rem } from '@mantine/core';
import { AiOutlinePlus, AiOutlineTwitter } from 'react-icons/ai';
import TweetModal from './SidebarTweetModal';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import { FaHashtag } from 'react-icons/fa';
import {
  MdMore,
  MdOutlineBookmark,
  MdOutlineBookmarkBorder,
  MdOutlineMore,
  MdOutlinePersonOutline,
  MdPerson
} from 'react-icons/md';
import { FiFeather } from 'react-icons/fi';

function BottomSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TweetModal open={open} setOpen={setOpen} />
      <div className='fixed bottom-0 w-full bg-black'>
        <div className='w-full flex justify-center items-center md:hidden py-2 border-t border-t-bordergray '>
          <div className='w-9/12 flex justify-between items-center'>
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
          </div>
          <Affix
            className='md:hidden'
            position={{ bottom: rem(70), right: rem(25) }}
          >
            <button
              onClick={() => setOpen((v) => !v)}
              className='bg-blue-400 hover:bg-blue-500 p-4 rounded-full active:translate-y-1 active:transition-transform'
            >
              <FiFeather size='1.5rem' />
            </button>
          </Affix>
        </div>
      </div>
    </>
  );
}

export default BottomSidebar;
