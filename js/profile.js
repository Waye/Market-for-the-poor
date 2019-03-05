"use strict";


// test buyer and seller on your own, you can mute one by comment
//currentUser1
//currentUser2






function createUserInfo(UserNew){

    $('#UserName').text(UserNew.UserName);
    $('#profile-image').attr("src",UserNew.avatar);

    $('#email').text(UserNew.email);
    $('#phone').text(UserNew.phone);

    if(UserNew.isBanned === true){
        $('#status').text("Banned");
        $('#status').addClass("text-danger");
    }else{
        $('#status').text("Active");
        $('#status').addClass("text-success");
    }

    if(UserNew.isBuyer === true){
        $('#buyerOrseller').text("Buyer");


    }else{
        $('#buyerOrseller').text("Seller");

    }
    $('#buyerOrseller').addClass("text-primary");
    $('#description').text(UserNew.description);


}

//create a profile
createUserInfo(currentUser2);

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







