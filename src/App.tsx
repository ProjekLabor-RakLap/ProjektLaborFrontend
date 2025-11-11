import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./Context/userContext";
import Home from './app/Home/page';
import Warehouses from './app/Warehouses/page';
import Admin from './app/Admin/page';
import Statistics from './app/Statistics/page';
import Profile from './app/Profile/page';
import StockChange from './app/StockChange/page';
import Products from './app/Products/page';
import LoginPage from './app/Login/page';
import RegisterPage from './app/Register/page';
import ForgottenPasswordPage from './app/ForgottenPassword/page';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/warehouse" element={<Warehouses />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/stock-change" element={<StockChange />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotten-password" element={<ForgottenPasswordPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
