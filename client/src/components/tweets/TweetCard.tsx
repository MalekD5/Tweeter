import {
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineShareAlt
} from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';

type TweetProps = {
  img?: string;
  displayname: string;
  tag: string;
  published: string;
  text: string;
  likes?: string;
  comments?: string;
  retweets?: string;
};

function TweetCardV3({
  img,
  displayname,
  tag,
  published,
  text,
  likes,
  comments,
  retweets
}: TweetProps) {
  return (
    <div className='flex py-3 px-4 gap-2 w-full border-t border-t-bordergray border-b border-b-bordergray'>
      {/* img */}
      <img
        crossOrigin='anonymous'
        src={`http://localhost:5000/images/${img}`}
        alt='tweet profile picture'
        className='h-14 w-14 rounded-full bg-white mt-2'
      />

      <div className='basis-10/12 flex flex-col w-full py-2'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-1 text-sm'>
            <span className='font-semibold'>{displayname}</span>
            <span className='text-textgray'>
              @{tag} · {published}
            </span>
          </div>
          <FiMoreHorizontal />
        </div>
        <p className='mt-0.5 w-11/12 break-words text-sm font-normal'>{text}</p>
        <div className='w-9/12 mt-2 flex justify-between items-center'>
          <button className='flex gap-2 justify-center items-center w-fit'>
            <FaRegComment className='fill-textgray text-xl' />
            <span className='text-textgray text-xs'>{comments}</span>
          </button>
          <button className='flex gap-2 justify-center items-center w-fit'>
            <AiOutlineRetweet className='fill-textgray text-xl' />
            <span className='text-textgray text-xs'>{retweets}</span>
          </button>
          <button className='flex gap-2 justify-center items-center w-fit'>
            <AiOutlineHeart className='fill-textgray text-xl' />
            <span className='text-textgray text-xs'>{likes}</span>
          </button>
          <button className='flex gap-2 justify-center items-center w-fit'>
            <AiOutlineShareAlt className='fill-textgray text-xl' />
          </button>
        </div>
      </div>
    </div>
  );
}

TweetCardV3.defaultProps = {
  img: './defaultpfp.png',
  retweets: '',
  likes: '',
  comments: ''
};

export default TweetCardV3;
