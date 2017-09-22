(function () {
    const txtEmail = document.getElementById('txtEmail');
    const txtPass = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', function () {

        if (firebase.auth().currentUser) {
            firebase.auth().signOut();
        } else {

            const email = txtEmail.value;
            const pass = txtPass.value;
            const auth = firebase.auth();

            auth.signInWithEmailAndPassword(email, pass)
                .then(alert('helloworld'))
                .catch(e => e.message);
                

        }


    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
         window.location = 'home.html';
        }
      });

}());