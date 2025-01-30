import React, { useState } from 'react'; // Import React and useState hook
import '../Styles/login.css'; // Import Login.css file
import { useNavigate } from 'react-router-dom';



const Login = () => {
    // Define state variables for username, password, and login/signup mode
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (isLogin) {
            // Handle login logic here
            console.log('Logging in with', { username, password });
        } else {
            // Handle signup logic here
            console.log('Signing up with', { username, password });
        }
        navigate('/home');
    };

    return (
        <div class='box'>
            <h2 class='Poppins'>{isLogin ? 'Login' : 'Sign Up'}</h2> {/* Display 'Login' or 'Sign Up' based on isLogin state */}
            <form onSubmit={handleSubmit}> {/* Form submission triggers handleSubmit */}
                <div>
                    <label class='Inter'>Username: </label>
                    <input
                        class='input'
                        type="text"
                        value={username} // Bind input value to username state
                        onChange={(e) => setUsername(e.target.value)} // Update username state on input change
                        required // Make the input field required
                    />
                </div>
                <br></br>
                <div>
                    <label class='Inter'>Password: </label>
                    <input
                        class='input'
                        type="password"
                        value={password} // Bind input value to password state
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                        required // Make the input field required
                    />
                </div>
                <br></br>
                <button class='button Poppins' type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <br></br>
            <button class='button Poppins' onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Login;