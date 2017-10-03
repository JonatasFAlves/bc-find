var userName;

function initApp() {

    var alertMessage = 
    "Lembre-se de realizar log off quando não for mais utilizar a aplicação,\nassim, seu token será apagado das localizações";
    alert(alertMessage);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            userName = user.displayName;
        } else {
            window.location.href = 'index.html';
        }
    });

    // Listeners for the firebase, adding or deleting the names
    // acording to the db's reponse.
    var locationRef = firebase.database().ref('user-locations/');
    locationRef.on('child_added', function (data) {
        var userName = data.key;
        var location = data.val();
        // Solved issue: user click too fast generating undefined userName
        if (userName === "undefined") return;

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

function logOut(userName) {
    updateUserLocation(userName, null);
    return firebase.auth().signOut();
}

// Add or delete user name in the location
function addUserBadge(userName, finalLocation) {
    var element = document.createElement("span");
    element.id = userName;
    element.className = "p-2 ml-1 badge badge-primary"
    element.appendChild(document.createTextNode([userName]));
    document.getElementById([finalLocation]).appendChild(element);
}

function deleteUserBadge(userName) {
    var element = document.getElementById([userName]);
    element.parentNode.removeChild(element);
}

window.onload = function () {
    initApp();
};