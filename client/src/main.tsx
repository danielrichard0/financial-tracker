import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Container } from 'react-bootstrap';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import LoginForm from './pages/users/LoginForm.tsx';
import RegisterForm from './pages/users/RegisterForm.tsx';
import Navbar from './components/Navbar.tsx'
import { Toaster } from 'react-hot-toast';
import Authenticator from './utils/auth.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position='top-right' />
      <Navbar />
      <Container fluid='md' className='mt-3'>

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<Authenticator isRegister={false} />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>
          <Route element={<Authenticator isRegister={true} />}>
            <Route path="/register" element={<RegisterForm />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  </StrictMode>,
)
