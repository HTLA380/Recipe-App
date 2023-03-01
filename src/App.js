import Pages from "./pages/Pages";
import {BrowserRouter} from "react-router-dom";
import Logo from "./components/Logo";
import Search from "./components/Search";
import Category from "./components/Category";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Logo />
        <Search />
        <Category />
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
