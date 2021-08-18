import {AuthContextProvider} from '../src/context/AuthContext';
import { Routes } from "./utils/routes";
import "./styles/global.scss";

function App() {


  return (
    <div className="App">
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
