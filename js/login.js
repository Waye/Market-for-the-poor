function check(form)/*function to check userid & password*/
{
    /*the following code checkes whether the entered userid and password are matching*/
    if(form.uname.value == "seller" && form.psw.value == "seller")
    {
        window.open('./feedpage.html')/*opens the target page while Id & password matches*/
    }
    else if(form.uname.value == "buyer" && form.psw.value == "buyer")
    {
        window.open('./feedpage.html')
    }
    else if(form.uname.value == "admin" && form.psw.value == "admin")
    {
        window.open('./admin.html')
    }
    else
    {
        alert("Error Password or Username")/*displays error message*/
    }
}