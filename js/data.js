//Products 
var productsDb= [
    {
        id: 1,
        imgUrl: 'img/2.jpg',
        name: 'fossil',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        price: 940,
        sale:'',
        qty:1,
        isMe:false
    },
    {
        id: 2,
        imgUrl: 'img/5.jpg',
        name: 'chanel',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        price: 650,
        sale:599,
        qty:1,
        isMe:false
    },
    {
        id: 3,
        imgUrl: 'img/18.jpg',
        name: 'dior',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        price: 700,
        sale:'',
        qty:1,
        isMe:false
    },
    {
        id: 4,
        imgUrl: 'img/12.jpg',
        name: 'dior',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        price:600,
        sale:420,
        qty:1,
        isMe:false

    },
    {
        id: 5,
        imgUrl: 'img/9.jpg',
        name: 'guess',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        price: 550,
        sale:'',
        qty:1,
        isMe:false

            
    },
    {
        id: 6,
        imgUrl: 'img/26.jpg',
        name: 'lacost',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        price: 700,
        sale:640,
        qty:1,
        isMe:false


    }
];
if (localStorage.getItem("products") == null) {
    localStorage.setItem('products', JSON.stringify(productsDb));

} else {
   var products = JSON.parse(localStorage.getItem("products"));
}
