"use strict";

const User = function(name, isBuyer, isBanned) {
	this.name = name;
    this.isBuyer = isBuyer;
    this.isBanned = isBanned;
    this.post = [];
}

const Post = function(id, date, title) {
    this.productId = id;
    this.postDate = date;
    this.title = title;
}
const Offer = function(id, date, title) {

}

const users = []
const offers = []
const posts = []

users.push(new User("User1", false, false));
users.push(new User("User2", true, true));
users.push(new User("User3", true, false));

posts.push(new Post(1, new Date(2018, 12, 31), 'Apple Juice'))
posts.push(new Post(1, new Date(2018, 11, 30), 'Mango Juice'))
posts.push(new Post(3, new Date(2019, 1, 31), 'Strawberry Juice'))

users[0].post.push(posts[0])
users[1].post.push(posts[1])
users[2].post.push(posts[2])


$(document).ready(function() {
    $(totalUserNum).innerHTML = users.length;
})

// dynamically produce htmls for manageUserSection
$(document).ready(function() {
    // send get request to get info
    get post
    //using response, dynamically display
    for (let e of users) {
        console.log(e)
        const div = document.createElement("div");
        let type = null;
        if (e.isBuyer) {
            type = 'Seller'
        } else {
            type = 'Buyer'
        }
        let status = null;
        let spanClass = null;
        if (e.isBanned) {
            status = 'banned'
            spanClass = 'badge badge-danger'
        } else {
            status = 'normal'
            spanClass= 'badge badge-success'
        }
        console.log(spanClass)
        const html = `<span>${e.name} (${type})  <span class="${spanClass}">${status}</span></span>
        <button class='ml-auto ban btn btn-primary'>Ban</button><button class="ml-3 del btn btn-primary">Delete</button>`
        console.log(html)
        div.innerHTML = html
        div.className = "d-flex list-group-item"
        console.log(div)
        $(manageUser).append(div)
    }
 
})


// function removeRow(row) {
//     const tbody = row.parentElement
//     tbody.removeElemtn
// }

// re