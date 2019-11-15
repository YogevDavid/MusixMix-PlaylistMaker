import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/layout/Index';
import TrackInfo from './components/tracks/TrackInfo';
import { ContextController } from './context';
import { ModalProvider } from 'react-modal-hook';

const App = () => {
  return (
    <ContextController>
      <ModalProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route exact path='/trackinfo/:id' component={TrackInfo} />
          </Switch>
        </Router>
      </ModalProvider>
    </ContextController>
  );
};

export default App;
