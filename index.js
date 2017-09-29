const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');

var userName;

function initApp() {  

    // Authentication listener, ie, when user log in
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userName = user.displayName;            
            window.location.href = 'home.html';
        }
    });

    // Button event listener
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
    var alertMessage = 'Realizando seu login, por favor aguarde...';
    // This function needs to have the alert function or else it doesn't sign in the user
    // I don't know why is that :(
    return firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(alert(alertMessage))
        .catch(function (err) {
            if (err) {
                alert(err.message);
            }
        });
}

window.onload = function () {
    initApp();
};