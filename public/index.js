
const login = document.getElementById('login');
const signup = document.getElementById('signup');


// Add a click event listener to the button
login.addEventListener('click', () => {
  const url = "./html/login.html";
  window.location.href = url;
});
signup.addEventListener('click', () => {
  const url = `/public/html/login.html`;
});






/*redirectButton.addEventListener('click', () => {
  const id = 'YOUR_ID_VALUE';
  const url = `/public/html/login.html?q=${id}`;
  window.location.href = url;
});

 */


