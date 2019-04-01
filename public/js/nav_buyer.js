"use strict";
console.log("nav_buyer.js")  // log to the JavaScript console.

const currentUser = getUser();

function getMessage() {
    return currentUser.messages;
}

function getPost() {
    return currentUser.posts;
}

function getUser() {
    let mockUser = {
        name: "User1",
        password: "buyer",
        email: "buyer@gmail.com",
        phone: "4166666666",
        orderInfo: {
            activeNum : 0,
            finishedNum : 3,
            postedNum : 4
        },
        // unreadNum: 5,
        messages: [
            {
                from: 'User2',
                to: 'User1',
                title: 'Offer Question',
                content: 'Hey, Could you give me some explanation on what is included in the frozen vegetables in your offer? Thank you!',
                date: new Date(2019, 1, 11),
                isRead: true,
                isStarred: true
            }, 
            {
                from: 'User1',
                to: 'User2',
                title: 'Answer To Question',
                content: 'Hey, it includes broccoli, lettuce, sliced tomato, sliced potato, and green beans. Let me know if you are interested.',
                date: new Date(2019, 1, 12),
                isRead: true,
                isStarred: false
            }, 
            {
                from: 'User3',
                to: 'User1',
                title: 'Regarding the Offer',
                content: 'Hello, I was wondering if you could give me some explanation on what is included in the frozen vegetables in your offer. Thank you!',
                date: new Date(2019, 2, 11),
                isRead: false,
                isStarred: false
            },
            {
                from: 'User1',
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
                id: 1,
                title: "Canned soup",
                type: "request",
                category: "food",
                quantity: "20 unit",
                price: 89,
                userName: "User1",
                date: new Date(2018, 11, 10),
                dueDate: new Date(2018, 12, 30),
                description: "Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste. Initial request of 10kg is made. After first purchase, we are willing to make ongoing, continuous orders if the quality of the product is approved.",
                image: "img/canned_soup.jpg",
                isCompleted:true

            }, 
            {
                id: 2,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 3,
                title: "Frozen vegetables",
                type: "request",
                category: "food",
                quantity: "10 kg",
                price: 100,
                userName: "User1",
                date: new Date(2019, 0, 9),
                dueDate: new Date(2019, 1, 30),
                description: "Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste. Initial request of 10kg is made. After first purchase, we are willing to make ongoing, continuous orders if the quality of the product is approved.",
                image: "img/frozen_veg.png",
                isCompleted:true
            },
            {
                id: 4,
                title: "Android tablet (used or new)",
                type: "request",
                category: "electronics",
                quantity: "2 unit",
                price: 199,
                userName: "User1",
                date: new Date(2019, 1, 10),
                dueDate: new Date(2019, 3, 1),
                description: "We plan to upgrade to paperless workflow. Our reception desk need 2 basic Android tablet to access our database and deal with visitors.",
                image: "img/tablet.jpg",
                isCompleted:true
            },
            {
                id: 5,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 6,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 7,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 8,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 9,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: true
            },
            {
                id: 10,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 11,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 12,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: true
            },
            {
                id: 13,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 14,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: true
            },
            {
                id: 15,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 16,
                title: "Canned soup",
                type: "request",
                category: "food",
                quantity: "20 unit",
                price: 89,
                userName: "User1",
                date: new Date(2018, 11, 10),
                dueDate: new Date(2018, 12, 30),
                description: "Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste. Initial request of 10kg is made. After first purchase, we are willing to make ongoing, continuous orders if the quality of the product is approved.",
                image: "img/canned_soup.jpg",
                isCompleted:true

            },
            {
                id: 17,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 18,
                title: "Frozen vegetables",
                type: "request",
                category: "food",
                quantity: "10 kg",
                price: 100,
                userName: "User1",
                date: new Date(2019, 0, 9),
                dueDate: new Date(2019, 1, 30),
                description: "Mix of 10 kinds of vegetables. Frozen and packaged safely. Easy to Cook while good in taste. Initial request of 10kg is made. After first purchase, we are willing to make ongoing, continuous orders if the quality of the product is approved.",
                image: "img/frozen_veg.png",
                isCompleted:true
            },
            {
                id: 19,
                title: "Android tablet (used or new)",
                type: "request",
                category: "electronics",
                quantity: "2 unit",
                price: 199,
                userName: "User1",
                date: new Date(2019, 1, 10),
                dueDate: new Date(2019, 3, 1),
                description: "We plan to upgrade to paperless workflow. Our reception desk need 2 basic Android tablet to access our database and deal with visitors.",
                image: "img/tablet.jpg",
                isCompleted:true
            },
            {
                id: 20,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 21,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 22,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 23,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 24,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 25,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 26,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 27,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },{
                id: 28,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },{
                id: 29,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            },
            {
                id: 30,
                title: "Basic desk lamp",
                type: "request",
                category: "tools",
                quantity: "8 unit",
                price: 80,
                userName: "User1",
                date: new Date(2018, 11, 23),
                dueDate: new Date(2019, 0, 10),
                description: "Our office is in need of desk lamp. ",
                image: "img/lamp.jpg",
                isCompleted: false
            }




        ],
        isBanned: false,
        isBuyer: true,
        avatar: "img/profile-image.jpg",
        description: "Somewhere Over The Rainbow"
    };
    return mockUser;
}

