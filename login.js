const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');

function initApp() {

    btnLogin.addEventListener('click', function () {
        var email = txtEmail.value;
        var password = txtPass.value;

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }

        signIn(email, password);

    });
    
};

function signIn(email, pass) {
    firebase.auth().signInWithEmailAndPassword(email, pass).then(alert()).catch(function (error) {
        alert(error.message);
    });
}

window.onload = function () {
    initApp();

    //If the code is working, then test it inside the initApp function.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = 'home.html';
        }
    });
    
};