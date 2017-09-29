const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPassword');
const btnSubscribe = document.getElementById('btnSubscribe');


function initApp() {
    // Authentication listener, ie, when user log in
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userName = txtName.value;
            updateUserProfile(user, userName);
            window.location.href = 'home.html';
        }
    });

    // Button listener
    btnSubscribe.addEventListener('click', function () {
        var email = txtEmail.value;
        var password = txtPass.value;

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        }

        signUp(email, password);
        signIn(email, password);
    });

}

function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        alert(error.message);
    });
}

function signIn(email, password) {
    var alertMessage = 'Realizando seu login, por favor aguarde...';
    // This function needs to have the alert function or else it doesn't sign in the user
    // I don't know why is that :(
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(alert(alertMessage))
        .catch(function (err) {
            if (err) {
                alert(err.message);
            }
        });
}

function updateUserProfile(user, userName) {
    user.updateProfile({
        displayName: userName
    });
}

window.onload = function () {
    initApp();
};