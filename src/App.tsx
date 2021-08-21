import {AuthContextProvider} from '../src/context/AuthContext';
import { Routes } from "./utils/routes";
import "./styles/global.scss";
import {ThemeProvider} from '../src/context/ThemeContext'
function App() {


  return (
    <div className="App">
      <ThemeProvider>
        <AuthContextProvider>
          <Routes />
        </AuthContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
