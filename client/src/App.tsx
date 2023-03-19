import { Routes, Route } from 'react-router-dom';
import { Landing, Explore, Settings } from '@/pages';
import Authenticated from '@/features/auth/Authenticated';
import { Layout } from '@/components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route element={<Authenticated />}>
        <Route element={<Layout />}>
          <Route path='/explore' element={<Explore />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
