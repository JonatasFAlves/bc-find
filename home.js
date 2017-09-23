function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let uid = user.uid;
            let name = user.displayName;

            alert(name)

        } else {
            // window.location('login.html');
            alert('Usuário não logado');
        }
    });

};

function update() {
    user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        // An error happened.
    });
}

function readLocation(uid) {

    firebase.database().ref('users/' + uid).once('value').then(function (snapshot) {
        alert(snapshot.val().location);
    });
}

function listenEvent() {
    var locationRef = firebase.database().ref('users/' + uid + '/location');
    locationRef.on('value', function (snapshot) {
        alert(snapshot.val());
    });
}

function writeUserData(uid, name, location) {
    firebase.database().ref('users/' + uid).set({
        username: name,
        location: location
    }).catch(e => console.log(e.message));
}

window.onload = function () {
    initApp();
};