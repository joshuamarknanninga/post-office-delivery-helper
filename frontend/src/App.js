import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <Route path="/" exact component={() => <Login />} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
