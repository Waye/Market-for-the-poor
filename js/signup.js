
$(document).ready(function() {
    
    $('.dropdown-item').click(function() {
        // console.log($(this).text())
        const type = $(this).text()
        $('#dropdownSelection').html(type)
    })

    $('form').submit(function() {
        const newUser = {
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
        console.log(newUser)
    })


})
