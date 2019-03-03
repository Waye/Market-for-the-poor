const User = function (name, description, icon, isBuyer) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.isBuyer = isBuyer;
}

const Post = function(id, date, title, userName, description, price, quantity, image, dueDate) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.userName = userName;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.dueDate = dueDate;
}


const user = new User('User1', 'Twitter, Inc. 795 Folsom Ave, Suite 600 San Francisco, CA 94107 P: (123) 456-7890', 'img/avatar_placeholder.png', true)
const post = new Post('0001', new Date(2018, 11, 31), 'Frozen Vegetables', 'User1',
 'Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste.',
  100, '10 kg', 'img/frozen_veg.png', new Date(2019, 1, 6));

$(document).ready(function() {
    renderPostTitle()
    renderSlidePic()
    renderPostDate()
    renderUserType()
    renderUserImage()
    renderUserDescription()
})

function renderPostTitle() {    
    const html = `<h3>${post.title}</h3><h3 class="ml-auto">$${post.price}</h3>
            <p class="ml-3">for <span>${post.quantity}</span></p>`
    $('#postTitle')[0].innerHTML = html;
}

function renderSlidePic() {
    const html = `<div class="carousel-item active"><img class="d-block w-100" src="${post.image}" alt="First slide"></div>
    <div class="carousel-item"><img class="d-block w-100" src="${post.image}" alt="Second slide"></div>
    <div class="carousel-item"><img class="d-block w-100" src="${post.image}" alt="Third slide"></div>`
    $('#imgSlideContainer')[0].innerHTML = html
}

const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };


function renderPostDate() {
    const timeDiff = (post.dueDate.getTime() - post.date.getTime())/1000;
    const dayDiff = Math.ceil(timeDiff/(3600 * 24))
    const postDate = post.date.toLocaleDateString("en-US", dateFormat)
    const dueDate = post.dueDate.toLocaleDateString("en-US", dateFormat)
    const html = `<p>Posted on <span id="postDate">${postDate}</span></p>
    <p>Needed before <span id="dueDate">${dueDate}</span>, <span id="remainingDays">${dayDiff} </span>days remaining.</p>`
    $(dateInfo)[0].innerHTML = html;
}

function renderUserType() {
    let userType = null;
    if (user.isBuyer) {
        userType = 'buyer'
    } else {
        userType = 'seller'
    }
    const html = `<h4>About this ${userType}</h4>`
    $('#userType')[0].innerHTML = html;
}

function renderUserImage() {
    const html = `<a href="#" class="text-center">
    <div class="mr-auto ml-auto"><img alt="..." src="${user.icon}" class="rounded-circle avatar"></div>
    <h6 class="h-0 mt-2 mb-1">${user.name}</h6></a>`
    $('#userImageContainer')[0].innerHTML = html
    console.log($('#userImageContainer')[0])
}

function renderUserDescription() {
    const html = `<p><strong>Twitter, Inc.</strong> 795 Folsom Ave, Suite 600 San Francisco, CA 94107<abbr title="Phone">P:</abbr> (123) 456-7890</p>`
    $(userDescription)[0].innerHTML = html
}