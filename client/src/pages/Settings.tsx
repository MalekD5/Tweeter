import { useContext, useEffect } from 'react';
import { SidebarContext } from '@/context/SidebarContext';

function Settings() {
  const { setValue } = useContext(SidebarContext);

  useEffect(() => {
    setValue('Settings');
  }, []);
  return (
    <div className='border border-t-0 border-r-0 border-b-0 border-gray-500 px-2 col-start-2 col-end-4 '></div>
  );
}

export default Settings;
