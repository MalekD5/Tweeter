import { Routes, Route } from 'react-router-dom';
import {Layout, AuthMiddleware, NotFound} from './components';
import { Home, Login, Register } from 'pages';
import Protected from './pages/Protected';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route element={<AuthMiddleware />}>
          <Route element={<Layout />}>
              <Route path='/protected' element={<Protected />} />
          </Route>
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
