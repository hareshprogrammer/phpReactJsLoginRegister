import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
const Header = () => {

    // const [auth, setAuth] = useState({email:""});
    const [auth, setAuth] = useState('');
    const [user, setUser] = useState(null);
    let navigate = useNavigate();

    const localStateUser = localStorage.getItem('userName');

    useEffect(()=>{
        setUserDetails();
    },[]);

    useEffect(()=>{
        setUserDetails();
    },[localStateUser]);


    const setUserDetails = () => {
        setUser(localStateUser);
        if(!localStateUser){
            navigate(`/login`);
        }
    }


    const Logout = () =>{
        localStorage.removeItem('email');
        localStorage.clear();
        setUser(null);
        navigate(`/login`);
    }

    

    console.log("user in logout = ",user)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
  <div className="container-fluid text-center">
    {/* <a className="navbar-brand" href="#">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        {user === null && (
            <ul className="navbar-nav">
     
        <li className="nav-item">
          {/* <a className="nav-link " href="#">Register</a> */}
          <Link to="/register" className='nav-link active text-white'>Register</Link>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link " href="#">Login</a> */}
          <Link to="/login" className='nav-link active text-white'>Login</Link>
        </li>

        

       
      </ul>

        )}
      

{user != null && (
      <span className='navbar-text'>
        Welcome: <span className='text-white'>{user} </span> | <button className='btn btn-danger' onClick={()=> Logout()}> Logout </button>
      </span>
      )}
    </div>
  </div>
</nav>
  )
}

export default Header