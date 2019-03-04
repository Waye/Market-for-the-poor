"use strict";
console.log("post.js");

const postPopupElement = `
<div class="modal-dialog" role="document">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Post Detail</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <h6>Cover Image:</h6>
        <div role="group" class="btn-group" style="position: absolute;margin-left: auto;margin-right: auto;left: 0;right: 0;"></div>
        <img style="margin: 20px;width: 160px;height: 160px;" />
        <button class="btn btn-primary" type="button">Clear </button>
        <button class="btn btn-primary" type="button">Upload</button>
        <div class="table-responsive">
                
            <table class="table">
                <tbody>
                    <tr>
                        <td>Category:</td>
                        <td>
                            <div class="dropdown">
                                <button id="categoryCurrentSelection" class="btn btn-primary dropdown-toggle active" data-toggle="dropdown"
                                    aria-expanded="false" type="button">Category
                                </button>
                                <ul id="categoryMenu" class="dropdown-menu" role="menu">
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Title:</td>
                        <td><input id="title" type="text"></td>
                    </tr>
                    <tr>
                        <td>Quantity:</td>
                        <td><input id="quantity" type="text"></td>
                    </tr>
                    <tr>
                        <td>Needed Before:</td>
                        <td><input id="dueDate" type="date"></td>
                    </tr>
                    <tr>
                        <td>Price: </td>
                        <td><input id="price" type="text" placeholder="0 if donate"></td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td><textarea id="description" rows="5" cols="30"></textarea></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
     <div class="modal-footer">
        <button id="close" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="submit" type="button" class="btn btn-primary">Submit</button>
    </div>   
    </div>
</div>
</div>`;


$("#modal").html(postPopupElement);

const category = ['food', 'electronics', 'clothings', 'furnitures', 'tools', 'other']
const units = []

// for mock data
const User = function (name, description, icon, isBuyer, phone) {
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.isBuyer = isBuyer;
    this.phone = phone;
}

// for mock data
const Post = function(id, date, title, userName, description, price, quantity, image, dueDate, type) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.userName = userName;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.image = image;
    this.dueDate = dueDate;
    this.type = type;
}

// for mock data
const currentUser = new User('User1', 'Somewhere Over The Rainbow', 'img/avatar_placeholder.png', false, '(123) 111-1111')

$(document).ready(function() {
	renderCategory()

})

function renderCategory() {
	let html = ''
	for (let c of category) {
		html = html + `<li><a class="dropdown-item" role="presentation">${c}</a></li>`
	}
	$('#categoryMenu').html(html);
}

$('#categoryMenu').on('click', 'li a', currentSelectionCategory)

function currentSelectionCategory() {
	$("#categoryCurrentSelection").text($(this).text());
}

function removeAll() {
	$('.modal-dialog').html('')
}

$('#close').click(removeAll);
$('#submit').click(getInputData);

function getInputData() {
	const date = new Date()
	const title = $('#title').val()
	const userName = currentUser.name
	const description = $('#description').val()
	const price = $('#price').val()
	const quantity = $('#quantity').val()
	const image = ''
    const dueDate = $('#dueDate').val()
    const type = (currentUser.isBuyer ? "request" : "offer")
	const newPost = new Post('0004', date, title, userName, description, price, quantity, image, dueDate, type)
    
    // send new post data to backend and save to database
    console.log(newPost)
	removeAll()
}


