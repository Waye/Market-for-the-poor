"use strict";

function createUserInfo(userNew){

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
        $('#buyerOrseller').text("Seller");

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

// function createPost(post){
//     let role = null;
//
//     if(post.isCompleted)
//     {
//         role = "completed"
//     }
//     else
//     {
//         role ='not completed'
//     }
//
//     const onePost=`<!--one post-->
//
//                 <div class="col-lg-3 col-md-6 mb-4 post-column">
//                     <div class="card shadow request/offer" >
//
//                                     <!--Card image-->
//                                     <div class="view overlay">
//                                         <img src="${post.imgUrl}"  class="card-img-top post-img" >
//                                     </div>
//
//
//                                     <!--Card content-->
//                                     <div class="card-body text-center">
//                                         <!--Title & role-->
//                                         <h6 class="post-title font-weight-bold font-italic">${post.title}</h6>
//                                         <h6 class="post-role text-primary">${role}</h6>
//                                     </div>
//
//
//                                     <div class="card-body">
//                                             <a href="product_detail.html" class="btn btn-success">Detail</a>
//                                             <a href="" class="btn btn-success" >Modify</a>
//                                     </div>
//
//
//
//
//                     </div>
//
//                 </div>
//                         `;
//
//     return onePost;
//
// }
//
// // fetch datafrom database
// const postGroup1=[post1,post2,post3,post4,post5,post6,post7,post8,post9,post10,post11,post12,post13,post14,post15,post16,post17,post18,post19,post20,];
//
// function array(postList){
//
//     const pageNumber = Math.ceil(postList.length/8);
//     let pageStack=[];
//
//     // for(let j=0; j<= postList.length;j++){
//     //      let singlePage= []
//     //    for(let i =1;i<= pageNumber;i++){
//     //        singlePage.push(postList[j]);
//     //
//     //        if((j+1)%8===0){
//     //            break;
//     //        }
//     //    }
//     //    pageStack.push(singlePage)
//     // }
//
//
//     for(let i=0; i<postList.length; i++){
//         let singlePage=[];
//     }
//
//
//     return pageStack;
// }
//
// console.log(array(postGroup1));







