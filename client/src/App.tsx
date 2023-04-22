import { Routes, Route } from 'react-router-dom';
import {
  Landing,
  Explore,
  Settings,
  Bookmarks,
  Profile,
  Login,
  Register
} from '@/pages';
import { Layout, Authenticated } from '@/components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='i/flow/login' element={<Login />} />
      <Route path='i/flow/register' element={<Register />} />
      <Route element={<Authenticated />}>
        <Route element={<Layout />}>
          <Route path='/explore' element={<Explore />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
