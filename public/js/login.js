$("#forgotPasswordLink").click(function() {
    $(".container-fluid").before(`<div class="alert alert-success fade show" role="alert" id="forgotPasswordAlert">
    We are sorry that you forgot the password. An email containing reset password link is sent to your email address.</div>`)
    setTimeout(()=>{$('#forgotPasswordAlert').alert('close');$('#forgotPasswordAlert').alert('dispose')}, 3000);
})

// function checkForm() {
//     $.post("login", function(data, status) {
//         if (status == 400) {
//             alert('Invalid email or password')
//         }
//     })
// }

// $(document).ready(res => {
//     console.log(res)
//     if (res == 400) {
//         alert('Invalid email or password')
//     }
// }) 