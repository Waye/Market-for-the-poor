
let newUser = null;


$('.dropdown-item').click(function() {
    const type = $(this).text()
    $('#dropdownSelection').html(type)
})

$('form').submit(function() {
    newUser = {
        userName: $('#userName').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        userType: $('#dropdownSelection').text()
    }
    const rpassword = $('#rpassword').val()
    if (newUser.userName.length <= 5) {
        displayErrorMsg('Username should be longer than 5 characters.')
        return
    }
    if (newUser.email.length <= 10) {
        console.log(newUser.email.length)
        console.log(newUser.email)
        displayErrorMsg('Invalid Email. For mocking, email address should be longer than 10 characters.')
        return
    }
    if (newUser.password.length <= 8) {
        displayErrorMsg('Invalid password. Password should be longer than 8 characters.')
        return
    }

    if (newUser.password != rpassword) {
        displayErrorMsg('Password doest not match!')
        return
    }
    if (newUser.userType == 'Register as') {
        displayErrorMsg('Please select "Register as".')
        return
    }
    console.log('User created!')
    const html = `Registration successful.<br>
    User Name: ${newUser.userName}<br>
    Email: ${newUser.email}<br>
    Password: ${newUser.password}<br>
    Registerd as: ${newUser.userType}`

    const popUpMsg = $('#popUpMsg')
    popUpMsg.html(html)
    popUpMsg[0].style.display = 'block'
    setTimeout(function(){
        $('#mainContainer').html('')
        renderNewRegistration()
        $('#popUpMsg')[0].style.display = 'none'
    }, 5000);
})

function displayErrorMsg(msg) {
    console.log(msg)
    const popUpMsg = $('#popUpMsg')
    popUpMsg[0].innerHTML = msg
    console.log(popUpMsg)
    popUpMsg[0].style.display = 'block'
    setTimeout(function() {
        popUpMsg.html('')
        popUpMsg[0].style.display = 'none'
    }, 3000)
}

function renderNewRegistration() {
    const html = `
    <form>
        <div class="container">
            <h1>Register</h1>

            <div>
                <label for="userName"><b>Username</b></label>
                <input id="userName" type="text" placeholder="Enter Username" required>
            </div>

            <div>
                <label for="email"><b>Email</b></label>
                <input id="email" type="text" placeholder="Email" required>
            </div>

            <div>
                <label for="password"><b>Password</b></label>
                <input id="password" type="password" placeholder="Enter Password" required>
            </div>

            <div>
                <label for="rpassword"><b>Repeat Password</b></label>
                <input id="rpassword" type="repeat_password" placeholder="Repeat Password" required>
            </div>

            <div class="dropdown">
                <button id="dropdownSelection" type="button" class="btn btn-success dropdown-toggle"
                    data-toggle="dropdown">Register as</button>
                <span class="dropdown-menu">
                    <a class="dropdown-item" href="#">Buyer</a>
                    <a class="dropdown-item" href="#">Seller</a>
                    <a class="dropdown-item" href="#">Admin</a>
                </span>
            </div>

            <div>
                <button id="register" type="submit" class="btn btn-success">Register</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
            </div>
        </div>
    </form>`
    $('#mainContainer').html(html)
}

