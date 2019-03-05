"use strict";

function createUserInfo(userNew){
    console.log(userNew)

    $('#userName').text(userNew.userName);
    $('#profileImage').attr("src", userNew.avatar);

    $('#email').text(userNew.email);
    $('#phone').text(userNew.phone);

    if(userNew.isBanned){
        $('#status').text("Banned");
        $('#status').addClass("text-danger");
    }else{
        $('#status').text("Active");
        $('#status').addClass("text-success");
    }

    if(userNew.isBuyer){
        $('#buyerOrSeller').text("Buyer");


    }else{
        $('#buyerOrSeller').text("Seller");

    }
    $('#buyerOrseller').addClass("text-primary");
    $('#userDescription').html(userNew.description);

}

//create a profile
$(document).ready(createUserInfo(currentUser))

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






// //0,1,2,3,4,5,6,7
// function pageBoundle(groupPost){
//     let counter=1
//     let row=[]
//     let page=[]
//     let pagestack=[]
//     for(let i=0;i<groupPost.length;i++){
//
//         row.push(createPost(groupPost[i]))
//         if(counter%4 === 0)
//         {
//             page.push(createRow(row))
//             row=[]
//         }
//         if((counter%8 === 0) || (counter=groupPost.length))
//         {
//             pagestack.push(createPage(page))
//             page=[]
//         }
//         counter++
//     }
//     return pagestack
// }


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
                                    <div class="view overlay">
                                        <img src="${post.image}"  class="card-img-top post-img" >
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
function createRow(){

    let newRow=`<div class="row fadeIn post-row">
</div>`;
    return newRow
}




function renderPage(pagenum) {


    let end = pagenum * 8
    let start = end - 8

    let html=``

    if (posts.length < end) {
        end = posts.length
    }
    for (let i = start; i < end; i++) {


        html=html+createPost(post[i])
        if (i == start + 4){
            html=html+createRow()
        }

        html = html + post[i]//string of html

        if(i== start + 8){

        }



    }

}





function createPagination(groupPost){

    let pagenumber=Math.ceil(groupPost.length/8)


    const preview=`<!--Arrow left-->
                            <li class="page-item id="Previous">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>`
    $('#pagenav').append(preview)

    for(let i=1; i<pagenumber;i++)
    {
        let li=`<li class="page-item " id="${i}">
                                <a class="page-link ">${i}
                                    <!--<span class="sr-only">(current)</span>-->
                                </a>
                            </li>`;

        $('#pagenav').append(li);

    }

    const next=`<li class="page-item " id="next">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>`;

    $('#pagenav').append(next);
}


//use id to listen
$('#pagenav').on('click', '.page-item',renderPage($(this).attr('id')));


function main() {

    let postGroup=getPost();
    createUserInfo(currentUser);

    createPagination(postGroup);
}
$(document).ready(main);









