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
        }
    })

    $(totalUserNum)[0].innerHTML = users.length;
    
    // send get request to server and render dynamically
    renderManageUsers();
    renderManagePost();
})

// // dynamically produce htmls for manageUserSection
// $(document).ready(function () {
//     // send get request to server and render
//     renderManageUsers()
// })
// $(document).ready(function() {
//     //send get request to server and render
//     renderManagePost()
//  })
    
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


$('body').on('click', 'button.ban', banClick)

function banClick() {
    const topSpan = $(this).prev();
    const userEmail = topSpan.find('.userName')[0].innerHTML;
    console.log(userEmail)
    // send update request to server
    const data = {
        email: userEmail
    }
    $.ajax({
        
    })

    // banOrUnbanUser(userEmail);
    removeManageUsers();
    renderManageUsers();
}



// function banOrUnbanUser(email) {
//     const user = users.find(function(user) {
//         return user.email == email;
//     })
//     if (user.isBanned) {
//         user.isBanned = false;
//     } else {
//         user.isBanned = true;
//     }
// }

function removeManagePost() {
    $('tr').remove('.managePostRow')
}


function renderManagePost() {
    const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    for (let p of posts) {
        const date = p.date.toLocaleDateString("en-US", dataFormat)
        const tr = document.createElement('tr')
        const html = `<td>${p.id}</td>
        <td>${p.title}</td>
        <td>${date}</td>
        <td>${p.userName}</td>
        <td><button class="delRow btn btn-primary">Delete</button></td>`
        tr.innerHTML = html;
        tr.className = 'managePostRow'
        $('tbody').append(tr);
    }
}

$('body').on('click', 'button.delRow', delRowClick)

function delRowClick() {
    const postId = $(this).parent().siblings()[0].innerHTML
    // send delete(post)/update(user.post) request to server

    removePost(postId)
    $(this).parent().parent().remove();
}


function removePost(postId) {
    let user = users.find(function(user) {
        return user.post.includes(postId)
    })
    user.post = user.post.filter(function(post) {
        return post.id != postId
    })
    const index = posts.findIndex(function(post) {
        return post.id == postId
    })
    posts.splice(index, 1)
}

$('body').on('click', 'button.delDiv', delDivClick)

function delDivClick() {
    const userEmail = $(this).prev().prev().children('span.userName')[0].innerHTML
    // send delete(user)/update(post) request to server
    
    removeUser(userEmail)
    removeManageUsers()
    renderManageUsers()
    removeManagePost()
    renderManagePost()
}

function removeUser(email) {
    const index = users.findIndex(function(user) {
        return user.email == email;
    })

    users.splice(index, 1)
    let postToRemove = []

    for (let p of posts) {
        if (p.email == email) {
            postToRemove.push(p)
        }
    }
    for (let p of postToRemove) {
        const index = posts.indexOf(p)
        posts.splice(index, 1)
    }
}
