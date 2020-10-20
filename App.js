import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import MGrid from './components/Dashboard';

import './App.css';
import './grid.css';

function App() {
  return (
    <div className="App">
      <AppBar color='primary' position="static">
        <Toolbar>

        <Button color="inherit" onClick={() => {ReactDOM.render(<MGrid />, document.getElementById('main'));}}>Live</Button>
        <Button color="inherit">Report</Button>
        <Button color="inherit">Mitarbeiter</Button>
        <Button color="inherit">Maschinen</Button>
        <Button color="inherit">Aufträge</Button>
        <Button color="inherit">Material</Button>
        <Button color="inherit">QS</Button>
        <Button color="inherit">Market</Button>


        <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>
         <Container id="main" maxWidth="xl">


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </Container>
    </div>
  );
}

export default App;
