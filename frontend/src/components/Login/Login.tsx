import { FormEvent, useRef } from 'react';
import '../Signup/Signup.css';

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        let user;

        if (passwordRef.current !== null && emailRef.current !== null) {
            user = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            };
        }

        const response = await fetch('http://localhost:5001/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <div className="container">
            <h1>Log in</h1>
            <p>
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    ref={emailRef}
                    name="email"
                    placeholder="email"
                    type="email"
                    required
                />
                <input
                    ref={passwordRef}
                    name="password"
                    placeholder="password"
                    type="password"
                    required
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    );
};

export default Login;
