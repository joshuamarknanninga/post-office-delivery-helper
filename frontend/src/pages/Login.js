import React, { useState, useContext } from 'react';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const history = useHistory();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            history.push('/dashboard');
        } catch(err) {
            alert('Login failed');
        }
    };

    return (
        <Container text>
            <Header as="h2">Login</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label="Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <Form.Input
                    label="Password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" primary>Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
