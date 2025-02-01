import React, { useState } from 'react'; // Import React and useState hook
import '../Styles/login.css'; // Import Login.css file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {
    // Define state variables for username, password, and login/signup mode
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [streak, setStreak] = useState(true);
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (isLogin) {
            // Handle login logic here
            console.log('Logging in with', { username, password });
            // Check  if the user exists
            axios.get(`http://localhost:3000/userdata/login/${username}/${password}`)
                .then((response) => {
                    console.log(response.data);
                    // navigate('/home', { state: { username: username } });
                })
                .catch((error) => {
                    console.error(error);
                });
            // Send a request to reduce the shelf life of the ingredients and update streak accordingly
            axios.post(`http://localhost:3000/userdata/reduce_shelf_life/${username}`)
                .then((response) => {
                    console.log(response.data);
                    navigate('/home', { state: { username: username } });
                })
                .catch((error) => {
                    console.error(error);
                });
            //
            
        } else {
            // Handle signup logic here
            console.log('Signing up with', { username, password });
            // Send a POST request to the server to create a new user
            axios.post(`http://localhost:3000/userdata/add_user/${username}/${password}`)
                .then((response) => {
                    console.log(response.data);
                    navigate('/home', { state: { username: username } });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        // navigate('/home');
    };

    return (
        <div className='box'>
            <h2 className='Poppins'>{isLogin ? 'Login' : 'Sign Up'}</h2> {/* Display 'Login' or 'Sign Up' based on isLogin state */}
            <form onSubmit={handleSubmit}> {/* Form submission triggers handleSubmit */}
                <div>
                    <label className='Inter'>Username: </label>
                    <input
                        className='input'
                        type="text"
                        value={username} // Bind input value to username state
                        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                        required // Make the input field required
                    />
                </div>
                <br></br>
                <div>
                    <label className='Inter'>Password: </label>
                    <input
                        className='input'
                        type="password"
                        value={password} // Bind input value to password state
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                        required // Make the input field required
                    />
                </div>
                <br></br>
                <button className='button Poppins' type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <br></br>
            <button className='button Poppins' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Login;