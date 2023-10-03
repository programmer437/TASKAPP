const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/v1/users/login', {
            email,
            password
        });

        if (response.status === 201) {
            // Redirect to tasks.html on successful login
            window.location.href = 'tasks.html';
        } else {
            console.error('Login failed.');
        }
    } catch (error) {
        console.error('Login failed.', error);
    }
});
