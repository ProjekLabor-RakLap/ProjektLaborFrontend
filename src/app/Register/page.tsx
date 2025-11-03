import PillNavFull from "../../Components/NavBar/PillNav/PillNavWithItems";
import Register from "../../Components/Register/register";

function RegisterPage() {
  return (
    <div className="App">
      <header className="App-header">
        <PillNavFull/>
        
        <Register></Register>
      </header>
    </div>
  );
}

export default RegisterPage;