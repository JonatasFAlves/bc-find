(function () {
    var uid;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
        }
    });

    var name = 'Jnts';
    var email = 'alves.jnts@gmail.com';
    var imageUrl = 'http://www.iconarchive.com/download/i86449/martin-berube/flat-animal/turtle.ico';

    function writeUserData(uid, name, email, imageUrl) {
        firebase.database().ref('users/' + uid).set({
            username: name,
            email: email,
            profile_picture: imageUrl
        }).catch(e => console.log(e.message));
    }


    writeUserData(uid, name, email, imageUrl);
}());