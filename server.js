const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.send('Hello from backend API!');
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // In a real application, you would validate credentials here
    // and fetch user data from a database.
    console.log(`Login attempt: Email - ${email}, Password - ${password}`);

    // For now, send a dummy success response with tokens
    res.status(200).json({
        message: 'Login successful (dummy data)',
        user: {
            id: '123',
            email: email,
            name: 'Admin User',
            role: 'admin'
        },
        tokens: {
            access: {
                token: 'dummy_access_token_123',
                expires: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now
            },
            refresh: {
                token: 'dummy_refresh_token_456',
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Backend server listening on port ${PORT}`);
}); 