import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import { AiOutlineTwitter, AiOutlineHome, AiFillHome } from 'react-icons/ai';
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
import { useContext, useState } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { useAuth } from '@/hooks/AuthHook';
import { useUser } from '@/hooks/UserHook';
import type { User } from '@/hooks/UserHook';
import { FieldValues, useForm } from 'react-hook-form';
import { useAddTweetMutation } from '@/redux/features/tweets/tweetService';
import ResizableTextarea from '../form/ResizableTextarea';
import { Modal, Divider } from 'react-daisyui';

function Sidebar() {
  const { token, logout } = useAuth();
  const user = useUser(token);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropDown] = useState(false);

  return (
    <>
      <TweetModal open={open} setOpen={setOpen} user={user!} />
      <header className='flex flex-col justify-between pt-2.5 pb-2.5 pl-[13%] w-[29%] h-full fixed'>
        <div className='flex flex-col w-full h-1/2 justify-between'>
          <SidebarItem Icon={AiOutlineTwitter} first to='/' />
          <SidebarItem
            Icon={AiOutlineHome}
            ActiveIcon={AiFillHome}
            to='/'
            text='Home'
          />
          <SidebarItem Icon={FaHashtag} to='/explore' text='Explore' />
          <SidebarItem
            Icon={MdOutlineBookmarkBorder}
            ActiveIcon={MdOutlineBookmark}
            to='/'
            text='Bookmarks'
          />
          <SidebarItem
            Icon={MdOutlinePersonOutline}
            ActiveIcon={MdPerson}
            to='/'
            text='Profile'
          />
          <SidebarItem
            Icon={MdOutlineMore}
            ActiveIcon={MdMore}
            to='/settings'
            text='Settings'
          />
          <button
            className='w-11/12 bg-blue-500 rounded-full hover:bg-blue-400 px-2 py-4 text-md cursor-pointer font-medium mt-4 transition-colors'
            onClick={() => setOpen(true)}
          >
            Tweet
          </button>
        </div>
        <div className='w-full h-1/3 pt-36'>
          <div className='relative inline-block w-full'>
            <div className='flex justify-between items-center py-4 pr-2.5 pl-4 mr-3 hover:rounded-full hover:bg-bordergray'>
              <img
                crossOrigin='anonymous'
                src={`${user?.pfp || 'defaultpfp.png'}`}
                alt='profile picture'
                className='w-10 h-10 rounded-full bg-white'
              />
              <div className='flex flex-col basis-[60%] justify-center'>
                <span className='text-md font-medium'>{user?.username}</span>
                <span className='text-sm text-gray-500'>@{user?.username}</span>
              </div>
              <button onClick={() => setDropDown((v) => !v)}>
                <FiMoreHorizontal className='text-2xl' />
              </button>
            </div>
            {dropdown && (
              <div className='absolute bottom-[50px] w-10/12 shadow shadow-gray-500 rounded-lg mb-9 ml-2.5 py-2.5'>
                <Divider className='m-0' />
                <Link
                  to='/'
                  className='block text-red-500 font-bold w-full text-sm py-2 px-4 hover:bg-bordergray'
                  onClick={() => logout()}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

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
      className={`flex items-center text-3xl ${
        first ? 'px-2 py-2' : 'p-3 pr-10'
      } w-fit hover:rounded-full hover:bg-bordergray`}
    >
      {bold && !!ActiveIcon ? (
        <ActiveIcon className='text-2xl mr-6' />
      ) : (
        <Icon className={`text-2xl ${!first && 'mr-6'}`} />
      )}
      {text && (
        <span className={`text-xl ${bold ? 'font-bold' : 'font-normal'}`}>
          {text}
        </span>
      )}
    </Link>
  );
}

function TweetModal({
  user,
  open,
  setOpen
}: {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, handleSubmit: formSubmit } = useForm();
  const [tweet] = useAddTweetMutation();

  const onSubmit = async (data: FieldValues) => {
    const { text } = data;
    try {
      const result = await tweet({
        text
      });
      console.log(result);
    } catch (err: any) {
      throw err;
    } finally {
      setOpen(false);
    }
  };
  return (
    <Modal open={open} onClickBackdrop={() => setOpen(false)}>
      <div className='flex w-full py-8 px-4'>
        <img
          crossOrigin='anonymous'
          className='cursor-pointer w-14 h-14 rounded-full bg-white'
          src={`${user?.pfp || 'defaultpfp.png'}`}
          alt='tweet profile picture'
        />
        <form
          onSubmit={formSubmit(onSubmit)}
          className='flex flex-col min-h-16 justify-evenly pt-1 w-full ml-3'
        >
          <ResizableTextarea
            className='w-full bg-black border-none outline-none text-md resize-none overflow-hidden placeholder:text-gray-500'
            placeholder="what's happening?"
            maxLength={250}
            name='text'
            register={register}
          />
          <div className='flex gap-2 w-full justify-end mt-3 items-center'>
            <button
              type='submit'
              className='rounded-full bg-blue-500 py-4 px-6 text-sm'
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Sidebar;
