import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Area
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import ConfirmAccount from './pages/ConfirmAccount';

// Private Area
import PrivateLayout from './layouts/PrivateLayout';
import Proyects from './pages/Proyects';
import NewProyect from './pages/NewProyect';
import Proyect from './pages/Proyect';
import EditProyect from './pages/EditProyect';

import { AuthProvider } from './context/AuthProvider';
import { ProyectsProvider } from './context/ProyectsProvider';

function App() {

  return (
      <BrowserRouter>
        <AuthProvider>
          <ProyectsProvider>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot-password' element={<ForgotPassword />} />
                <Route path='forgot-password/:id' element={<NewPassword />} />
                <Route path='confirm/:id' element={<ConfirmAccount />} />
              </Route>

              <Route path='/proyects' element={<PrivateLayout/>}>
                <Route index element={<Proyects />} />
                <Route path='new' element={<NewProyect />} />
                <Route path=':id' element={<Proyect />} />
                <Route path='edit/:id' element={<EditProyect />} />
              </Route>
            </Routes>
          </ProyectsProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
