//  import './App.css';
import './assets/styles/styles.scss'
import { Switch, Route } from 'react-router-dom';
import {routes} from './routes.js'
import { Board } from './pages/BoardApp';


function App() {
  return (
    <div className="App main-container">
      <Board />
    </div>
  );
}

export default App;
