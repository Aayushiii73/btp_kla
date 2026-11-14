import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import Table from "./components/Table/table"
import Linegraph from "./components/Table/LineGraph"
function App() {
  return (
    <div className="App">
      <Table/>
      {/* <Linegraph/> */}
    </div>
  );
}

export default App;
