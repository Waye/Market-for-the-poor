"use strict";


// User
const Userprofile=function(imgUrl, id, UserName, email, phone, isBuyer, isBanned, description, ){
    this.imgUrl=imgUrl;
    this.id=id;
    this.UserName=UserName;
    this.email=email;
    this.phone=phone;
    this.isBuyer=isBuyer;
    this.isBanned=isBanned;
    this.description=description;

}


// Post
const post=function(UserName,id, isRequest, date, title, description, quantity, price, imgUrl, isCompleted, dueDated, category){

    this.UserName=UserName;
    this.id=id;
    this.isRequest=isRequest;
    this.date=date;
    this.title=title;
    this.description=description;
    this.quantity=quantity;
    this.price=price;
    this.imgUrl=imgUrl;
    this.isCompleted=isCompleted;
    this.dueDate=dueDated;
    this.category=category;

}


//mock data
const userProfile1 = new Userprofile("img/profile-image.jpg","00001", "Arther","waye@gmail.com","648-888-6199", true, false, "charity's 'purpose' is what it is set up to achieve. Its 'powers' are what it can do to help achieve the purpose, such as raise funds, buy property or borrow money. The difference is that the powers are about how the charity operates; the purpose is about what it delivers");
const post1 = new post("img/clothes_market.jpeg", "0001", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );
const post2 = new post("img/frozen_veg.png", "0002", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );
const post3 = new post("img/frozen_veg.png", "0003", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","electronic" );
const post4 = new post("img/frozen_veg.png", "0004", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","clothing" );
const post5 = new post("img/frozen_veg.png", "0005", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", true, "2019,12,13","furniture" );
const post7 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","tool" );
const post8 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", true, "2019,12,13","other" );
const post9 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","clothing");
const post10 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", true, "2019,12,13","food" );
const post11 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );
const post12 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", true, "2019,12,13","food" );
const post13 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", true, "2019,12,13","furniture");
const post14 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );
const post15 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","other" );
const post16 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );

const post17 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","other" );
const post18 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", true, "2019,12,13","furniture" );
const post19 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );
const post20 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );
const post6 = new post("img/frozen_veg.png", "0006", true, "2018,1,6","male NO 1", "so good you giys should nedd it", 10, "$100","img/frozen_veg.png", false, "2019,12,13","food" );


function createUserInfo(User123){
    $('#UserName').text(User123.UserName);
    $('#profile-image').attr("src",User123.imgUrl);

    $('#email').text(User123.email);
    $('#phone').text(User123.phone);

    if(User123.isBanned === true){
        $('#status').text("Banned");
        $('#status').addClass("text-danger");
    }else{
        $('#status').text("Active");
        $('#status').addClass("text-success");
    }

    if(User123.isBuyer === true){
        $('#buyerOrseller').text("Buyer");


    }else{
        $('#buyerOrseller').text("Seller");

    }
    $('#buyerOrseller').addClass("text-primary");
    $('#description').text(User123.description);


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
                                    <div class="view overlay">
                                        <img src="${post.imgUrl}"  class="card-img-top post-img" >
                                    </div>


                                    <!--Card content-->
                                    <div class="card-body text-center">
                                        <!--Title & role-->
                                        <h6 class="post-title font-weight-bold font-italic">${post.title}</h6>
                                        <h6 class="post-role text-primary">${role}</h6>
                                    </div>
                                    
                                    
                                    <div class="card-body">
                                            <a href="product_detail.html" class="btn btn-success">Detail</a>
                                            <a href="#" class="btn btn-success">Modify</a>
                                    </div>
                                    
                                            
                                    
                             
                    </div>
                             
                </div>
                        `;

    return onePost;

}

// fetch datafrom database
const postGroup1=[post1,post2,post3,post4,post5,post6,post7,post8,post9,post10,post11,post12,post13,post14,post15,post16,post17,post18,post19,post20,];


function createPostGroup(postGroup){

    for(let i in postGroup)
    {
        //create a row
        if(i <=3){
            $('#post-row1').append(createPost(postGroup[i]))
        }
        //create a row
        if(i<=7 && i>=4){
            $('#post-row2').append(createPost(postGroup[i]))
        }
    }
}



// get total post from database so that we can decide number index in pagination
function createPagination(numofPost){

    let pageNumber= Math.ceil(numofPost/8);






}

createUserInfo(userProfile1);
createPostGroup(postGroup1);





