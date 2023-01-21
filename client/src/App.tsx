import { Routes, Route } from 'react-router-dom';
import { Layout, AuthMiddleware, NotFound } from './components';
import { Explore, Login, Register } from 'pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<AuthMiddleware />}>
        <Route element={<Layout />}>
          <Route path='/explore' element={<Explore />} />
        </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
