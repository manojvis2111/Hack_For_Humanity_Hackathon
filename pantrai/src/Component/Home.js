import React from 'react';
import Welcome from './Welcome';
import Inventory from './Inventory';
import Recipes from './Recipes';
// import '../Styles/height.css';
import '../Styles/welcome.css';
import {useLocation} from 'react-router-dom';
import useState from 'react';
import axios from 'axios';

const Home = () => {

    const location = useLocation();
    const {username} = location.state;
    // const [streak, setStreak] = useState(-1);
    // //send a get request to get a user's streak value
    // axios.get(`http://localhost:3000/userdata/streak/${username}`)
    //     .then((response) => {
    //         console.log(response.data);
    //         setStreak(response.data.streak);
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    return (
        <div className='outer'>
            <Welcome username={username}/>
            <Inventory username={username}/>
            {/* <Recipes username={username}/> */}
        </div>
    );
};

export default Home;