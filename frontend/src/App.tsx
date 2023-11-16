import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorize from './pages/Unauthorize';
import RequireUser from './components/requireUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailVerificationPage from './pages/VerifyEmail';

function App() {
  return (
      <>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Layout />}>
            {/*<Route index element={<Profile />} />*/}
            <Route index element={<Home />} />

            {/* Private Route */}
            <Route element={<RequireUser allowedRoles={['user']} />}>
              <Route path='profile' element={<Profile />} />
            </Route>
            <Route path='unauthorized' element={<Unauthorize />} />
          </Route>
          <Route path='verifyemail' element={<EmailVerificationPage />}>
            <Route path=':verificationCode' element={<EmailVerificationPage />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </>
  );
}

export default App;