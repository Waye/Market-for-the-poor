"use strict";

const posts = getPost()

function createUserInfo() {
    console.log(currentUser)

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
// $('#edit').click(editUserInfo)

function editUserInfo() {
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
    let role = null;

    if(post.isCompleted)
    {
        role = "completed"
    }
    else
    {
        role ='not completed'
    }

    const onePost=`<!--one post-->

                <div class="col-lg-3 col-md-6 mb-4 post-column">
                    <div class="card shadow request/offer" >

                                    <!--Card image-->
                   
                                    <div class="view overlay image-constrain">
                                        <img src="${post.image}"  class="card-img-top post-img " >
                                    </div>
                                    


                                    <!--Card content-->
                                    <div class="card-body text-center">
                                        <!--Title & role-->
                                        <h6 class="post-title font-weight-bold font-italic">${post.title}</h6>
                                        <h6 class="post-role text-primary">${role}</h6>
                                    </div>


                                    <div class="card-body">
                                            <a href="product_detail.html" class="btn btn-success">Detail</a>
                                            <a href="" class="btn btn-success" >Modify</a>
                                    </div>




                    </div>

                </div>
                        `;

    return onePost;

}

// click
//     get filter value
//     posts.filter(p => p.category == filtervakye)
// filter category



function renderPage(pagenum) {

    $('#post-TwoRow').html('')

    let end = pagenum * 8
    let start = end - 8

    let html=``


    if (posts.length < end) {
        end = posts.length
    }

    html=html+`<div class="row fadeIn post-row">`
    for (let i = start; i < end; i++) {


        html=html+createPost(posts[i])
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

    let pagenumber=Math.ceil(groupPost.length/8)


    for(let i=1; i<=pagenumber;i++)
    {
        let li=`<li class="page-item " id="${i}">
                                <a class="page-link " href="#${i}">${i}
                                    <!--<span class="sr-only">(current)</span>-->
                                </a>
                            </li>`;

        $('#pagenav').append(li);

    }

}


//use id to listen
$('#pagenav').on('click', '.page-item',function()
{
    renderPage($(this).attr('id'))
    //$(document).scrollTop($('#topNav').offset().top)


});


function main() {


    createUserInfo(currentUser);
    renderPage(1);
    createPagination(posts);
}
$(document).ready(main);









