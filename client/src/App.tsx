import { Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Cart from './pages/Cart';
import ForgotPassword from './pages/ForgotPassword';
import Mushrooms from './pages/Mushrooms';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './components/about/AboutBtn';

function App() {
  return (
    <>
      <About />
      <Routes>
        <Route path='/' element={<Mushrooms />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='profile' element={<PrivateRoute />}>
          <Route path='/profile/' element={<Profile />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
