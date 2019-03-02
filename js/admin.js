"use strict";

const User = function(name, isBuyer, isBanned) {
	this.name = name;
    this.isBuyer = isBuyer;
    this.isBanned = isBanned;
    this.post = [];
}

const Post = function(productId, postDate, productName, userName) {
    this.productId = productId;
    this.postDate = postDate;
    this.productName = productName;
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
$(document).ready(function() {
    // send get request to get info

    //using response, dynamically display
    for (let u of users) {
        console.log(u)
        const div = document.createElement("div");
        let type = null;
        if (u.isBuyer) {
            type = 'Seller'
        } else {
            type = 'Buyer'
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
        console.log(spanClass)
        const html = `<span><span class='userName'>${u.name} </span>(<span class="userType">${type}</span>)  <span class="${spanClass} status">${status}</span></span>
        <button class='ml-auto ban btn btn-primary'>${banButton}</button><button class="ml-3 delDiv btn btn-primary">Delete</button>`
        div.innerHTML = html
        div.className = "d-flex list-group-item"
        $(manageUser).append(div)
    }
})


const dataFormat = { year: 'numeric', month: 'short', day: 'numeric' };

$(document).ready(function() {
    for (let p of posts) {
        console.log(p)
        const date = p.postDate.toLocaleDateString("en-US", dataFormat)
        const tr = document.createElement('tr')
        const html = `<td>${p.productId}</td>
        <td>${p.productName}</td>
        <td>${date}</td>
        <td>${p.userName}</td>
        <td><button class="delRow btn btn-primary">Delete</button></td>`
        tr.innerHTML = html;
        $('tbody').append(tr);
    }
    console.log($('tbody'))
})

$(document).ready(function() {
    $('.ban').click(function() {
        const a = $(this).prev()
        console.log(a)
        console.log(a.innerText)
    })
})

$(document).ready(function() {
    $('.delRow').click(function () {
        const postId = $(this).parent().siblings()[0].innerHTML
        console.log(postId)
        removePost(postId)
        $(this).parent().parent().remove();
    })
})

function removePost(postId) {
    let user = users.find(function(user) {
        return user.post.includes(postId)
    })
    user.post = user.post.filter(function(productId) {
        return productId != postId
    })
    console.log(user)
    const index = posts.findIndex(function(post) {
        return post.productId == postId
    })
    posts.splice(index, 1)
    console.log(posts)
    console.log(user.post)    
}
