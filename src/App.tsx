import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useWindowState } from './App.hook';

import Main from './components/Main';
import Home from './components/pages/Home';
import Musics from './components/pages/Musics';
import NotFound from './components/pages/NotFound';

import './App.css';

function App() {

  const windowState = useWindowState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main windowState={windowState} /> }>
          <Route path="/" element={<Home windowState={windowState} />} />
          <Route path="/musics" element={<Musics windowState={windowState}/>} />
          <Route path="*" element={<NotFound windowState={windowState} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
