
let newUser = null;


$('.dropdown-item').click(function() {
    const type = $(this).text()
    $('#dropdownSelection').html(type)
})

$('form').submit(function() {
    newUser = {
        userName: $('#userName').val(),
        email: $('#userName').val(),
        password: $('#password').val(),
        userType: $('#dropdownSelection').text()
    }
    const rpassword = $('#rpassword').val()

    if (newUser.password != rpassword) {
        console.log('Password does not match!')
        const userCreated = $('#userCreated')
        userCreated.html('Password does not match!')
        userCreated[0].style.display = 'block'
        setTimeout(function() {
            userCreated.html('')
            userCreated[0].style.display = 'none'
        }, 3000)
        return
    }
    if (newUser.userType == 'Register as') {
        console.log('Please select type in "Register as" section')
        const userCreated = $('#userCreated')
        userCreated.html('Please select type in "Register as" section')
        console.log(userCreated)
        userCreated[0].style.display = 'block'
        setTimeout(function() {
            userCreated.html('')
            userCreated[0].style.display = 'none'
        }, 3000)
        return
    }
    console.log('User created!')
    const html = `Registration successful.<br>
    User Name: ${newUser.userName}<br>
    Email: ${newUser.email}<br>
    Password: ${newUser.password}<br>
    Registerd as: ${newUser.userType}`
    const userCreated = $('#userCreated')
    userCreated.html(html)
    userCreated[0].style.display = 'block'
    setTimeout(function(){
        $('#mainContainer').html('')
        renderNewRegistration()
        $('#userCreated')[0].style.display = 'none'
    }, 5000);
})

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

