import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components';
import { Home } from 'pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
