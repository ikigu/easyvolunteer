import { FormEvent, useRef } from 'react';
import './Signup.css';

const Signup = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        let firstName: string = '';
        let lastName: string = '';

        if (nameRef.current !== null) {
            const fullName = nameRef.current.value.trim();

            firstName = fullName.split(' ')[0];

            if (fullName.includes(' ')) {
                lastName = fullName.split(' ')[1];
            }
        }

        let person;

        if (passwordRef.current !== null && emailRef.current !== null) {
            person = {
                firstName: firstName,
                lastName: lastName,
                email: emailRef.current.value,
                password: passwordRef.current.value
            };
        }

        const response = await fetch('http://localhost:5001/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(person)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <div className="container">
            <h1>Sign up</h1>
            <p>
                Already have an account? <a href="/login">Log in</a>
            </p>
            <form onSubmit={handleSubmit}>
                <input
                    ref={nameRef}
                    name="name"
                    placeholder="full name"
                    type="text"
                    required
                />
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;
