// import logo from './logo.svg';
import './App.css';
import Header from './header';
import Register from './register';
import Login from './login';
// import Home from './home';
import Dashboard from './dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     {/* <Register /> */}
     <Router>
      <Header />
     {/* <Register /> */}
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
     </Router>
    </>
  );
}

export default App;
