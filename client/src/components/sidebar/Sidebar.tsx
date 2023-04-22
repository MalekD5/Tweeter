import type { IconType } from 'react-icons';
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
import { useContext, useState } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { useAuth } from '@/hooks/AuthHook';
import { Modal, Divider, Textarea } from '@mantine/core';
import { useUserStore } from '@/utils/storage';
import Dropdown, { ElementType } from '../Dropdown';
import { useForm } from '@mantine/form';
import validator from 'validator';
import { useMutation } from 'react-query';
import { logoutUser } from '@/api/authAPI';
import { createTweet } from '@/api/tweetAPI';
import { queryClient } from '@/api/api';
import { LatestTweetsType } from '@common/types/Endpoints';

function Sidebar() {
  const [openModal, setModalOpen] = useState(false);
  const [reference, setReference] = useState<ElementType>(null);
  const [dropdown, setDropDown] = useState(false);
  const { logout } = useAuth();
  const logoutMutation = useMutation({
    mutationFn: logoutUser
  });
  const { result } = useUserStore();

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
                src={`${result?.pfp || 'defaultpfp.png'}`}
                alt='profile picture'
                className='w-10 h-10 object-fit rounded-full bg-white'
              />
              <div className='hidden lg:flex flex-col basis-[60%] justify-center'>
                <p className='text-md font-medium w-10/12 truncate'>
                  {result?.displayname}
                </p>
                <span className='text-sm text-gray-500'>
                  @{result?.username}
                </span>
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

function TweetModal({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm({
    initialValues: {
      text: ''
    },
    validate: {
      text: (value) =>
        validator.isLength(value, { min: 1, max: 280 })
          ? null
          : 'text length should be 1-280'
    }
  });
  const { result: user } = useUserStore();

  const addTweet = useMutation({
    mutationFn: createTweet,
    onSuccess: (data) => {
      queryClient.setQueryData<LatestTweetsType[]>(['Tweet'], (old) => [
        {
          ...user,
          ...data
        },
        ...old!
      ]);
      queryClient.setQueryData(['Tweet', data.id], data);
    }
  });

  const handleSubmit = async (data: any) => {
    const { text } = data;
    try {
      await addTweet.mutateAsync(text);
    } catch (err: any) {
      throw err;
    } finally {
      setOpen(false);
    }
  };
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      size='lg'
      closeOnClickOutside
    >
      <div className='flex w-full py-8 px-4'>
        <img
          crossOrigin='anonymous'
          className='cursor-pointer w-14 h-14 rounded-full bg-white'
          src={`${user?.pfp || 'defaultpfp.png'}`}
          alt='tweet profile picture'
        />
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className='flex flex-col min-h-16 justify-evenly pt-1 w-full ml-3'
        >
          <Textarea
            className='w-full bg-black border-none outline-none text-md resize-none overflow-hidden placeholder:text-gray-500'
            placeholder="what's happening?"
            maxLength={250}
            name='text'
            autosize
            minRows={3}
            maxRows={10}
            styles={{
              input: {
                border: 'none',
                outline: 'none'
              }
            }}
            {...form.getInputProps('text')}
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
