
const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Default user data
const defaultUser = {
    user: 'Vedant',
    username: 'vedant@gmail.com',
    password: 'vedant1234'
};

form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const email = emailInput.value;
    const password = passwordInput.value;

    const storedUser = localStorage.getItem(email);

    if (storedUser) {
        const user = JSON.parse(storedUser); 

        if (user.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', user.email);
            window.open('dashboard.html', '_self'); 
        } else {
            alert("Invalid password");
        }
    } else {
        if (defaultUser.username === email && defaultUser.password === password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', defaultUser.username);
            window.open('dashboard.html', '_self'); 
        } else {
            alert("Invalid username or password");
        }
    }
});

