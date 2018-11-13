var refDB = firebase.database().ref('usuarios');
var refImg = firebase.storage().ref();
var btnLogin = document.getElementById('login');
var btnLogout = document.getElementById('logout')
var btnPerfil = document.getElementById('perfil');
var btnGuardar = document.getElementById('guardar');
var txtDisplayName = document.getElementById('txtDisplayName');
var txtEmail = document.getElementById('txtEmail');
var usuario = {};
var almacen;

refImg.child('Otto.jpg').getDownloadURL().then(function(url) {
    imagen.src = url;
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('Existe usuario');
    } else {
        console.log('No exisite usuario');
    }
});

btnPerfil.addEventListener('click', function() {
    console.log('perfil');
    var user = refDB.child(firebase.auth().currentUser.uid).once('value', function(data) {
        console.log(user);
        txtDisplayName.value = data.val().displayName;
        txtEmail.value = data.val().email;
        almacen = data.val();
    });
});

btnLogin.addEventListener('click', function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(datos) {
        usuario = {
            displayName: datos.user.displayName,
            email: datos.user.email,
            uid: datos.user.uid
        };
        agregar(usuario.uid, usuario);
        alert("Sesión iniciada");
    });
});

btnLogout.addEventListener('click', function() {
    firebase.auth().signOut();
    alert("Cesión cerrada");
});

btnGuardar.addEventListener('click', function() {
    event.preventDefault();
    usuario = {
        displayName: txtDisplayName.value,
        email: txtEmail.value,
        uid: almacen.uid
    }
    refDB.child(usuario.uid).update(usuario);
    alert("Registro Actualizado");
});

function agregar(uid, usuario) {
    refDB.child(uid).set(usuario);
    almacen = usuario
};