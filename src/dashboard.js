import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [auth, setAuth] = useState('');
    const [profile, setProfile] = useState('');
    const [userName, setUserName] = useState('');

    let navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('email');
        const profile = localStorage.getItem('profile');
        const userName = localStorage.getItem('userName');

        setAuth(auth);
        setProfile(profile);
        setUserName(userName);

        // Assuming profile contains the relative path to the image on the server
        // If the profile path is stored as an absolute URL, you can directly use it
        const serverUrl = 'http://localhost/php-assessment'; // Update with your server URL
        const profileImageUrl = `${serverUrl}/uploads/${profile}`;

        setProfile(profileImageUrl);

        if (!auth) {
            navigate(`/login`);
        }
    }, [navigate]);

    return (
        <div>
            <h1 className='text-center'>Welcome to Dashboard</h1>


            {/* <div class="card" style={{width: "18rem"}}>
  <img src={profile} class="card-img-top mx-auto d-block" alt="Profile" />
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */}

<div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: "-80px" }}>
            <div class="card" style={{ width: "18rem" }}>
                <img src={profile} class="card-img-top mx-auto d-block" alt="Profile" />
                <div class="card-body">
                    {/* <p class="card-text text-center"><strong>Hello</strong>, <span style={{color:"#2596be", fontWeight:"bold"}}> {userName} </span></p> */}
                    <p class="card-text text-center"><strong>Hello</strong>, <span style={{color:"#ff1a1a", fontWeight:"bold"}}> {userName} </span></p>
                </div>
            </div>
        </div>

            {/* <div>
                <img src={profile} alt="Profile" style={{ width: "200px", borderRadius: "50%" }} />
            </div> */}
        </div>
    );
}

export default Dashboard;
