"use strict";

// server call to get posts
const posts = getPost()
let filterResult =[]

function createUserInfo() {


    $('#userName').text(currentUser.userName);
    $('#profileImage').attr("src", currentUser.avatar);

    $('#email').text(currentUser.email);
    $('#phone').text(currentUser.phone);

    if (currentUser.isBanned) {
        $('#status').text("Banned");
        $('#status').addClass("text-danger");
    } else {
        $('#status').text("Active");
        $('#status').addClass("text-success");
    }

    if (currentUser.isBuyer) {
        $('#buyerOrSeller').text("Buyer");


    } else {
        $('#buyerOrSeller').text("Seller");

    }
    $('#buyerOrseller').addClass("text-primary");
    $('#userDescription').html(currentUser.description);

}

//create a profile
$(document).ready(createUserInfo())

$('#editBtn').click(displayEditForm)

function displayEditForm() {

    const html = `
    <form class="editForm">
        <div class="container">
            <h1>Register</h1>
            <table>
            <tr><td>Email: 
            <td><input id="emailEdit" type="text" placeholder="Email"></td></tr>
            <tr><td>Phone:</td>
            <td><input id="phoneEdit" type="text" placeholder="Phone"></td></tr>
            <tr><td>Password:</td>
            <td><input id="passwordEdit" type="text" placeholder="Enter Password"></td></tr>
            
            <tr><td>Description:</td>
            <td><textarea id="descriptionEdit" type="text" placeholder="Description" rows="4" cols="30"></textarea></td></tr>
            </table>
            <div id="editButtonContainer">
            <button id="edit" type="button" class="btn btn-success ml-auto">Edit</button>
            </div>
        </div>
    </form>`
    $('#editFormContainer').html(html)
}

$('body').on('click', '#edit', editUserInfo)

function editUserInfo(){
    const email = $('#emailEdit').val()
    const password = $('#passwordEdit').val()
    const phone = $('#phoneEdit').val()
    const description = $('#descriptionEdit').val()
    currentUser.email = email;
    currentUser.password = password
    currentUser.phone = phone
    currentUser.description = description
    // console.log(description)
    // console.log(currentUser.description)
    $('#editFormContainer').html('')
    createUserInfo(currentUser)
}

function createPost(post){
    let detail

    if(post.type==="request"){
        detail = 'product_detail_buyer.html'
    }
    else if (post.type==="offer"){
        detail = 'product_detail_seller.html'
    }
    const onePost=`<!--one post-->

                <div class="col-lg-3 col-md-6 col-sm-6 mb-4 post-column">
                    <div class="card shadow postCard" >
                                    <!--Card image-->
                                    <div class="image-constrain">
                                        <img src="${post.image}"  class="card-img-top post-img p-3" >
                                    </div>
                                    <!--Card content-->
                                    <div class="card-body text-center">
                                        <!--Title & role-->
                                        <h6 class="post-title font-weight-bold font-italic text-truncate">${post.title}</h6>
                                        <h6 class="post-role text-primary">${post.price}, <small>${post.quantity}</small></h6>
                                        <a href="${detail}" class="btn btn-light">Detail</a>
                                        <!--<a href="" class="btn btn-light" >Modify</a>-->
                                    </div>
                    </div>
                </div>
                        `;
    return onePost;
}

function renderPage(pagenum,postgroup){

    $('#post-TwoRow').html('')

    let end = pagenum * 8
    let start = end - 8
    let html=``


    if (postgroup.length < end) {
        end = postgroup.length
    }

    html=html+`<div class="row fadeIn post-row">`
    for (let i = start; i < end; i++) {


        html=html+createPost(postgroup[i])
        if (i === start + 3){
            html=html+`</div>`
            html=html+`<div class="row fadeIn post-row">`

        }
        else if(i === end-1){
            html=html+`</div>`
        }
    }

    $('#post-TwoRow').append(html)

}

function createPagination(groupPost){
    $('#pagenav').html('')


    let pagenumber=Math.ceil(groupPost.length/8)

    for(let i=1; i<=pagenumber;i++)
    {
        let li=`<li class="page-item " id="${i}">
                                <a class="page-link " href="#">${i}
                                    <!--<span class="sr-only">(current)</span>-->
                                </a>
                            </li>`;

        $('#pagenav').append(li);
    }
}

//filter for nav-filter-bar
function filter(keyword){
    filterResult = []
    if (keyword == "Total") {
        filterResult = posts
    } else {
        posts.forEach(f => {
            if (f.category == keyword){
                filterResult.push(f)}
        })}

}

//use id to listen id for pagination
$('#pagenav').on('click', '.page-item',function()
{
    const key = $(this).attr('id')
    renderPage(key, filterResult)
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// find keyword to filter
$('#filter-apply-nav').on('click', '.nav-item',function()
{
    filter($(this).find(".nav-link").attr("id"))
    createPagination(filterResult)
    renderPage(1,filterResult)
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


function main() {
    createUserInfo(currentUser);
    filter('Total')
    renderPage(1,filterResult);
    createPagination(filterResult);
}
$(document).ready(main);








