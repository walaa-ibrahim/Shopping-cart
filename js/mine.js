//get product Data from localStorage
var products = JSON.parse(localStorage.getItem("products")) || productsDb;
//store data in localStoragelet usersData;
let usersData
if (localStorage.getItem("dataItem") == null) {
    usersData = []
} else {
    usersData = JSON.parse(localStorage.getItem("dataItem"));
}//End local storage of users
//Register page 
if (window.location.pathname.includes('register')) {
    //for register of users and store data in local storage
    registerBtn.addEventListener("click", function (e) {
        e.preventDefault();
        //check the value of fields
        if (userName.value == '' || userMail.value == '' || userPassword.value == '') {
            alert('Please Fill All Data')
        } else {
            storeUserData()
             setTimeout(() => {
                window.location = 'login.html'
            }, (500))
        }
    });
}//End Register page 
//Store users data in localStorage
function storeUserData() {
    var userId = Math.floor(Math.random() * 11)
    if (userImageUrl) {
        userImageUrl
        
    }else{
        userImageUrl="img/avatar.png"
    }
    let userData = { id: userId, name: userName.value, email: userMail.value, password: userPassword.value, userImageUrl };
    usersData.push(userData); //push data of users in array of local storage
    //console.log(usersData);
    localStorage.setItem("dataItem", JSON.stringify(usersData));
}//End function of store users data in localStorage

//login Page 
if (window.location.pathname.includes('login')) {
    loginBtn.addEventListener("click", loginUser)
}//End login Page 
//Function of login
var userNameInfo;
function loginUser(e) {
    e.preventDefault();
    //get data from local storage
    usersData = JSON.parse(localStorage.getItem("dataItem"));
    if (usersData) {
        usersData.map((userInfo) => {
            if (userInfo.name === userName.value && userInfo.password === userPassword.value) {
                localStorage.setItem('user', JSON.stringify(userInfo));
                setTimeout(() => {
                    window.location = '../index.html';
                }, 400)
            }
        })

    } else {
        console.log('You Not Register')
    }
}//End Function of login

//check for userName
function checkUserName() {
    //get userName from local storage
    userNameInfo = JSON.parse(localStorage.getItem('user'));
    if (userNameInfo) {
        //console.log(userNameInfo.name)
        for (let i = 0; i < userLogin.length; i++) {
            userLogin[i].style.display = "none";

        }
        userProfile.innerHTML = `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        ${userNameInfo.userImageUrl.includes('data') ? `<img src="${userNameInfo.userImageUrl}" class="profile-img"/>`:`<img ${window.location.pathname.includes('index')?`src="`+userNameInfo.userImageUrl+`"` :`src="../`+userNameInfo.userImageUrl+`"`} class="profile-img"/>`}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><p class="dropdown-item profil-name">${userNameInfo.userImageUrl.includes('data') ? `<img src="${userNameInfo.userImageUrl}" class="profile-img"/>`:`<img ${window.location.pathname.includes('index')?`src="`+userNameInfo.userImageUrl+`"` :`src="../`+userNameInfo.userImageUrl+`"`} class="profile-img"/>`}
        <span class="mx-2">${userNameInfo.name}</span></p></li>
        <li><a class="dropdown-item" href=""  onClick="profilePathUrl(event)">My Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="" onClick="signOut(event)">sign out</a></li>
        </ul>`;
    }
}
function profilePathUrl(e){
    e.preventDefault()
    if(window.location.pathname.includes('index')) {
        window.location='views/profile.html'
    }else{
        window.location='profile.html'
    }
}
//sign out function
function signOut(e) {
    e.preventDefault();
    for (let i = 0; i < userLogin.length; i++) {
        userLogin[i].style.display = "block";

    }
    userNameInfo = '';
    localStorage.setItem('user', JSON.stringify(userNameInfo));
    userProfile.innerHTML = '';
    choosenProduct.innerHTML += '';
    badgeNum.style.display = 'none';
    badgeNum.innerHTML = '';
    if (navCartProducts.style.display === 'block') {
        navCartProducts.style.display = 'none';
    }
    if (window.location.pathname.includes('index')){
        window.location = 'index.html';
    }else{
        window.location = '../index.html';
    }
    
}
//Profile Page

