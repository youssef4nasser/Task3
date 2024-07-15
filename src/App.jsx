import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SaerchUser from './components/SaerchUser/SaerchUser.jsx';
import AddUser from './components/AddUser/AddUser.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SaerchUser /> },
    { path: "/add", element: <AddUser /> },
    { path: '*', element: <h2 className='text-center pt-5'>NOT FOUND PAGE</h2> }
  ]);
  return <>
    <RouterProvider router={router} />
  </>
}

export default App
