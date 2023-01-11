import { Routes, Route } from 'react-router-dom';
import { Layout, AuthMiddleware, PersistLoginMiddleware } from './components';
import { Home, Login } from 'pages';
import Protected from './pages/Protected';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route element={<PersistLoginMiddleware />}>
          <Route element={<AuthMiddleware />}>
            <Route path='/protected' element={<Protected />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
