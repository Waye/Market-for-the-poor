"use strict";
console.log("navbar.js")  // log to the JavaScript console.

const currentUser = getUser();

function getUser() {
    let mockUser = {
        name: "User2",
        password: "seller",
        email: "seller@gmail.com",
        phone: "4168888888",
        orderInfo: {
            twoMonthTotal : 48300,
            activeNum : 2,
            finishedNum : 21,
            postedNum : 4
        },
        // unreadNum: 3,
        messages: [
            {
                from: 'User2',
                to: 'User1',
                title: 'Offer Question',
                content: 'Hey, Could you give me some explanation on what is included in the frozen vegetables in your offer? Thank you!',
                date: new Date(2019, 1, 11),
                isRead: false,
                isStarred: true
            }, 
            {
                from: 'User1',
                to: 'User2',
                title: 'Answer To Question',
                content: 'Hey, it includes broccoli, lettuce, sliced tomato, sliced potato, and green beans. Let me know if you are interested.',
                date: new Date(2019, 1, 12),
                isRead: false,
                isStarred: false
            }, 
            {
                from: 'User3',
                to: 'User2',
                title: 'Regarding the Offer',
                content: 'Hello, I was wondering if you could give me some explanation on what is included in the frozen vegetables in your offer. Thank you!',
                date: new Date(2019, 2, 11),
                isRead: true,
                isStarred: false
            },
            {
                from: 'User2',
                to: 'User3',
                title: 'Response',
                content: 'Hello, it includes broccoli, lettuce, sliced tomato, sliced potato, and green beans. Let me know if you are interested.',
                date: new Date(2019, 2, 13),
                isRead: false,
                isStarred: false
            }
        ],
        posts: [
            {
                id: 31,
                title: "CLIF Energy Bar, Chocolate Brownie flavour",
                type: "offer",
                category: "food",
                quantity: "12 count",
                price: 5.99,
                userName: "User2",
                date: new Date(2018, 11, 24),
                dueDate: null,
                description: "Good Source of Protein and Fibre (contains 5g total fat), Non-GMO, 70% Organic Ingredients, Each Clif Bar is purposefully crafted for Feed Your Adventure. With 23 Vitamins and Minerals. No artificial sweeteners, colours, or preservatives.",
                image: "/img/clif.jpg",

            },
            {
                id: 32,
                title: "Nestea Lemon, Pack of 12 cans",
                type: "offer",
                category: "food",
                quantity: "5 packs",
                price: 30,
                userName: "User2",
                date: new Date(2018, 11, 9),
                dueDate: null,
                description: "A refreshing, preservative-free blend made with real tea and natural lemon flavour.",
                image: "/img/nestea.jpg",

            },
            {
                id: 33,
                title: "Crocs Clog",
                type: "offer",
                category: "clothing",
                quantity: "20 count",
                price: 200,
                userName: "User2",
                date: new Date(2019, 0, 3),
                dueDate: null,
                description: "Incredibly light and fun to wear, Pivoting heel straps for a more secure fit, Iconic Crocs Comfort: lightweight, flexible, 360-degree comfort, Ventilation ports add breathability and help shed water and debris, Water-friendly and buoyant; weighs only ounces, Odor-resistant, easy to clean, quick to dry",
                image: "/img/crocs.jpg",

            },
            {
                id: 34,
                title: "Affordable Mens Sweatshirt",
                type: "offer",
                category: "clothing",
                quantity: "30 count",
                price: 270,
                userName: "User2",
                date: new Date(2019, 1, 12),
                dueDate: null,
                description: "Good quality mens sweatshirt.",
                image: "/img/shirt.jpeg",

            },
            {
                id: 35,
                title: "Nestea Lemon, Pack of 12 cans",
                type: "offer",
                category: "food",
                quantity: "5 packs",
                price: 30,
                userName: "User2",
                date: new Date(2018, 11, 9),
                dueDate: null,
                description: "A refreshing, preservative-free blend made with real tea and natural lemon flavour.",
                image: "/img/nestea.jpg",

            },
            {
                id: 36,
                title: "CLIF Energy Bar, Chocolate Brownie flavour",
                type: "offer",
                category: "food",
                quantity: "12 count",
                price: 5.99,
                userName: "User2",
                date: new Date(2018, 11, 24),
                dueDate: null,
                description: "Good Source of Protein and Fibre (contains 5g total fat), Non-GMO, 70% Organic Ingredients, Each Clif Bar is purposefully crafted for Feed Your Adventure. With 23 Vitamins and Minerals. No artificial sweeteners, colours, or preservatives.",
                image: "/img/clif.jpg",

            },
            {
                id: 37,
                title: "Affordable Mens Sweatshirt",
                type: "offer",
                category: "clothing",
                quantity: "30 count",
                price: 270,
                userName: "User2",
                date: new Date(2019, 1, 12),
                dueDate: null,
                description: "Good quality mens sweatshirt.",
                image: "/img/shirt.jpeg",

            },
            {
                id: 38,
                title: "Crocs Clog",
                type: "offer",
                category: "clothing",
                quantity: "20 count",
                price: 200,
                userName: "User2",
                date: new Date(2019, 0, 3),
                dueDate: null,
                description: "Incredibly light and fun to wear, Pivoting heel straps for a more secure fit, Iconic Crocs Comfort: lightweight, flexible, 360-degree comfort, Ventilation ports add breathability and help shed water and debris, Water-friendly and buoyant; weighs only ounces, Odor-resistant, easy to clean, quick to dry",
                image: "/img/crocs.jpg",

            },
            {
                id: 39,
                title: "Nestea Lemon, Pack of 12 cans",
                type: "offer",
                category: "food",
                quantity: "5 packs",
                price: 30,
                userName: "User2",
                date: new Date(2018, 11, 9),
                dueDate: null,
                description: "A refreshing, preservative-free blend made with real tea and natural lemon flavour.",
                image: "/img/nestea.jpg",

            },
            {
                id: 40,
                title: "CLIF Energy Bar, Chocolate Brownie flavour",
                type: "offer",
                category: "food",
                quantity: "12 count",
                price: 5.99,
                userName: "User2",
                date: new Date(2018, 11, 24),
                dueDate: null,
                description: "Good Source of Protein and Fibre (contains 5g total fat), Non-GMO, 70% Organic Ingredients, Each Clif Bar is purposefully crafted for Feed Your Adventure. With 23 Vitamins and Minerals. No artificial sweeteners, colours, or preservatives.",
                image: "/img/clif.jpg",

            },
            {
                id: 41,
                title: "Crocs Clog",
                type: "offer",
                category: "clothing",
                quantity: "20 count",
                price: 200,
                userName: "User2",
                date: new Date(2019, 0, 3),
                dueDate: null,
                description: "Incredibly light and fun to wear, Pivoting heel straps for a more secure fit, Iconic Crocs Comfort: lightweight, flexible, 360-degree comfort, Ventilation ports add breathability and help shed water and debris, Water-friendly and buoyant; weighs only ounces, Odor-resistant, easy to clean, quick to dry",
                image: "/img/crocs.jpg",

            },
            {
                id: 42,
                title: "Nestea Lemon, Pack of 12 cnas",
                type: "offer",
                category: "food",
                quantity: "5 packs",
                price: 30,
                userName: "User2",
                date: new Date(2018, 11, 9),
                dueDate: null,
                description: "A refreshing, preservative-free blend made with real tea and natural lemon flavour.",
                image: "/img/nestea.jpg"
            },
            {
                id: 43,
                title: "Affordable Mens Sweatshirt",
                type: "offer",
                category: "clothing",
                quantity: "30 count",
                price: 270,
                userName: "User2",
                date: new Date(2019, 1, 12),
                dueDate: null,
                description: "Good quality mens sweatshirt.",
                image: "/img/shirt.jpeg",

            },
            {
                id: 44,
                title: "CLIF Energy Bar, Chocolate Brownie flavour",
                type: "offer",
                category: "food",
                quantity: "12 count",
                price: 5.99,
                userName: "User2",
                date: new Date(2018, 11, 24),
                dueDate: null,
                description: "Good Source of Protein and Fibre (contains 5g total fat), Non-GMO, 70% Organic Ingredients, Each Clif Bar is purposefully crafted for Feed Your Adventure. With 23 Vitamins and Minerals. No artificial sweeteners, colours, or preservatives.",
                image: "/img/clif.jpg",

            },
            {
                id: 45,
                title: "Crocs Clog",
                type: "offer",
                category: "clothing",
                quantity: "20 count",
                price: 200,
                userName: "User2",
                date: new Date(2019, 0, 3),
                dueDate: null,
                description: "Incredibly light and fun to wear, Pivoting heel straps for a more secure fit, Iconic Crocs Comfort: lightweight, flexible, 360-degree comfort, Ventilation ports add breathability and help shed water and debris, Water-friendly and buoyant; weighs only ounces, Odor-resistant, easy to clean, quick to dry",
                image: "/img/crocs.jpg",

            },
            {
                id: 46,
                title: "Affordable Mens Sweatshirt",
                type: "offer",
                category: "clothing",
                quantity: "30 count",
                price: 270,
                userName: "User2",
                date: new Date(2019, 1, 12),
                dueDate: null,
                description: "Good quality mens sweatshirt.",
                image: "/img/shirt.jpeg",

            },
            {
                id: 47,
                title: "Nestea Lemon, Pack of 12 cnas",
                type: "offer",
                category: "food",
                quantity: "5 packs",
                price: 30,
                userName: "User2",
                date: new Date(2018, 11, 9),
                dueDate: null,
                description: "A refreshing, preservative-free blend made with real tea and natural lemon flavour.",
                image: "/img/nestea.jpg",

            },
            {
                id: 48,
                title: "CLIF Energy Bar, Chocolate Brownie flavour",
                type: "offer",
                category: "food",
                quantity: "12 count",
                price: 5.99,
                userName: "User2",
                date: new Date(2018, 11, 24),
                dueDate: null,
                description: "Good Source of Protein and Fibre (contains 5g total fat), Non-GMO, 70% Organic Ingredients, Each Clif Bar is purposefully crafted for Feed Your Adventure. With 23 Vitamins and Minerals. No artificial sweeteners, colours, or preservatives.",
                image: "/img/clif.jpg",

            },
            {
                id: 49,
                title: "Crocs Clog",
                type: "offer",
                category: "clothing",
                quantity: "20 count",
                price: 200,
                userName: "User2",
                date: new Date(2019, 0, 3),
                dueDate: null,
                description: "Incredibly light and fun to wear, Pivoting heel straps for a more secure fit, Iconic Crocs Comfort: lightweight, flexible, 360-degree comfort, Ventilation ports add breathability and help shed water and debris, Water-friendly and buoyant; weighs only ounces, Odor-resistant, easy to clean, quick to dry",
                image: "/img/crocs.jpg",

            },
            {
                id: 50,
                title: "Affordable Mens Sweatshirt",
                type: "offer",
                category: "clothing",
                quantity: "30 count",
                price: 270,
                userName: "User2",
                date: new Date(2019, 1, 12),
                dueDate: null,
                description: "Good quality mens sweatshirt.",
                image: "/img/shirt.jpeg",

            },
            {
                id: 51,
                title: "Nestea Lemon, Pack of 12 cnas",
                type: "offer",
                category: "food",
                quantity: "5 packs",
                price: 30,
                userName: "User2",
                date: new Date(2018, 11, 9),
                dueDate: null,
                description: "A refreshing, preservative-free blend made with real tea and natural lemon flavour.",
                image: "/img/nestea.jpg",

            },
        ],
        isBanned: false,
        isBuyer: false,
        avatar: "/img/avatar_placeholder.png",
        description: "End hunger in our city."
    };
    return mockUser;
}

function getSearchResult() {
    return `
        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="/profile/buyer">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>

        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="/profile/buyer">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>
        
        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="/img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="/detail/buyer">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="/profile/buyer">User2</a> posted on <span>Dec 9, 2018</span></p>
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