if (window.location.pathname.includes('profile')) {
    checkUserName();
    createProductIcon.style.display='block';
    createProductIcon.addEventListener('click', function () {
        window.location = 'creatProduct.html';
    }); 
    //get userName from local storage
    userNameInfo = JSON.parse(localStorage.getItem('user'));
    //check if there is userName
    function profileUi(){
        profileContainer.innerHTML = `
        <div class="user-profile">
            <div class="up-background"></div>
            <div class="mb-3">
                <label for="userImageUpload" class="form-label">${userNameInfo.userImageUrl.includes('data') ? `<img src=${userNameInfo.userImageUrl} class="user-img"/>`:`<img ${window.location.pathname.includes('index')?`src="`+userNameInfo.userImageUrl+`"` :`src="../`+userNameInfo.userImageUrl+`"`} class="user-img"/>`}
                </label>
                <input class="form-control" type="file" id="userImageUpload" style="display:none; visibility:none">
            </div>
            </div> 
        <div class="user-inform text-center">
            <h5>${userNameInfo.name}</h5>
            <a href="myproduct.html">my product</a>
            <a href="favourite.html">my Favourite product</a>
            <a href="productcart.html">product add to cart</a>
        </div>
        <div><button type="submit" class="btn btn-edit mb-3" onClick="editUserInfo(${userNameInfo.id})">Edit profile</button></div>
        <div><button type="submit" class="btn btn-edit mb-4" onClick="signOut(event)">Sign Out</button></div>`;
    }
    profileUi()
        let userImageUpload=document.getElementById('userImageUpload')
        userImageUpload.addEventListener('change',uploadImage)
}
//edit
function editUserInfo(id) {
    localStorage.setItem('editUserId', id);
        window.location = "update-user.html";
}
if (window.location.pathname.includes('update-user')) {
    checkUserName();
    userNameInfo = JSON.parse(localStorage.getItem('user'));
    userNameUpdate.value = userNameInfo.name;
    userEmailUpdate.value = userNameInfo.email;
    userPasswordUpdate.value = userNameInfo.password;
    
    usersData = JSON.parse(localStorage.getItem("dataItem"));
    function updateUserInfo(e) {
        e.preventDefault();
        let userId = localStorage.getItem("editUserId");
        //console.log(userId);
        userNameInfo.name = userNameUpdate.value;
        userNameInfo.email = userEmailUpdate.value;
        userNameInfo.password = userPasswordUpdate.value;
        localStorage.setItem('user', JSON.stringify(userNameInfo));
        //get user id from dateItem
        usersData= usersData.map((item) =>{
            if ( item.id==userId) {
                item.name= userNameInfo.name;
                item.email= userNameInfo.email;
                item.password= userNameInfo.password;
                console.log(item);
               return item
            }
            return item
        })
        
        localStorage.setItem('dataItem', JSON.stringify(usersData));
       usersData = JSON.parse(localStorage.getItem('dataItem'));
       //console.log(usersData);
       setTimeout(() => {
        window.location = 'profile.html';
    }, 400)
    }
    updateBtn.addEventListener('click', updateUserInfo)

}

