"use strict";

let admin = null;
let users = []
let posts = []

//Total user number display
$(document).ready(function() {
    console.log('successful!')
    $.ajax({
        type: 'GET',
        url: '/adminpage/info',
        success: function (result) {
            console.log(result)
            users = result[0]
            posts = result[1]
            renderManageUsers()
            renderManagePost()
            $(totalUserNum)[0].innerHTML = users.length;

        }
    })

})

$('body').on('click', 'button.ban', banClick)

$('body').on('click', 'button.delDiv', deleteUser)

$('body').on('click', 'button.delRow', deletePost)

function banClick() {
    const topSpan = $(this).prev();
    const email = topSpan.find('.userName')[0].innerHTML;
    const user = users.find(user => user.email == email);
    // send update request to server
    const data = {
        email: email,
        isBanned: !user.isBanned
    }
    $.ajax({
        type: "PATCH",
        url: "/adminpage/ban_user",
        data: data,
        success: function(result) {
            if (result) {
                user.isBanned = result.isBanned
                removeManageUsers()
                renderManageUsers()
            } else {
                alert("Error")
            }
        }
    })
}

function deleteUser() {
    const email = $(this).prev().prev().children('span.userName')[0].innerHTML
    const index = users.findIndex(user => user.email == email)
    const userId = users[index]._id
    console.log(userId)
    // send delete(user)/update(post) request to server
    $.ajax({
        method: 'DELETE',
        data: {
            id: userId
        },
        url: 'adminpage/delete_user',
        success: function(result) {
            users.splice(index, 1)
            if (result.length  > 0) {
                posts = posts.filter(post => post.userId != userId)
            }
            removeManageUsers()
            removeManagePost()
            renderManageUsers()
            renderManagePost()
        },
        error: function(result) {
            if (result.status == '404') {
                alert('Cannot remove user not in the database.')
            } else {
                alert('Server error')
            }
        }
    })
}

function deletePost() {
    const index = $(this).parent().siblings()[0].innerHTML
    console.log(posts[index]._id)
    const data = {
        id: posts[index]._id
    }
    // send delete(post)/update(user.post) request to server
    $.ajax({
        type: 'DELETE',
        data: data,
        url: '/adminpage/delete_post',
        success: function(result) {
            if (result) {
                posts.splice(index, 1)
                $(this).parent().parent().remove();
                removeManagePost()
                renderManagePost()
            } else {
                alert('Error')
            }
        }
    })
}



    
function removeManageUsers() {
    $('div').remove('.manageUserLine')
}

function renderManageUsers() {
    // Using response, dynamically display
   	
    // Requires users' informations from server
    // Server below requires server call	
    for (let u of users) {
        const div = document.createElement("div");
        let type = null;
        if (u.isBuyer) {
            type = 'Buyer'
        } else {
            type = 'Seller'
        }
        let status = null;
        let spanClass = null;
        if (u.isBanned) {
            status = 'banned'
            spanClass = 'badge badge-danger'
        } else {
            status = 'normal'
            spanClass= 'badge badge-success'
        }
        let banButton = null;
        if (u.isBanned) {
            banButton = 'Unban'
        } else {
            banButton = 'Ban'
        }
        const html = `<span><span class='userName'>${u.email}</span> (<span class="userType">${type}</span>)  <span class="${spanClass} status">${status}</span></span>
        <button class='ml-auto ban btn btn-primary'>${banButton}</button><button class="ml-3 delDiv btn btn-primary">Delete</button>`
        div.innerHTML = html
        div.className = "d-flex list-group-item manageUserLine"
        $('#manageUser').append(div)
    }
}


function removeManagePost() {
    $('tr').remove('.managePostRow')
}


function renderManagePost() {
    const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    let i = 0
    for (let p of posts) {
        p.date = new Date(p.date).toLocaleDateString("en-US", dataFormat)
        // const date = p.date.toLocaleDateString("en-US", dataFormat)
        const tr = document.createElement('tr')
        const html = `<td>${i}</td>
        <td>${p.title}</td>
        <td>${p.date}</td>
        <td>${p.userName}</td>
        <td><button class="delRow btn btn-primary">Delete</button></td>`
        tr.innerHTML = html;
        tr.className = 'managePostRow'
        $('tbody').append(tr);
        i++
    }
}

