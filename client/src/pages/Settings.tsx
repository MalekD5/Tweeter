import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '@/context/SidebarContext';
import { Button } from '@/components';
import { useAuth } from '@/hooks/AuthHook';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { saveToStore, useUserStore } from '@/utils/storage';
import { useMutation, useQuery } from 'react-query';
import { getProfileData, updateProfile } from '@/api/authAPI';
import { queryClient } from '@/api/api';
import { TransformedValues, useForm } from '@mantine/form';
import validator from 'validator';
import { TextInput, Textarea, Title } from '@mantine/core';

function Settings() {
  const [changed, setChanged] = useState(false);
  const [src, setSRC] = useState<any>('');
  const { setValue } = useContext(SidebarContext);
  const { user, token } = useUserStore();
  const { isSuccess, data } = useQuery({
    queryFn: getProfileData,
    queryKey: ['Profile']
  });
  const updateInfo = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['Profile']);
    }
  });

  const form = useForm({
    initialValues: {
      username: '',
      displayname: '',
      bio: ''
    },
    validate: {
      username: (value) =>
        value &&
        validator.isLength(value, { min: 5, max: 25 }) &&
        validator.isAlphanumeric(value)
          ? null
          : 'name must be between 5-25 character long',
      displayname: (value) =>
        value && validator.isLength(value, { min: 5, max: 40 })
          ? null
          : 'displayname must be between 5-40 character long',
      bio: (value) =>
        value && validator.isLength(value, { min: 1, max: 280 })
          ? null
          : 'bio must be between 1-280 character long'
    }
  });

  useEffect(() => {
    setValue('Settings');
  }, []);

  useEffect(() => {
    setSRC(user?.pfp!);
    if (isSuccess && user) {
      form.setValues(() => ({
        username: user.username,
        displayname: user.displayname,
        bio: data.bio
      }));
    }
  }, [isSuccess]);

  type FormValues = TransformedValues<typeof form>;

  const onSubmit = async (data: FormValues) => {
    const { displayname, username, bio } = data;
    try {
      await updateInfo.mutateAsync({ displayname, username, bio });
      saveToStore({ username, displayname });
    } catch (err: any) {
      throw err;
    }
  };

  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('http://localhost:5000/api/v1/upload', {
      method: 'POST',
      body: formData,
      headers: {
        authorization: `Bearer ${token}`
      },
      credentials: 'include'
    });
    const data: any = await res.json();
    if (user)
      saveToStore({
        ...user,
        pfp: `http://localhost:5000/images/${data.name}`
      });
  };

  return (
    <div className='border border-t-0 border-b-0 border-bordergray col-start-2 col-end-4 min-h-[100vh] px-4 w-full'>
      <div className='px-4 flex backdrop-blur-lg items-center w-full h-14 sticky top-0 border-b border-b-bordergray'>
        <div className='flex gap-5 w-fit items-center'>
          <Link to='/explore' className='hover:bg-bordergray p-2 rounded-full'>
            <AiOutlineArrowLeft className='text-2xl' />
          </Link>
          <div>
            <p className='text-xl font-Bold'>Settings</p>
          </div>
        </div>
      </div>
      <div className='flex md:flex-row flex-col w-full'>
        <form
          className='w-full p-5 border-b border-b-bordergray'
          onSubmit={form.onSubmit(onSubmit)}
        >
          <Title order={3}>General Information</Title>
          <div className='flex flex-col justify-center w-1/2'>
            <TextInput
              label='Username'
              required
              {...form.getInputProps('username')}
            />
            <TextInput
              label='Displayname'
              required
              {...form.getInputProps('displayname')}
            />
            <Textarea
              label='Bio'
              maxLength={280}
              required
              autosize
              {...form.getInputProps('bio')}
            />
            <div className='mt-4'>
              <Button color='success' type='submit'>
                Save Info
              </Button>
            </div>
          </div>
        </form>
        <form
          className='flex flex-col justify-center items-center gap-2 w-full md:mt-0 mt-20'
          onSubmit={handleImageUpload}
        >
          <div>
            <p className='text-lg'>Profile Picture</p>
            <label htmlFor='img'>
              <img
                crossOrigin='anonymous'
                src={src || user?.pfp || 'defaultpfp.png'}
                alt='settings profile picture'
                className='h-28 w-28 rounded hover:cursor-pointer'
              />
            </label>
            <input
              className='hidden'
              id='img'
              name='img'
              type='file'
              accept='image/png, image/jpeg'
              onChange={(e) => {
                setChanged(true);
                let fileReader = new FileReader();
                fileReader.readAsDataURL(e.target.files![0]);
                fileReader.onload = () => {
                  setSRC(fileReader.result);
                };
              }}
            />
          </div>
          <Button disabled={!changed} type='submit'>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
