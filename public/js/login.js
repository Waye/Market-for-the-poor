$("#forgotPasswordLink").click(function() {
    $(".container-fluid").before(`<div class="alert alert-success fade show" role="alert" id="forgotPasswordAlert">
    We are sorry that you forgot the password. An email containing reset password link is sent to your email address.</div>`)
    setTimeout(()=>{$('#forgotPasswordAlert').alert('close');$('#forgotPasswordAlert').alert('dispose')}, 3000);
})


$("#loginBtn").on('click', function() {
        check($(this)[0].form)
    }
);

function check(form)/*function to check userid & password*/
{
    /*the following code checkes whether the entered userid and password are matching*/
    if (!form) {
        alert("Error Password or Username");/*displays error message*/
    }
    else if(form.uname.value == "user2" && form.psw.value == "user2") {
        window.open('/feedpage/seller');/*opens the target page while Id & password matches*/
    }
    else if(form.uname.value == "user" && form.psw.value == "user") {    
        window.open('/feedpage/buyer');
    }
    else if(form.uname.value == "admin" && form.psw.value == "admin") {
        window.open('/admin');
    } else {
        alert("Error Password or Username");/*displays error message*/
    }
}

function main() {
    // $.get('/login', ()=>{});
}
$(document).ready(main);