function getSearchResult() {
    return `
        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="product_detail_buyer.html">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="profile_seller.html">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>

        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="product_detail_buyer.html">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="profile_seller.html">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>
        
        <div class="row mt-2 mb-2 border-bottom result">
        <div class="col-3 mb-2"><img class="rounded" alt="..." src="img/nestea.jpg"></div>
        <div class="col-9">
            <h5><a href="product_detail_buyer.html">Nestea Lemon, Pack of 12 cans</a> <small>5 packs</small></h5>
            <p><a href="profile_seller.html">User2</a> posted on <span>Dec 9, 2018</span></p>
        </div></div>`;
}

function addNavContent(user) {
    // Logo and home page redirect
    const logoLink = document.createElement("a");
    logoLink.className += "navbar-brand";
    logoLink.setAttribute("href", "feedpage_buyer.html");
    const svgFillColor = "#17a2b8";
    logoLink.innerHTML = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       width="48" height="48" viewBox="0 0 12.7 12.7" version="1.1" id="svg8"
       inkscape:version="0.92.4 (5da689c313, 2019-01-14)" sodipodi:docname="logo.svg"> <defs id="defs2"/>
      <metadata id="metadata5"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata>
      <g inkscape:groupmode="layer" id="layer4" inkscape:label="heart svg" style="display:inline" fill="${svgFillColor}">
        <path style="display:inline;opacity:0.3260002;fill:${svgFillColor};stroke-width:0.02469392"
           d="M 0.73638914,0.63303628 C 0.41665181,1.1805947 0.77412227,1.5459021 1.1970223,1.745924 2.14133,4.2144053 3.0827133,6.6840522 4.0137085,9.1575804 3.2210025,9.7236752 2.8938577,10.921075 3.4921153,11.746052 4.1800806,12.84337 5.980739,12.767378 6.5875712,11.602261 6.9081348,11.06788 6.6035316,10.549013 7.034963,10.378015 8.5101614,9.8325785 9.9886348,9.2958083 11.459765,8.7395181 10.93414,7.7763975 10.343056,8.4058526 9.6602858,8.5782604 8.6395093,8.9610347 7.6210892,9.3502436 6.5975293,9.7255043 6.1967337,9.1499395 5.5711118,8.8158737 4.8650874,8.8795801 4.5977868,8.820524 4.5922205,8.4169056 4.4758572,8.1390759 3.5797397,5.7749058 2.6831536,3.4109138 1.7864542,1.0469645 Z M 5.0281167,9.6614257 C 6.021675,9.6022672 6.5000377,11.064316 5.6295927,11.577766 4.9135503,12.104952 3.7943591,11.388359 4.0101419,10.51479 4.0901506,10.029845 4.5450016,9.6725588 5.0281167,9.6614257 Z"
           id="path3769" inkscape:connector-curvature="0" sodipodi:nodetypes="ccccccccccccccccc" fill="${svgFillColor}"/>
        <path style="stroke-width:0.0625" d="M 17.989604,47.262514 C 16.564366,47.112 15.196111,46.488679 14.187161,45.530276 c -1.67432,-1.590441 -2.40117,-3.761207 -2.014027,-6.014973 0.317683,-1.849402 1.387435,-3.65121 2.820133,-4.750013 l 0.202301,-0.155153 -1.86649,-4.93656 C 10.990757,23.489101 10.079144,21.090659 7.0056595,13.036734 L 4.5441453,6.5864503 4.1114377,6.3492568 C 3.5955098,6.0664451 2.8964615,5.4371886 2.6712013,5.0528111 2.5821084,4.9007855 2.4639962,4.5998979 2.4087298,4.3841721 2.2876161,3.9114191 2.3560579,3.3529584 2.6037491,2.7928847 2.7367682,2.4921049 2.7788611,2.446195 2.894007,2.4763063 c 0.074072,0.01937 0.968439,0.364386 1.9874819,0.7667015 L 6.7342942,3.9744904 11.867282,17.512004 c 2.823143,7.445632 5.234884,13.885612 5.359425,14.311065 0.265394,0.906634 0.452997,1.30426 0.722254,1.530825 0.248071,0.208739 0.285011,0.215437 1.373256,0.248995 0.723684,0.02232 1.023425,0.06062 1.487901,0.190149 1.571457,0.438226 2.99598,1.443033 3.986016,2.81159 l 0.130167,0.179934 1.307333,-0.482521 c 0.719033,-0.265387 3.290145,-1.228392 5.713583,-2.14001 2.423437,-0.911619 4.645312,-1.734069 4.9375,-1.827667 0.292187,-0.0936 0.939062,-0.341156 1.4375,-0.55013 1.333627,-0.559135 1.737937,-0.672073 2.40625,-0.672151 0.479595,-5.6e-5 0.615172,0.02462 0.919879,0.167438 0.196558,0.09213 0.503358,0.303065 0.681778,0.46875 0.356762,0.3313 0.961606,1.202552 0.884488,1.274068 -0.06034,0.05596 -4.803531,1.825794 -11.547565,4.308769 -2.818156,1.037571 -5.194718,1.923618 -5.28125,1.968993 -0.258351,0.135475 -0.551928,0.481925 -0.654337,0.772183 -0.05284,0.149766 -0.139348,0.712162 -0.192238,1.249768 -0.114673,1.16559 -0.258918,1.736174 -0.609038,2.409148 -0.868299,1.668981 -2.323901,2.824971 -4.174078,3.31491 -0.982417,0.260151 -1.76936,0.321707 -2.766502,0.216404 z m 2.31565,-2.986251 c 0.546788,-0.187404 1.293075,-0.661732 1.720115,-1.093279 0.421353,-0.4258 0.813187,-1.174975 0.917545,-1.75432 0.277585,-1.541015 -0.384153,-3.295125 -1.586175,-4.204573 -0.684868,-0.518169 -1.296305,-0.716292 -2.195552,-0.711418 -0.769491,0.0042 -1.136758,0.08916 -1.83897,0.425566 -0.496584,0.237895 -0.675948,0.36744 -1.096033,0.791611 -0.571636,0.577196 -0.843207,1.04044 -1.036931,1.768796 -0.16887,0.63491 -0.181375,1.476003 -0.02956,1.988371 0.409076,1.380618 1.68839,2.534392 3.193774,2.880367 0.528197,0.121392 1.458451,0.07796 1.951787,-0.09112 z"
           id="path4023" inkscape:connector-curvature="0" transform="scale(0.26458333)" fill="${svgFillColor}"/>
        <path style="stroke-width:0.0625" d="m 31.669511,31.879361 c -0.05351,-0.0764 -0.09729,-0.240746 -0.09729,-0.365216 0,-0.302347 -0.205928,-0.885003 -0.443798,-1.255691 -0.536685,-0.836351 -1.606324,-1.427686 -2.582477,-1.427686 h -0.270121 l -0.04043,-0.304775 c -0.143494,-1.081711 -1.334795,-2.142558 -2.6137,-2.327484 l -0.481775,-0.06966 -0.328474,-0.592934 c -0.571058,-1.030828 -0.949476,-1.352187 -1.720916,-1.461436 -0.220277,-0.0312 -0.484504,-0.100157 -0.58717,-0.153248 -0.250475,-0.129525 -0.43061,-0.441643 -0.430955,-0.74671 -9.75e-4,-0.860026 -1.150437,-2.022637 -2.250184,-2.27592 -0.41087,-0.09463 -1.180158,-0.08183 -1.542082,0.02565 -0.449722,0.133554 -1.184608,0.640786 -1.568162,1.082377 -0.479342,0.551873 -0.527092,0.553597 -1.00093,0.03613 -0.981655,-1.072049 -1.676388,-2.453542 -1.992424,-3.96198 -0.134317,-0.641093 -0.151596,-2.211102 -0.03061,-2.78125 0.486053,-2.290535 1.635205,-4.034966 3.446708,-5.23216 1.301888,-0.8603969 2.65359,-1.2661981 4.1875,-1.25715 2.001814,0.011808 3.938879,0.7509267 5.34375,2.038994 l 0.3125,0.286518 -3.171875,3.175877 c -1.744531,1.746731 -3.171875,3.191527 -3.171875,3.210656 0,0.102958 2.028974,2.080316 2.36689,2.306676 1.255989,0.841352 2.574215,0.865022 3.806815,0.06836 0.420565,-0.271825 1.323915,-1.107689 2.576295,-2.383831 0.902021,-0.919136 1.210174,-1.128667 1.848412,-1.256844 0.329883,-0.06625 0.357206,-0.0609 0.795942,0.155939 0.249882,0.123498 0.664158,0.405988 0.920613,0.627755 0.256456,0.221767 1.850883,1.777063 3.543173,3.456213 2.154564,2.137837 3.105362,3.122656 3.171875,3.285369 0.362575,0.886989 -0.421346,1.980417 -1.42313,1.98501 -0.173426,7.94e-4 -0.397422,-0.04865 -0.532453,-0.11754 -0.128199,-0.0654 -1.465072,-1.335812 -2.970829,-2.823134 l -2.73774,-2.704222 -0.569378,0.569378 -0.569378,0.569378 1.933322,1.974951 c 2.305447,2.35509 3.374175,3.49732 3.508402,3.74969 0.121878,0.229154 0.132414,0.732057 0.02218,1.058863 -0.156481,0.463927 -0.724672,0.954354 -1.232649,1.063946 -0.590677,0.127435 -0.718908,0.02342 -4.054657,-3.28894 l -2.377542,-2.360872 -0.582282,0.584714 -0.582283,0.584714 2.116074,2.149735 c 1.163842,1.182355 2.379628,2.455851 2.701749,2.82999 l 0.585674,0.680255 -0.03497,0.295269 c -0.04845,0.409046 -0.272074,0.855099 -0.586367,1.169573 -0.296993,0.297165 -0.465081,0.332142 -0.608966,0.126718 z"
           id="path4025" inkscape:connector-curvature="0" transform="scale(0.26458333)" fill="${svgFillColor}"/>
        <path style="stroke-width:0.0625" d="m 37.228467,19.076135 c -2.983498,-2.986706 -3.991418,-3.939526 -4.375,-4.13583 -0.878878,-0.449781 -2.24836,-0.39388 -3.15625,0.128834 -0.154688,0.08906 -0.914063,0.783685 -1.6875,1.543609 -1.574274,1.54677 -2.25209,2.117605 -2.637789,2.221463 -0.582032,0.156725 -1.267171,-0.126408 -2.030171,-0.838967 l -0.466518,-0.435675 2.520364,-2.524479 c 2.584257,-2.588477 4.570176,-4.48874 5.133571,-4.912154 0.370988,-0.2788129 1.274168,-0.7264155 1.855543,-0.9195794 1.554432,-0.5164665 3.508079,-0.5122697 5.082652,0.010918 2.238258,0.7437127 4.084715,2.6151204 4.81844,4.8835524 0.727154,2.248114 0.417425,4.849069 -0.801572,6.731206 -0.411305,0.635056 -0.9783,1.314381 -1.09636,1.313565 -0.0533,-3.75e-4 -1.475035,-1.380277 -3.15941,-3.066463 z"
           id="path4027" inkscape:connector-curvature="0" transform="scale(0.26458333)" fill="${svgFillColor}"/></g>
      <g inkscape:groupmode="layer" id="layer6" inkscape:label="heart svg 2" fill="${svgFillColor}">
        <circle id="path4030" cx="5.0403123" cy="10.699088" r="0.79374999" style="stroke-width:0.44561401" /> </g>
      <g inkscape:groupmode="layer" id="layer5" inkscape:label="heart svg 1" style="display:inline" fill="${svgFillColor}">
        <path style="display:inline;fill:${svgFillColor};stroke-width:0.01657334" d="M 6.8540761,9.3351973 C 6.4115763,9.116221 6.7704257,8.6814095 7.0397518,8.4956532 7.2569334,8.2919498 7.5347441,7.8434092 7.8567318,8.1537679 8.175324,8.4607371 7.7403747,8.7664805 7.5364412,8.9840979 7.3411628,9.1509404 7.1554873,9.4709216 6.8540761,9.3351973 Z M 6.0045082,8.6479132 C 5.5151884,8.4198725 5.9345933,7.9829747 6.1962056,7.7693767 6.3900421,7.57298 6.6164647,7.2073521 6.9326087,7.4221235 7.3091677,7.7295547 6.8671915,8.0886766 6.6323298,8.3115107 6.4488268,8.4625101 6.2832528,8.7559639 6.0045082,8.6479132 Z M 8.3539627,8.4083455 C 8.3538728,7.9615643 7.9193709,7.5927873 7.4798469,7.6424891 7.4542679,7.2264655 7.0555991,6.9197915 6.651961,6.9296057 6.5399497,6.7551673 6.444941,6.4333147 6.1638844,6.3823644 5.9374841,6.3722735 5.8155763,6.3123343 5.8297426,6.0688906 5.6763396,5.5745796 4.9871718,5.3161871 4.5857989,5.6879031 4.4633295,5.7246922 4.3432814,6.0230572 4.2324422,5.9274163 3.676127,5.3806628 3.4321078,4.5290211 3.6845021,3.7814487 3.9401297,2.8852657 4.8591289,2.2374232 5.7915449,2.3259184 6.3008794,2.361304 6.7968833,2.5820171 7.1523958,2.9504972 6.5889057,3.5148816 6.0254122,4.0792627 5.4619154,4.6436404 5.7844891,4.9292181 6.0438755,5.3562812 6.5073266,5.405231 6.8998559,5.4677786 7.2160548,5.1929589 7.4626016,4.9256224 7.7527883,4.709134 7.9600422,4.2599596 8.3688438,4.2870258 8.715467,4.3947979 8.9295016,4.7363048 9.2013315,4.9640279 9.6270375,5.3848094 10.062291,5.7967649 10.471761,6.2334323 10.71001,6.5835065 10.166672,7.0469576 9.8806475,6.7234607 9.3993095,6.270872 8.9396011,5.7959844 8.4702467,5.3310908 8.3715242,5.4293628 8.2727984,5.5276316 8.1740693,5.625897 8.6475603,6.1162454 9.142591,6.5883906 9.5945935,7.0975089 9.7803305,7.4079607 9.4244825,7.8326078 9.0867957,7.6835789 8.5600242,7.2229213 8.0835973,6.7063477 7.5828814,6.2171341 7.4845142,6.315969 7.3861437,6.4148006 7.2877698,6.5136289 7.7425295,6.9893517 8.2287679,7.4372497 8.6537778,7.9397178 8.8496685,8.0912949 8.4548814,8.6755307 8.3539627,8.4083455 Z M 5.0925393,7.9318584 C 4.6670079,7.7006891 5.0657614,7.3142577 5.3007836,7.1194399 5.4539111,6.9654777 5.6070883,6.811565 5.7602358,6.6576227 6.0997347,6.5691272 6.3816951,7.0130501 6.1081853,7.2577789 5.8544195,7.4966333 5.6501093,7.8299045 5.3245104,7.9685599 5.2459639,7.9815722 5.1630638,7.9680628 5.0925393,7.9318584 Z M 4.3289214,7.1583263 C 3.8767877,6.8581968 4.3636428,6.4308544 4.6234404,6.1965133 4.8053894,5.791081 5.5174769,5.7717439 5.4368651,6.3164688 5.277821,6.623158 4.9688271,6.8324655 4.7338209,7.0834837 4.63569,7.205235 4.4648664,7.2213312 4.3289214,7.1583263 Z M 9.7792695,4.9816089 C 9.4289695,4.6482156 9.1082753,4.2770911 8.7267486,3.9799931 8.3717499,3.7801612 7.8920586,3.8686389 7.6357809,4.1868357 7.348584,4.4399341 7.108207,4.7496659 6.7901885,4.9652766 6.4843227,5.1008344 6.2382789,4.8436005 6.0419825,4.6449324 6.707185,3.993353 7.3435209,3.3101605 8.0392013,2.6913313 8.8286357,2.1324636 10.003347,2.2055638 10.685548,2.9036683 11.473558,3.649464 11.511866,5.0179975 10.761054,5.803066 10.674687,5.9783983 10.581274,5.7572508 10.490689,5.6952382 10.253549,5.4573617 10.01641,5.2194853 9.7792695,4.9816089 Z"
           id="path3767" inkscape:connector-curvature="0" /></g></svg>`;
    $("#topNav").append(logoLink);

    // Search box input
    const searchInput = document.createElement("form");
    searchInput.className += "form-inline mr-auto";
    // searchInput.setAttribute("action", "/action_page.php");
    const searchTextbox = document.createElement("input");
    searchTextbox.className += "form-control mr-sm-2";
    searchTextbox.setAttribute("type", "text");
    searchTextbox.setAttribute("placeholder", "Search");

    searchTextbox.setAttribute("id", "searchInput");
    $("#topNav").after(`<div class="modal" id="searchrResultModal" tabindex="-1" role="dialog" data-focus=false>
        <div class="modal-dialog" role="document">
            <div class="modal-content"><div class="modal-body p-1 pl-3 pr-3">
                ${getSearchResult()}
            </div></div>
        </div></div>`);
    $("body").on('click', function(){
        $('#searchrResultModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    })
    $("#topNav").on('keypress', '#searchInput',function(){
        console.log("pressed")
        $('#searchrResultModal').modal('show');
    });

    // const searchBtn = document.createElement("button");
    // searchBtn.className += "btn btn-light d-md-none";
    // searchBtn.setAttribute("type", "submit");
    // searchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        // <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            // fill="#6c757d"/>
    // </svg>`;
    searchInput.appendChild(searchTextbox);
    // searchInput.appendChild(searchBtn);
    $("#topNav").append(searchInput);

    // The rest of the buttons
    const navBtnUl = document.createElement("ul");
    navBtnUl.className += "navbar-nav";

    /// Post button
    const postBtn = document.createElement("li");
    postBtn.className += "nav-item ml-2";
    const postBtnLink = document.createElement("button");
    postBtnLink.className += "btn btn-success nav-link";
    postBtnLink.setAttribute("type", "button");
    postBtnLink.setAttribute("data-toggle","modal");
    postBtnLink.setAttribute("data-target", "#modal");
    postBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"fill="white" /><path d="M0 0h24v24H0z" fill="none" /></svg>`;
    const postBtnSpan = document.createElement("span")
    postBtnSpan.className += "d-none d-md-block";
    postBtnSpan.innerText = "Post a new ";
    postBtn.id="myModal";
    if (user.isBuyer) {
        // Buyer posts request
        postBtnSpan.innerText += "request";
    } else {
        // Seller posts offer
        postBtnSpan.innerText += "offer";
    }
    postBtnLink.appendChild(postBtnSpan)
    postBtn.appendChild(postBtnLink);

    /// Profile button
    const profileBtn = document.createElement("li");
    profileBtn.className += "nav-item ml-2";
    const profileBtnLink = document.createElement("a");
    profileBtnLink.className += "btn nav-link btn-info";
    profileBtnLink.setAttribute("href", "profile_seller.html");
    profileBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    const profileBtnSpan = document.createElement("span")
    profileBtnSpan.className += "d-none d-md-block";
    profileBtnSpan.innerText = "Profile";
    profileBtnLink.appendChild(profileBtnSpan);
    profileBtn.appendChild(profileBtnLink);

    /// Message button
    let unreadNum = 0;
    user.messages.forEach(msg => {if (!msg.isRead && currentUser.name != msg.from) {unreadNum++}})

    const msgBtn = document.createElement("li");
    msgBtn.className += "nav-item ml-2";
    const msgBtnLink = document.createElement("a");
    msgBtnLink.className += "btn nav-link btn-info";
    msgBtnLink.setAttribute("href", "messages_buyer.html");
    msgBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>`;
    const msgBtnSpan = document.createElement("span")
    msgBtnSpan.className += "d-none d-md-block";
    msgBtnSpan.innerText = "Messages ";
    msgBtnSpan.innerHTML += `<span class="msgButtonNav badge badge-danger">${unreadNum}</span>`;
    msgBtnLink.appendChild(msgBtnSpan);
    msgBtn.appendChild(msgBtnLink);

    /// Logout button
    const logoutBtn = document.createElement("li");
    logoutBtn.className += "nav-item ml-2";
    const logoutBtnLink = document.createElement("a");
    logoutBtnLink.className += "btn nav-link btn-light";
    logoutBtnLink.setAttribute("href", "index.html");
    logoutBtnLink.innerHTML = `<svg class="d-md-none d-sm-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`;
    const logoutBtnSpan = document.createElement("span")
    logoutBtnSpan.className += "d-none d-md-block";
    logoutBtnSpan.innerText = `Log Out ${user.name}`;
    logoutBtnLink.appendChild(logoutBtnSpan);
    logoutBtn.appendChild(logoutBtnLink);

    navBtnUl.append(postBtn);
    navBtnUl.append(profileBtn);
    navBtnUl.append(msgBtn);
    navBtnUl.append(logoutBtn)
    $("#topNav").append(navBtnUl);
}

function main() {
    addNavContent(getUser());
}
$(document).ready(main);