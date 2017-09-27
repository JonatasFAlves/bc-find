const txtEmail = document.getElementById('txtEmail');
const txtPass = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');

var userName;

function initApp() {    
    //If the code is working, then test it inside the initApp function.
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userName = user.displayName;            
            firebase.database().ref('user-locations/').set({
                [userName]: 'Sala Suporte'
            });
            window.location.href = 'home.html';
        }
    });

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
    return firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(alert('Logged In'))
        .catch(function (err) {
            if (err) {
                alert(err.message);
            }
        });
}

// function writeUserLocation(userName, location) {
//     return firebase.database().ref('user-locations/').set({ [userName]: location });
// }

function writeUserLocation(name, location) {
    return firebase.database().ref('user-locations/').set({
        [userName]: location
    });
  }

window.onload = function () {
    initApp();
};