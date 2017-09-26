var userName;

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userName = user.displayName;
        } else {
            alert('Usuário não logado');
            window.location.href = 'login.html';
        }
    });

    var locationRef = firebase.database().ref('location/');
    locationRef.on('child_changed', function(data) {
        alert(data.key);
        alert(data.val());
    });
    

}

function updateLocation(userName, location) {
    // Informations entries.
    var locationData = {
        [userName]: location
    };

    // Write the user location data in location.
    var updates = {};
    updates['location/'] = locationData;

    return firebase.database().ref().update(updates);
}

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

window.onload = function () {
    initApp();
};