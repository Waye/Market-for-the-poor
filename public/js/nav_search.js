"use strict";
console.log("navbar.js")  // log to the JavaScript console.

function getSearchResult() {
    return `
        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="/profile">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>

        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="/profile">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>
        
        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="/profile">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>`;
}

// Search box input
$("#topNav").after(`
<div class="modal" id="searchrResultModal" tabindex="-1" role="dialog" data-focus=false>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body p-1 pl-3 pr-3">
                ${getSearchResult()}
            </div>
        </div>
    </div>
</div>`);

$("body").on('click', function(){
    $('#searchrResultModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
})
$("#topNav").on('input', '#searchInput',function(){
    console.log("pressed")
    $('#searchrResultModal').modal('show');
});

function main() {
    console.log("navbar.js in main")
}
$(document).ready(main);