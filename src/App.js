// import logo from './logo.svg';
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./page/HomePage";
import { ReactQueryPage } from "./page/ReactQueryPage";

function App() {
  return (
    <div className="App">
      <nav style={{ backgroundColor: "beige", padding: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Homepage
        </Link>
        <Link to="/react-query">React Query</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/react-query" element={<ReactQueryPage />} />
      </Routes>
    </div>
  );
}

export default App;
