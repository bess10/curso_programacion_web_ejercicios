
const divUsers = document.getElementById('users');

const URL = 'http://localhost:4000/user';

fetch(URL)
.then((response) => {
    return response.json();
})
.then(data => {
   
    data.forEach(user => {
        
        divNew = `<div>
                    <p>${user.nombre}</p>
                    <p>${user.email}</p>
                </div>`;
        divUsers.insertAdjacentHTML('beforeend', divNew);
    });
})
.catch((err) => console.log(err));




