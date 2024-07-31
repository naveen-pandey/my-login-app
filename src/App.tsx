import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Define types for user and profile
interface User {
    access_token: string;
}

interface Profile {
    picture: string;
    name: string;
    email: string;
}

function App() {
    // Initialize state with proper types
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);

    // Define login function with type safety
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    // Ensure login is a function
    const handleLoginClick = () => {
        if (typeof login === 'function') {
            login();
        } else {
            console.error('Login function is not defined');
        }
    };

    useEffect(() => {
        if (user) {
            axios
                .get<Profile>(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // Log out function
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={handleLoginClick}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}

export default App;
