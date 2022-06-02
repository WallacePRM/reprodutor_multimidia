import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useWindowState } from './App.hook';

import Main from './components/Main';
import Home from './components/pages/Home';
import Musics from './components/pages/Musics';
import NotFound from './components/pages/NotFound';

import './App.css';
import PlayQueue from './components/pages/PlayQueue';
import Videos from './components/pages/Videos';

function App() {

  const windowState = useWindowState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main windowState={windowState} /> }>
          <Route path="/" element={<Home />} />
          <Route path="/musics" element={<Musics />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/queue" element={<PlayQueue />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
