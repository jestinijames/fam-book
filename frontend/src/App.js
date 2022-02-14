import React, { Fragment, Suspense } from 'react';

// React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Toastify to display tiny popups
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import LoadingSpinner from './components/Spinner';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';



// Pages
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const NewTask = React.lazy(() => import('./pages/NewTask'));
const ViewTasks = React.lazy(() => import('./pages/ViewTasks'));
const ViewTask = React.lazy(() => import('./pages/ViewTask'));

const App = () => {
return (
<Fragment>
 <Router>
 <Suspense fallback={<LoadingSpinner/>}>
  <div className='container'>
  <Header />
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/new-task' element={<PrivateRoute/>}>
    <Route path='/new-task' element={<NewTask/>} />  
    </Route>
    <Route path='/tasks' element={<PrivateRoute/>}>
       <Route path='/tasks' element={<ViewTasks/>} />
    </Route>
    <Route path='/task/:taskId' element={<PrivateRoute/>}>
       <Route path='/task/:taskId' element={<ViewTask/>} />
    </Route>
  </Routes>
  </div>
 </Suspense>
 </Router>
 <ToastContainer />
</Fragment>
);
};

export default App;
