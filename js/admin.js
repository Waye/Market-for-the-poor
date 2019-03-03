"use strict";

const User = function(name, isBuyer, isBanned) {
	this.name = name;
    this.isBuyer = isBuyer;
    this.isBanned = isBanned;
    this.post = [];
}

const Post = function(postId, postDate, postTitle, userName) {
    this.postId = postId;
    this.postDate = postDate;
    this.postTitle = postTitle;
    this.userName = userName;
}

const users = []
const posts = []

users.push(new User("User1", false, false));
users.push(new User("User2", true, true));
users.push(new User("User3", true, false));

posts.push(new Post('0001', new Date(2018, 12, 31), 'Apple Juice', 'User1'))
posts.push(new Post('0002', new Date(2018, 11, 30), 'Mango Juice', 'User2'))
posts.push(new Post('0003', new Date(2019, 1, 31), 'Strawberry Juice', 'User3'))

// user's post array stores post ids
users[0].post.push('0001')
users[1].post.push('0002')
users[2].post.push('0003')


//Total user number display
$(document).ready(function() {
    $(totalUserNum).innerHTML = users.length;
})

// dynamically produce htmls for manageUserSection
$(document).ready(function () {
    // send get request to server and render
    renderManageUsers()
})
$(document).ready(function() {
    //send get request to server and render
    renderManagePost()
 })
    
function removeManageUsers() {
    $('div').remove('.manageUserLine')
}

function renderManageUsers() {
    //using response, dynamically display
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
        const html = `<span><span class='userName'>${u.name}</span> (<span class="userType">${type}</span>)  <span class="${spanClass} status">${status}</span></span>
        <button class='ml-auto ban btn btn-primary'>${banButton}</button><button class="ml-3 delDiv btn btn-primary">Delete</button>`
        div.innerHTML = html
        div.className = "d-flex list-group-item manageUserLine"
        $('#manageUser').append(div)
    }
}


$('body').on('click', 'button.ban', banClick)

function banClick() {
    const topSpan = $(this).prev();
    const userName = topSpan.find('.userName')[0].innerHTML;
    // send update request to server

    banOrUnbanUser(userName);
    removeManageUsers();
    renderManageUsers();
}



function banOrUnbanUser(userName) {
    const user = users.find(function(user) {
        return user.name == userName;
    })
    if (user.isBanned) {
        user.isBanned = false;
    } else {
        user.isBanned = true;
    }
}

function removeManagePost() {
    $('tr').remove('.managePostRow')
}


function renderManagePost() {
    const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    for (let p of posts) {
        const date = p.postDate.toLocaleDateString("en-US", dataFormat)
        const tr = document.createElement('tr')
        const html = `<td>${p.postId}</td>
        <td>${p.postTitle}</td>
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
    user.post = user.post.filter(function(productId) {
        return productId != postId
    })
    const index = posts.findIndex(function(post) {
        return post.productId == postId
    })
    posts.splice(index, 1)
}

$('body').on('click', 'button.delDiv', delDivClick)

function delDivClick() {
    const userName = $(this).prev().prev().children('span.userName')[0].innerHTML
    // send delete(user)/update(post) request to server
    
    removeUser(userName)
    removeManageUsers()
    renderManageUsers()
    removeManagePost()
    renderManagePost()
}

function removeUser(userName) {
    const index = users.findIndex(function(user) {
        return user.name == userName;
    })

    users.splice(index, 1)
    let postToRemove = []

    for (let p of posts) {
        if (p.userName == userName) {
            postToRemove.push(p)
        }
    }
    for (let p of postToRemove) {
        const index = posts.indexOf(p)
        posts.splice(index, 1)
    }
}