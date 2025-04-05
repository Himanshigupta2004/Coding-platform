import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <>
        <div className="backgroundStyle"></div>
            <div className="login-container">
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div className="signup-link">
                    <p>
                        Don't have an account? <a href="/signup">Sign up</a>
                    </p>
                </div>
        </div>
        </>
    );
};

export default Login;