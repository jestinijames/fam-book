import React, { Fragment, Suspense } from 'react';

// React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Toastify to display tiny popups
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import LoadingSpinner from './components/Spinner';
import PrivateRoute from './components/PrivateRoute';



// Pages
const Home = React.lazy(() => import('./pages/home/Home'));
const Login = React.lazy(() => import('./pages/login/Login'));
const Register = React.lazy(() => import('./pages/register/Register'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));

const App = () => {
return (
<Fragment>
 <Router>
 <Suspense fallback={<LoadingSpinner/>}>
  <Routes>
  <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/' element={<PrivateRoute/>}>
       <Route path='/' element={<Home/>} />
    </Route>
    <Route path='/profile/:id' element={<PrivateRoute/>}>
       <Route path='/profile/:id' element={<Profile/>} />
    </Route>
  </Routes>
 </Suspense>
 </Router>
 <ToastContainer />
</Fragment>
);
};

export default App;
