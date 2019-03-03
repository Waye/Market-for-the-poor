"use strict";
console.log("post.js");

const postPopupElement = `
<div class="modal-dialog" role="document">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Post Form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        <div class="table-responsive">
            <table class="table">
                <tbody>
                    <tr>
                        <th>Category:</th>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                    aria-expanded="false" type="button">Food&nbsp;
                                </button>
                                <div class="dropdown-menu" role="menu"><a class="dropdown-item" role="presentation"
                                        href="#">First Item</a>
                                    <a class="dropdown-item" role="presentation" href="#">Second Item</a>
                                    <a class="dropdown-item" role="presentation" href="#">Third Item</a></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Title:</td>
                        <td><input type="text"></td>
                    </tr>
                    <tr>
                        <td>Quantity:</td>
                        <td><input type="text"></td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"
                                    aria-expanded="false" type="button">Liter&nbsp;
                                </button>
                                <div class="dropdown-menu" role="menu">
                                    <a class="dropdown-item" role="presentation" href="#">First Item</a>
                                    <a class="dropdown-item" role="presentation" href="#">Second Item</a>
                                    <a class="dropdown-item" role="presentation" href="#">Third Item</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Needed Before:</td>
                        <td><input type="date"></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" id="formCheck-1">
                                <label class="form-check-label" for="formCheck-1">Price:</label>
                            </div>
                        </td>
                        <td><input type="text"></td>
                        <td>
                            <div class="form-check"><input class="form-check-input" type="radio" id="formCheck-2">
                                <label class="form-check-label" for="formCheck-2">Label</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Description:</td>
                        <td><textarea></textarea></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Submit</button>
    </div>
</div>
</div>`;

$("#modal").html(postPopupElement);
