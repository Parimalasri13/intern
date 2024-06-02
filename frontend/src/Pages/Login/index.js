// /* src/components/SignIn.jsx */
// import React, { useState } from 'react';
// import './index.css';
// import axios from 'axios';

// const SignIn = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     async function handleSubmit(e) {
//         e.preventDefault();
//         try{
//             const response =await axios.post('http://localhost:3001/signin', {
//                 username,password
//             })
//             console.log(response);
//             // const response = await fetch('http://localhost:3001/SignIn', {
//             //     method: 'POST',
//             //     headers: {
//             //         'Content-Type': 'application/json'
//             //     },
//             //     body: JSON.stringify({
//             //         username: username,
//             //         password: password
//             //     })
//             // });
//             // const data = await response.json();
//             // if (data.error) {
//             //     alert(data.error);
//             // } else {
//             //     alert('Registration successful!');
//             // }
//         }
//         catch(e){
//             console.log(e);
//         }
//     }

//     const validateUsername = () => {
//         const regx = /^[a-zA-Z]+$/;
//         if (!regx.test(username)) {
//             alert("Please enter a valid name");
//             return false;
//         }
//         if (username.length < 6) {
//             alert("UserName length should exceed 6 characters");
//             return false;
//         }
//         return true;
//     };

//     const validatePassword = () => {
//         const regx = /^[a-zA-Z0-9]+$/;
//         if (!regx.test(password)) {
//             alert("Please enter a valid password");
//             return false;
//         }
//         if (password.length < 6) {
//             alert("Password should exceed 6 characters");
//             return false;
//         }
//         return true;
//     };

 

//     return (
//         <div className="wrapper">
//             <form onSubmit={handleSubmit}>
//                 <h1>Login</h1>

//                 <div className="input-box">
//                     <input
//                         type="text"
//                         placeholder="username"
//                         name="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         id="Uname"
//                     />
//                     <i className='bx bxs-user'></i>
//                 </div>

//                 <div className="input-box">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         id="password"
//                         required
//                     />
//                     <i className='bx bxs-lock-alt'></i>
//                 </div>

//                 <div className="remember_forget">
//                     <label>
//                         <input type="checkbox" /> Remember me
//                     </label>
//                     <a href="forget_password.html"> Forget Password</a>
//                 </div>

//                 <button type="submit" className="btn">Login</button>

//                 <div className="register-link">
//                     <p>Don't have an account? <a href="reg.html">Register</a></p>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default SignIn;


import React, { useState } from 'react';
 
import axios from 'axios';
import './index.css'

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response =await axios.post('http://localhost:3001/signin', {
                username,password
            })
            console.log(response);
        }
        catch(e){
            console.log(e);
        }
    }

    // Validation functions...

    return (
        
        <div className="wrapper"> {/* Use the styles from SignIn.module.css */}
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="input-box">
                   <input
                        type="text"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="Uname"
                    />
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        required
                    />
                    <i className='bx bxs-lock-alt'></i>
                </div>

                <div className="remember_forget">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="/forget-password"> Forget Password</a>
                </div>

                <button type="submit" className="btn">Login</button>

                <div className="register-link">
                    <p className='para'>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
        
    );
};

export default SignIn;
