import logo from './logo.svg';
import './index.css';
import './flags.css';
import './App.css';
import Login from './Components/Login';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Route, Routes } from 'react-router-dom';
import SingUp from './Components/SignUpCustomer';
import NavBar from './Components/NavBar';
import Question from './Components/Question';
import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useLocation } from 'react-router-dom';
import PanelList from './Components/PanelList';
import Panel from './Components/Panel';
import CustomerHome from './Components/Customer/CustomerHome';
import OrderPanel from './Components/Customer/OrderPanel';
import ViewPanels from './Components/Customer/ViewPanels';
import AnalizePanel from './Components/Customer/AnalizePanel';
import AboutUs from './Components/AboutUs';
import RedeemPoints from './Components/Redeempoints';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const noNavbarPaths = ['/home', '/signup', '/panel'];
  const shouldShowNavbar = !noNavbarPaths.some(path => location.pathname.startsWith(path)) && !(location.pathname.substring(1) === '');

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        {shouldShowNavbar && <NavBar />}
        <div style={{ marginTop: '60px' }}> {/* Add margin to avoid overlap */}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/redeem' element={<RedeemPoints />} />
            <Route path='/participant' element={<PanelList />} />
            <Route path='/aboutus' element={<AboutUs/>} />
            <Route path='/analizePanel' element={<AnalizePanel />} />
            <Route path='/customer' element={<CustomerHome />} />
            <Route path='/customerPanels' element={<ViewPanels />} />
            <Route path='/orderpanel' element={<OrderPanel />} />
            <Route path='/panel/:name' element={<Panel />} />
            <Route path='/home' element={<Login />} />
            <Route path='/signUp' element={<SingUp />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;