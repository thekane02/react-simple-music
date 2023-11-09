import React, { useState } from 'react';
import LayoutAuthentication from '../../../layout/LayoutAuthentication';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginArtist } from '../../../redux/apiRequest';

const ArtistLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        };
        console.log(user);
        loginArtist(user, dispatch, navigate);
    };

    // return <LayoutAuthentication heading="Login"></LayoutAuthentication>;
    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <br></br>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <label>Password</label>
                <br></br>

                <input
                    type="text"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button>Login</button>
            </form>
        </div>
    );
};

export default ArtistLoginPage;
