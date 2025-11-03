import PillNavFull from "../../Components/NavBar/PillNav/PillNavWithItems";
import Login from "../../Components/Login/login";

function LoginPage() {
  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull/>
        
        <Login></Login>
      </header>
    </div>
  );
}

export default LoginPage;