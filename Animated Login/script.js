// a = loginBtn
// b = registerBtn
// x = login
// y = register

var LoginBtn = document.getElementById("loginBtn");
var RegisterBtn = document.getElementById("registerBtn");
var LoginForm = document.getElementById("login");
var RegisterForm = document.getElementById("register");

function login() {
    LoginForm.style.left = "4px";
    RegisterForm.style.right = "-520px";
    LoginBtn.className += " white-btn"
    RegisterBtn.className = "btn"
    LoginForm.style.opacity = "1";
    RegisterForm.style.ropacity = "0";
}

function register() {
    LoginForm.style.left = "-510px";
    RegisterForm.style.right = "5px";
    LoginBtn.className = "btn"
    RegisterBtn.className += " white-btn"
    LoginForm.style.opacity = "0";
    RegisterForm.style.ropacity = "1";
}

function myMenuFunction(){
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu"){
        i.className += " responsive";
    }
    else{
        i.className = "nav-menu";
    }
}
