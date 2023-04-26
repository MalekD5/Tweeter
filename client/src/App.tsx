import { Routes, Route } from 'react-router-dom';
import {
  Landing,
  Explore,
  Settings,
  Bookmarks,
  Profile,
  Login,
  Register,
  TweetPage
} from '@/pages';
import { Layout, Authenticated, SignedOut } from '@/components';

function App() {
  return (
    <Routes>
      <Route element={<SignedOut />}>
        <Route path='/' element={<Landing />} />
        <Route path='i/flow/login' element={<Login />} />
        <Route path='i/flow/register' element={<Register />} />
      </Route>
      <Route element={<Authenticated />}>
        <Route element={<Layout />}>
          <Route path='/explore' element={<Explore />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/tweet/:id' element={<TweetPage />} />
        </Route>
      </Route>
      <Route path='/*' element={<div>Not found</div>} />
    </Routes>
  );
}

export default App;
