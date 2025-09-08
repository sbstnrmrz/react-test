import React from 'react';
import logo from './logo.svg';
import './output.css';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider';
import { AppContext } from './context/AppContext';
import { DashboardPage } from './pages/DashboardPage';
import { Layout } from './components/Layout';
import { EventPostPage } from './pages/EventPostPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile/:username' element={<Layout><ProfilePage/></Layout>}/>
          <Route path='/event-post' element={<Layout><EventPostPage/></Layout>}/>
          <Route path='/event/:id' element={<Layout><EventPostPage/></Layout>}/>
          <Route path='/dashboard' element={<Layout><DashboardPage/></Layout>}/>
          <Route path='/not-found' element={<NotFoundPage/>}/>
          <Route path='*' element={<Navigate to="/not-found" replace/>}/>

        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
