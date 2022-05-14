import React, { useEffect, useState } from 'react';

import PreLoad from './components/PreLoad';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Logo from './components/Logo';
import ToggleSidebar from './components/ToggleSidebar';
import PreviousRouter from './components/PreviousRouter';
import Home from './components/pages/Home';

import './App.css';
import { useWindowState } from './App.hook';

function App() {

  const [ containerMargin, setContainerMargin, windowFocused ] = useWindowState();

  return (
    <>
      <div className={'c-app noselect' + (windowFocused ? '' : ' window--unfocused')}>
        <main className="c-app__content">
          <Sidebar changeContainerMargin={setContainerMargin} />
          <div style={{ marginLeft: `${containerMargin}rem`}} className="c-container">
            {document.body.clientWidth < 1000 ?
              <div className="c-app__logo">
                { document.body.clientWidth <= 655 ? <div className="d-flex a-items-center z-index-6"><PreviousRouter /> <ToggleSidebar /> <span className="ml-10"></span></div>  : null }
                <div className="z-index-6"><Logo/></div>
              </div> : null }
              <div className="c-container__pages">
                <Home />
              </div>
          </div>
        </main>
        <Player />
      </div>

      {/* <PreLoad /> */}
    </>
  );
}


export default App;
