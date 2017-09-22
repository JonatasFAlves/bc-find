(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA5zKK8PhcBAonQVfnRNspagRKKLb_8bFc",
        authDomain: "find-bc.firebaseapp.com",
        databaseURL: "https://find-bc.firebaseio.com",
        projectId: "find-bc",
        storageBucket: "",
        messagingSenderId: "342346757855"
    };
    firebase.initializeApp(config);

    // if(firebase){
    //     document.location.href="home.html";
    // }

    //Get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPass = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');

    btnLogin.addEventListener('click', function(){
        const email = txtEmail.value;
        const pass = txtPass.value;
        const auth = firebase.auth();

        auth.signInWithEmailAndPassword(email, pass).catch(e => e.message); 

        
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser)
        } else{
            console.log("user not logged")
        }
    });

}());