//toggle function of cart icon
function toggleClick(e) {
    e.preventDefault();
    if (navCartProducts.style.display === 'none') {
        navCartProducts.style.display = 'block';
    } else {
        navCartProducts.style.display = 'none';
    }
    if (badgeNum.innerHTML == 0 && AddedProduct.length == 0) {
        navCartProducts.style.display = 'none';
    }
}
//index Page
if (window.location.pathname.includes('index')) {
    //check if there is userName
    checkUserName();
    //event on create product icon
    createProductIcon.style.display='block';
    createProductIcon.addEventListener('click', function () {
        if(userNameInfo){
            window.location = 'views/creatProduct.html';
        }else{
            alert('You must be logined to add products')
        }
    }); 
    
    //search function
    function search(title, products) {
        let term = products.filter((item) => item.name.toLowerCase().indexOf(title) !== -1);
        //console.log(term);
        productsUi(term)
    }//End search function
    //event occured when keyup
    searchProduct.addEventListener('keyup', function (e) {
        let searchWord = e.target.value.trim().toLowerCase();
        if (searchWord === '') {
            productsUi(products);                
        } else {
            search(searchWord, products)
        }
    });//End event  
    //filteration input event 
    filterProduct.addEventListener('change', filterProductName);
  //display products
  productsUi(products);  
}//End index page
//ui display function
function productsUi(products) {
    var temp = '';
    products.map((product) => {
        temp += `
        <div class="col-md-4 my-2">
            <div class="card">
                <div class="card-img">
                    <img src="${product.imgUrl}" class="card-img-top" alt="${product.name}">
                    <div class="overlay" onClick="productDetails(${product.id})"></div>
                    <div class="add-to-favourite">
                        <i class="far fa-heart" style="color: ${product.liked == true ? 'red' : ''}" onclick="favouriteProduct(${product.id})"></i>
                        ${product.isMe === true ? `<div class="edit-product my-2" onclick="edit(${product.id})"><i class="far fa-edit"></i></div>
                        <div class="my-2"><i class="fas fa-trash" onclick="deletProduct(${product.id})"></i>
                        </div>
                    ` : ''}
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-capitalize">${product.name}</h5>
                    <p class="card-text">${product.desc}</p>
                    <div class="product-action d-flex justify-content-between">
                        ${product.sale!=='' ? `<p><span>${product.sale}$ </span><span class="text-througLine text-red" mx-2">${product.price}$</span></p>`:`<p>${product.price}$</p>`}
                        <div class="add-to-cart"><i class="fas fa-shopping-cart" onclick="chooseProduct(${product.id})"></i></div>

                    </div>
                    
                </div>
            </div>
        </div>`
        
    });
    if (window.location.pathname.includes('index')) {
        productUi.innerHTML = temp;
    }else if (window.location.pathname.includes('myproduct')) {
        myProductContainer.innerHTML = temp;
    }
    
}
//Add choosen products to cart
let AddedProduct;
if (localStorage.getItem("cartProducts") === null) {
    AddedProduct = [];
} else {
    AddedProduct = JSON.parse(localStorage.getItem("cartProducts"));
}
if (AddedProduct.length !== 0) {
    AddedProduct.forEach((item) => {
        choosenProduct.innerHTML += `<p>${item.name} ${item.qty}</p>`;
    });
    badgeNum.style.display = 'block';
    badgeNum.innerHTML = AddedProduct.length;
    viewCart.style.display = 'block'
}
//Action of toggle click of cart button
//chooseproduct ui display
function chooseProduct(id) {
    if (userProfile.innerHTML !== '') {
        let productaddToCart = products.find((item) => item.id === id);
        let isProductInCart = AddedProduct.some((i) => i.id === productaddToCart.id);// some the same of find but it return true or false
        //check if product we choosen one or more 
        if (isProductInCart) {
            AddedProduct = AddedProduct.map((productItem) => {
                if (productItem.id === productaddToCart.id)
                    productItem.qty += 1;
                return productItem
            })
        } else {
            AddedProduct.push(productaddToCart);
        }//End 
        choosenProduct.innerHTML = ''
        AddedProduct.map((item) => {
            choosenProduct.innerHTML += `<p>${item.name} ${item.qty}</p>`;
        });
        //console.log(productaddToCart)
        //store choosen products in cart localstorage
        localStorage.setItem('cartProducts', JSON.stringify(AddedProduct));
        let cartItem = document.querySelectorAll('#choosenProduct p');
        badgeNum.style.display = 'block';
        badgeNum.innerHTML = cartItem.length;
        viewCart.style.display = 'block'
    } else {
        setTimeout(() => {
            window.location = 'views/login.html';
        }, 400)
    }
}
let AddToFavourite;
if (localStorage.getItem("favouriteProducts") === null) {
    AddToFavourite = [];
} else {
    AddToFavourite = JSON.parse(localStorage.getItem("favouriteProducts"));
};
//////favourite function
//favoutite items
function uniqueFavourite() {
    var uniqueProduct = AddToFavourite.map((item) => item.id) // find item id that i like it
        .map((item, i, a) => a.indexOf(item) === i && i) //item there that every item i liked or this out of first map---i:index of item...a:arraythat resuslt that we choose
        .filter((item) => AddToFavourite[item]) //filter unique array without false
        .map((item) => AddToFavourite[item]) //return object of item
        .filter((item)=>item.liked!==false); //remove item if become false
        //console.log(uniqueProduct);
        localStorage.setItem('favouriteProducts', JSON.stringify(uniqueProduct));
}
function favouriteProduct(id) {
    if (userProfile.innerHTML != '') {
        let likedProduct=products.find((item) => item.id === id);
        AddToFavourite.push(likedProduct);
        products.map((item) => {
            if (item.id === likedProduct.id) {
                if (item.liked == true) {
                    item.liked = false;
                } else {
                    item.liked = true;
                }
            }
        });
        uniqueFavourite();
        localStorage.setItem("products", JSON.stringify(products));  
        if(window.location.pathname.includes('index')){
            productsUi(products);
        }else if(window.location.pathname.includes('myproduct')){
            let isMeProducts = products.filter(item => item.isMe === true);
            //itemIsMeLiked=isMeProducts.find(item=>item.id==id);
           //AddToFavourite= AddToFavourite.filter(item=>item.liked ==itemIsMeLiked.liked);
           //uniqueFavourite(AddToFavourite);
          // console.log(AddToFavourite);
            productsUi(isMeProducts);
        }

    } else {
        setTimeout(() => {
            window.location = 'views/login.html';
        }, 400)
    }
};
//filtration by price
function filterProductName(e) {
    let filterValue = e.target.value;
    //console.log(filterValue)
    products = JSON.parse(localStorage.getItem("products"));
    if (filterValue === 'all') {
        productsUi(products)
    } else {
        products = products.filter(item => item.name == filterValue);
        productsUi(products)
    }
}//End filtration function
//cart page
if (window.location.pathname.includes('productcart')) {
    checkUserName();
    productAddUi(AddedProduct);
};

//Favourite page
if (window.location.pathname.includes('favourite')) {
    checkUserName();
    productAddUi(AddToFavourite);
    createProductIcon.style.display='block';
    createProductIcon.addEventListener('click', function () {
        window.location = 'creatProduct.html';
    }); 
}

//function of display products which added
function productAddUi(proAdd) {
    var tempCart = '';
        proAdd.map((itemCart) => {
            tempCart += `
            <div class="cart-products my-5">
                <div class="row p-2">
                    <div class="col-lg-3 col-md-4">
                        <img ${itemCart.isMe ? `src="`+itemCart.imgUrl+`"` : `src="../`+itemCart.imgUrl+`"`} onclick="productDetails(${itemCart.id})" alt="${itemCart.name}">
                    </div>
                    <div class="col-lg-9 col-md-8">
                        <div class="product-item">
                            <h4 onclick="productDetails(${itemCart.id})">${itemCart.name}</h4>
                            <p><span class="price">Price: </span>${itemCart.sale!=='' ? `<span class="text-red">${itemCart.sale}$</span><span class="text-througLine mx-2">${itemCart.price}$</span>`:`<span>${itemCart.price}$</span>`}
                            </p>
                            <p class="cart-text">${itemCart.desc}</p>
                            <p>${window.location.pathname.includes('productcart') ?`<span class="quantity">Quantity: </span><i class="fas fa-plus-square" onClick="plusProduct(${itemCart.id})"></i>
                            <span class="product-qty" id="productQty(${itemCart.id})">${itemCart.qty}</span> 
                            <i class="fas fa-minus-square" onClick="decreaseProduct(${itemCart.id})"></i>`
                            :`<span class="quantity">Quantity: <span class="product-qty">${itemCart.qty}</span>`}</p>
                            <button class="remove-item btn btn-edit" onclick="deletFromCart(${itemCart.id})"> Delete</button>
                        </div>
                    </div>
                </div>
            </div>`;
            
        })
        cartProductsUi.innerHTML = tempCart;
        if(proAdd.length!=0){
            cartProductsUi.innerHTML = tempCart;
        }else{
            emptyItem.innerHTML=`<p class="no-product">There is no products</p>`
        }
        
}//End function of display products which added
//increase product in cart 
function plusProduct(id){
    var quantityProduct=document.getElementById('productQty('+id+')');
    var productadd=AddedProduct.find(item=> item.id==id);
        //check if product we choosen one or more 
        quantityProduct.innerHTML = '';
    choosenProduct.innerHTML='';
    localStorage.setItem('cartProducts', JSON.stringify(AddedProduct));
    var increseProduct = productadd.qty +=1;
    quantityProduct.innerHTML += increseProduct;
    AddedProduct.map((item) => {
        choosenProduct.innerHTML += `<p>${item.name} ${item.qty}</p>`;
    });
}
//decrease ptoduct in cart
function decreaseProduct(id){
    var quantityProduct=document.getElementById('productQty('+id+')');
    var productadd=AddedProduct.find(item=> item.id==id);
        //check if product we choosen one or more 
    quantityProduct.innerHTML = '';
    choosenProduct.innerHTML='';
    localStorage.setItem('cartProducts', JSON.stringify(AddedProduct));
    var decreaseProduct = productadd.qty -=1;
    if(decreaseProduct>0){
        quantityProduct.innerHTML += decreaseProduct;
         AddedProduct.map((item) => {
        choosenProduct.innerHTML += `<p>${item.name} ${item.qty}</p>`;
    });
    }else{
        deletFromCart(id)
    }
   
}
//function of delete product from cart page
function deletFromCart(id) {
    if(window.location.pathname.includes('favourite')){
        AddToFavourite = JSON.parse(localStorage.getItem("favouriteProducts"));
        if (AddToFavourite.length !== 0) {
            let favouriteFiltered = AddToFavourite.filter((item) => item.id !== id);
            localStorage.setItem('favouriteProducts', JSON.stringify(favouriteFiltered));
            productAddUi(favouriteFiltered)

            AddToFavourite = JSON.parse(localStorage.getItem("favouriteProducts"));
            productAddUi(AddToFavourite)
        }
    }
    if(window.location.pathname.includes('productcart')){
        AddedProduct = JSON.parse(localStorage.getItem("cartProducts"));
        if (AddedProduct.length !== 0) {
            let productFiltered = AddedProduct.filter((item) => item.id !== id);
            productAddUi(productFiltered)
            badgeNum.style.display = 'block';
            badgeNum.innerHTML = productFiltered.length;
            localStorage.setItem('cartProducts', JSON.stringify(productFiltered));
            AddedProduct = JSON.parse(localStorage.getItem("cartProducts"));
            choosenProduct.innerHTML='';
            if (badgeNum.innerHTML !== 0 && AddedProduct.length !== 0) {
                AddedProduct.forEach((item) => {
                    choosenProduct.innerHTML += `<p>${item.name} ${item.qty}</p>`;
                });

            } else {
                navCartProducts.style.display = 'none';
            }
        }
    }
    
}//End function of delete product from cart page

// function to add id of product which user choosen and add in localStorage
function productDetails(id) {
    //console.log(id)
    localStorage.setItem('productId', id);
    if (window.location.pathname.includes('index')) {
        window.location = "views/productDetails.html"
    }else{
        window.location = "productDetails.html"
    }
   
}
//productDetails page
if (window.location.pathname.includes('productDetails')) {
    checkUserName();
    //get data from cartProducts
   var productsItem = JSON.parse(localStorage.getItem("products"));
    //get product id from productId
    let productId = localStorage.getItem("productId");
    let productDetailsItem = productsItem.find((item) => item.id == productId);
    productContainer.innerHTML = ` 
        <div class="product-img">
            <img ${productDetailsItem.isMe ? `src="`+productDetailsItem.imgUrl+`"` : `src="../`+productDetailsItem.imgUrl+`"`} alt="${productDetailsItem.name}/>
        </div>
        <div class="product-details">
            <div class="container">
                <h2 class="mt-3">${productDetailsItem.name}</h2>
                <p><span class="price">Price: </span>${productDetailsItem.sale!=='' ? `<span class="text-red">${productDetailsItem.sale}$</span><span class="text-througLine mx-2">${productDetailsItem.price}$</span>`:`<span>${productDetailsItem.price}$</span>`}
                <p class="card-text">${productDetailsItem.desc}</p>
            </div>
       </div>`;
}
//////create product
function createProducts(e) {
    e.preventDefault();
    if (productName.value !== '' && productImageUrl !== '' && productDesc.value !== '' && productPrice.value !== '') {
        if (productSale.value!=='') {
            var productObj = { id: products.length + 1, name: productName.value, imgUrl: productImageUrl, desc: productDesc.value, price: productPrice.value,sale:productSale.value, qty: 1, isMe: true }
        }else{
            productObj = { id: products.length + 1, name: productName.value, imgUrl: productImageUrl, desc: productDesc.value, price: productPrice.value,sale:'', qty: 1, isMe: true }
        }
        
        products.push(productObj);
        //console.log(productObj);
        localStorage.setItem('products', JSON.stringify(products));
        //console.log(inputs.length);
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].value = ''

        }
    } else {
        alert('Error')
    }
}
//edit
function edit(id) {
   if (userProfile.innerHTML != '') {
    localStorage.setItem('editId', id);
    if (window.location.pathname.includes('index')) {
        window.location = "views/updateproduct.html";
    } else {
        window.location = "updateproduct.html";
    }
   }else{
       alert('You Need To Login')
   }
}

if (window.location.pathname.includes('updateproduct')) {
    checkUserName();
    let productId = JSON.parse(localStorage.getItem('editId'));
    let getEditProduct = products.find((item) => item.id === productId);
    nameEdit.value = getEditProduct.name;
    priceEdit.value = getEditProduct.price;
    saleEdit.value = getEditProduct.sale;
    productImageUrl = getEditProduct.imgUrl;
    descEdit.value = getEditProduct.desc;
    function updateValue(e) {
        e.preventDefault();
        getEditProduct.name = nameEdit.value;
        getEditProduct.price = priceEdit.value;
        if (saleEdit.value!='') {
            getEditProduct.sale  = saleEdit.value;
        }else{
            console.log(getEditProduct.sale);
            getEditProduct.sale =''
        }
        getEditProduct.imgUrl = productImageUrl;
        getEditProduct.desc = descEdit.value;
        localStorage.setItem('products', JSON.stringify(products));
        setTimeout(() => {
            window.location = '../index.html';
        }, 400)
       
    }
    imgEdit.addEventListener('change', uploadImage)
    updateProduct.addEventListener('click', updateValue)

}

if (window.location.pathname.includes('creatProduct')) {
    checkUserName();
    addProduct.addEventListener('click', createProducts);
    productImgFile.addEventListener('change', uploadImage)
}
function uploadImage() {
    let file = this.files[0];//get information of images(type-name-size)
    //console.log(file);
    let fileTypes = ["image/jpg", "image/jpeg", "image/png"] //type of images that i needed
    if (fileTypes.indexOf(file.type) == -1) {
        alert('file not supported');
        return
    }
    if (file.size > 2 * 1024 * 1024) {
        alert('Image Not exced 2MG');
        return
    }
    // productImageUrl=URL.createObjectURL(file);
    //convert image to blob display image in string of path of image
    //butimage using URL.createObjectURL() not display when we refresh so we use base64
    //console.log(productImageUrl)
    getImageBase64(file)
}
function getImageBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file); //read my file and convert base 64
    if(window.location.pathname.includes('profile.html'))
   {
    userNameInfo = JSON.parse(localStorage.getItem('user'));
    let usertId = localStorage.getItem("editUserId");
    usersData = JSON.parse(localStorage.getItem("dataItem"));
    reader.onload = function () {
        userImageUrl = reader.result;
        userNameInfo.userImageUrl=userImageUrl;
        localStorage.setItem('user', JSON.stringify(userNameInfo));
         profileUi()
       
       //check for userName
    
    checkUserName()
        let userItemImg= usersData.map((item) => {
            if (item.id == usertId) {
                item.userImageUrl=userImageUrl;
            }
            return item
        });
        localStorage.setItem('dataItem', JSON.stringify(userItemImg));

        }
        reader.onerror = function () {
            alert('Error !!')
        }     
   }else{
    reader.onload = function () {
        productImageUrl = reader.result;
    }
    reader.onerror = function () {
        alert('Error !!')
    }
}
}
//myProduct page
function deletProduct(id) {
    if (userProfile.innerHTML != '') {

    let isMeProducts = products.filter(item => item.isMe === true);
    let myProductFiltered = isMeProducts.filter((item) => item.id !== id);
    products = products.filter(product => product.id !== isMeProducts.id);
    //console.log(products)
    let productDeleted = isMeProducts.find(item => item.id === id);
    isMeProducts = isMeProducts.filter(deletProd => deletProd.id !== id);
    //console.log(isMeProducts)
    products = products.filter(product => product.id !== productDeleted.id)   
    localStorage.setItem('products', JSON.stringify(products));
    //delete product from cart if is in cart 
    AddedProduct = JSON.parse(localStorage.getItem("cartProducts"));
    let productDeleteFromCart = AddedProduct.filter(item => item.id !== id);
    choosenProduct.innerHTML=''
    localStorage.setItem('cartProducts', JSON.stringify(productDeleteFromCart));
    AddedProduct = JSON.parse(localStorage.getItem("cartProducts"));
    badgeNum.style.display = 'block';
    badgeNum.innerHTML = productDeleteFromCart.length;
    if (badgeNum.innerHTML !== 0 && AddedProduct.length !== 0) {
        AddedProduct.map((item) => {
            choosenProduct.innerHTML += `<p>${item.name} ${item.qty}</p>`;
        });

    } else {
        navCartProducts.style.display = 'none';
    }
    if (window.location.pathname.includes('index')) {
        productsUi(products);
    } else {
        productsUi(myProductFiltered);
        if (isMeProducts.length=== 0) {
            emptyProduct.innerHTML = `<p class="no-product">No Products</p>`
        }
    }}else{
        alert('You Need A Permission To Delete This Item')
    }
}

if (window.location.pathname.includes('myproduct')) {
    checkUserName();
    if (userProfile.innerHTML != '') {
        createProductIcon.style.display='block';
        createProductIcon.addEventListener('click', function () {
            window.location = 'creatProduct.html';
        }); 
        
        let isMeProducts = products.filter(item => item.isMe === true);
        //console.log(isMeProducts)
        if (isMeProducts.length!== 0) {
            productsUi(isMeProducts)

        } else {
            emptyProduct.innerHTML = `<p class="no-product">No Products</p>`
        }
    }else{
        emptyProduct.innerHTML = `<p class="no-product">You Need to Login</p>`;
        createProductIcon.style.display='none';
        setTimeout(() => {
            window.location = 'login.html';
        }, 1000)
    }
}

