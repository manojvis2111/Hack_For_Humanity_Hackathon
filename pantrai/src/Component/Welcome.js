import React from 'react';
import '../Styles/welcome.css';
import axios from 'axios';
import { useState } from 'react';


const Welcome = ({username}) => {
    const [streak, setStreak] = useState(-1);
    //send a get request to get a user's streak value
    axios.get(`http://localhost:3000/userdata/streak/${username}`)
        .then((response) => {
            console.log(response.data);
            setStreak(response.data.streak);
        })
        .catch((error) => {
            console.error(error);
        });


    return (
        <div className = 'outer'>
            <div className='inner'>
                <h1>Welcome to your <span className='title'>PantrAI</span></h1>
            </div>
            <div className='inner'>
                <h1>Streak: <span className='title'>{streak}</span> Days</h1>
            </div>
        </div>
    );
};

export default Welcome;