var userName;

function initApp() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userName = user.displayName;

            // return firebase.database().ref('user-locations/').once('value').then(function (snapshot) {
            //     snapshot.forEach(function (childSnapshot) {
            //         var userName = childSnapshot.key;
            //         var location = childSnapshot.val();
            //         addUserBadge(userName, location);
            //     });
            // });

        } else {
            window.location.href = 'index.html';
        }
    });

    var locationRef = firebase.database().ref('user-locations/');
    locationRef.on('child_added', function (data) {
        var userName = data.key;
        var location = data.val();
        addUserBadge(userName, location);
    });

    locationRef.on('child_changed', function (data) {
        var userName = data.key;
        var finalLocation = data.val();
        deleteUserBadge(userName);
        addUserBadge(userName, finalLocation);
    });

    locationRef.on('child_removed', function (data) {
        var userName = data.key;
        deleteUserBadge(userName);
    });


}

function updateUserLocation(userName, location) {
    return firebase.database().ref('user-locations/').update({ [userName]: location });
}

function addUserBadge(userName, finalLocation) {
    var element = document.createElement("span");
    element.id = userName;
    element.className = 'p-2 ml-1 badge badge-primary'
    element.appendChild(document.createTextNode([userName]));
    document.getElementById([finalLocation]).appendChild(element);
}

function deleteUserBadge(userName) {
    var element = document.getElementById([userName]);
    element.parentNode.removeChild(element);
}

function logOut(userName){
    updateUserLocation(userName, null);
    return firebase.auth().signOut();
}

function updateUserProfile() {
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