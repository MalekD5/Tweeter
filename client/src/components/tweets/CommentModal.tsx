import { addComment } from '@/api/tweetAPI';
import { useUserStore } from '@/utils/storage';
import { Modal, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from 'react-query';
import validator from 'validator';

type CommentModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  replying_to: string;
};

function CommentModal({ open, setOpen, replying_to }: CommentModalProps) {
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
  const { user } = useUserStore();

  const addCommentMut = useMutation(addComment);

  const handleSubmit = async (data: any) => {
    const { text } = data;
    try {
      await addCommentMut.mutateAsync({ text, replying_to });
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      size='lg'
      closeOnEscape
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

export default CommentModal;
