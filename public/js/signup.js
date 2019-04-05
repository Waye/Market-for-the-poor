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
    if (newUser.password.length < 4) {
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
            if (result == "/login") {
                alert('The user information alreay exists')
                window.location.href = result;
            } else if (result) {
                window.location.href = result;
            } else {
                alert('Problem with server. Please try again later')
            }
        }
    });
}

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

