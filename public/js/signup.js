// let newUser = null;


$('.dropdown-item').click(function() {
    const type = $(this).text()
    $('#dropdownSelection').html(type)
})

$('form').on('click', '#register', register)

// register function
function register() {
    const role = $('#dropdownSelection').text().trim()
    const newUser = {
        name: $('#userName').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        password: $('#password').val(),
        isBuyer: role == 'Buyer'
    }
    const rpassword = $('#rpassword').val()
    // if (newUser.userName.length < 5) {
    //     displayMsg('Username should be at least 5 characters.')
    //     return
    // }
    if (newUser.email.length < 5) {
        displayMsg('Invalid Email. For mocking, email address should be at least 5 characters.')
        return
    }
    const phone = newUser.phone
    if (phone.length < 10) {
        displayMsg('Invalid phone number. Phone number should be at least 10 digits.')
        return
    }
    for (let i = 0; i < phone.length; i++) {
        if (isNaN(parseInt(phone.charAt(i), 10))) {
            displayMsg('Phone number should be in digits only')
            return
        }
    }
    if (newUser.password.length < 5) {
        displayMsg('Invalid password. Password should be longer than 5 characters.')
        return
    }

    if (newUser.password != rpassword) {
        displayMsg('Password doest not match!')
        return
    }
    if (role == 'Register as') {
        displayMsg('Please select "Register as".')
        return
    }
    console.log('User created:', newUser);

    $.ajax({
        type: "POST",
        url: "/signup",
        data: newUser,
        success: function (result) {
            console.log('signup post success')
            console.log(result);
            window.location = result;
        }
    });
}
//     const html = `Registration successful.<br>
//     User Name: ${newUser.userName}<br>
//     Email: ${newUser.email}<br>
//     Password: ${newUser.password}<br>
//     Registerd as: ${newUser.userType}`

//     displayMsg(html)
// }

// error message for registration 
function displayMsg(msg) {
    console.log(msg)
    const popUpMsg = $('#popUpMsg')
    popUpMsg.html(`<div class="alert alert-success fade show" role="alert">
    ${msg}</div>`)
    setTimeout(function() {
        $('.alert').alert('close')
        $('.alert').alert('dispose')
    }, 4000)
}


function renderNewRegistration() {
    const html = `
    <form>
        <div class="container">
            <h1>Register</h1>

            <div>
                <label for="userName"><b>Username</b></label>
                <input id="userName" type="text" placeholder="Enter Username">
            </div>

            <div>
                <label for="email"><b>Email</b></label>
                <input id="email" type="text" placeholder="Email">
            </div>

            <div>
                <label for="phone"><b>Phone</b></label>
                <input id="phone" type="text" placeholder="phone">
            </div>

            <div>
                <label for="password"><b>Password</b></label>
                <input id="password" type="text" placeholder="Enter Password" >
            </div>

            <div>
                <label for="rpassword"><b>Repeat Password</b></label>
                <input id="rpassword" type="text" placeholder="Repeat Password">
            </div>

            <div class="dropdown">
                <button id="dropdownSelection" type="button" class="btn btn-success dropdown-toggle"
                    data-toggle="dropdown">Register as</button>
                <span class="dropdown-menu" >
                    <a class="dropdown-item">Buyer</a>
                    <a class="dropdown-item">Seller</a>
                    <a class="dropdown-item">Admin</a>
                </span>
            </div>

            <div>
                <button id="register" type="button" class="btn btn-success">Register</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
            </div>
        </div>
    </form>`
    $('#mainContainer').html(html)
}
