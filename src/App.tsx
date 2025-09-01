import React from 'react';
import logo from './logo.svg';
import './output.css';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider';
import { AppContext } from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/profile/:username' element={<ProfilePage/>}/>
          <Route path='/dashboard' element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
