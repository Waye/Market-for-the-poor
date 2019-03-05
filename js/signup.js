let newUser = null;

$(document).ready(function() {
    $('#userCreated'[0]).style.display = 'none'
})

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
        return
    }
    if (newUser.userType == 'Register as') {
        console.log('Please select type in "Register as" section')
        return
    }
    console.log('User created!')
    const html = `Registration successful.<br>
    User Name: ${newUser.userName}<br>
    Email: ${newUser.email}<br>
    Password: ${newUser.password}<br>
    Registerd as: ${newUser.userType}`
    const pElement = $('#userCreated')
    pElement.html(html)
    pElement[0].style.display = 'block'
    setTimeout(function(){
        pElement[0].style.display = 'none'
        pElement.html('')
        
    }, 5000);
})

