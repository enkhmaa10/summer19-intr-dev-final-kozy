const allProducts = [
    {shop: "Office Desk", photo: "desk.jpg",  rooms: "Office" , style: "Art-Deco", colour: "White", isInStock: true, price: 500},
    {shop: "Assorted Lamp", photo: "assorted-lamp.jpg", rooms: "All" , style: "Modern", colour: "Black", isInStock: false, price: 2000},
    {shop: "Vintage Vase Set", photo: "vase-sets.jpg", rooms: "All" , style: "Organic", colour: "Grey", isInStock: true, price: 1000},
    {shop: "Violet Coach", photo: "voilet-coach.svg", rooms: "Living Room" , style: "Eco", colour: "Blue", isInStock: true, price: 2550},
    {shop: "Grey Chair", photo: "grey-chair.svg", rooms: "Living Room" , style: "Vintage", colour: "Purple", isInStock: false, price: 550},
    {shop: "Love Seat", photo: "peach-coach.svg", rooms: "Living Room" , style: "Organic", colour: "Peach", isInStock: true, price: 800},
    {shop: "Patio Set", photo: "patio-table .jpg", rooms: "Patio" , style: "Vintage", colour: "Cyan Blue", isInStock: false, price: 1540},
    {shop: "Flower Vase", photo: "vase.jpg", rooms: "All" , style: "Organic", colour: "White", isInStock: true, price: 60},
    {shop: "Whisker Chair", photo: "whisk-chair.jpg", rooms: "Living Room" , style: "Organic", colour: "Brown", isInStock: false, price: 900},
    {shop: "Desk Lamp", photo: "pink-lamp.jpg", rooms: "Living Room" , style: "Art-Deco", colour: "Pink", isInStock: true, price: 150},
    {shop: "Snake Lamp", photo: "metal-lamp.jpg",  rooms: "Bedroom" , style: "Modern", colour: "Metal", isInStock: true, price: 250},
    {shop: "Curtain", photo: "curtain.jpg", rooms: "All" , style: "Modern", colour: "White and Blue", isInStock: false, price: 480},
    {shop: "Persian Rug", photo: "rug.jpg", rooms: "Living Room" , style: "Vintage", colour: "Red", isInStock: true, price: 3897},
    {shop: "Boat Coach", photo: "big-cushion-coach.jpg", rooms: "Bedroom" , style: "Modern", colour: "Grey", isInStock: false, price: 5689},
    {shop: "Pillow", photo: "pillow.jpg", rooms: "All" , style: "Comptemprary", colour: "Peach", isInStock: true, price: 50},
]

/*****************************************************************
        Product Format 
****************************************************************/ 
const formatProduct = (product) => {

    let outOfStock =``; 
    if (product.isInStock == false) {
        outOfStock = ` <div class=no-price>$${product.price}</div>
        <span class="not-available">Out of Stock</span>`;
    }
    else {
        outOfStock = `<div class="price">$${product.price}</div>`;
    }   
    
    return `
    <li class="product-pic">
        <div class = "product"><a href="product-page.html"><img src="img/${product.photo}"></a></div>
        <div class="product-des"><a href="product-page.html">${product.shop}</a></div>
        <div class="price"> Room: ${product.rooms}</div>
        <div class="price"> Style: ${product.style}</div>
        <div class="price"> Colour: ${product.colour}</div>
        <div class="price">${outOfStock}</div>
    </li>`; 
}

/*****************************************************************
        Product Format 
****************************************************************/

const getProductstoHTML =(ary, start, qty=5) => {
    document.getElementById(`productA`).innerHTML = ary.map(formatProduct)
    .slice (start, start+qty)
    .join(``);
}

/*****************************************************************
        DATA Storage 
****************************************************************/

// const $productAList = document.getElementById(`productA`); 
const $bntProducts = document.getElementById(`viewProduct`); 
const $btnPrice = document.getElementById(`btnPrice`)
const $btnStyle = document.getElementById(`btnStyle`)
const $btnRooms = document.getElementById(`btnRooms`)
const $btnColour = document.getElementById(`btnColour`)
const $btnStock = document.getElementById(`btnStock`)
const roomRangeRadio = document.getElementById(`roomRange`)

/*****************************************************************
        allProducts
****************************************************************/

const showAllProducts =(ary) => {
    $bntProducts.style.visibility =  `hidden`;
    document.getElementById(`productA`).innerHTML = ary.map(formatProduct).join(``);
}

/**************************************************************
            First Page Load 
****************************************************************/
const fistFourProducts =() => {

    getProductstoHTML(allProducts, nextIndex, nextQty);  
    
    nextIndex += nextQty;
    }
    
let nextIndex = 0;
let nextQty = 5;
    
window.addEventListener(`load`, fistFourProducts(0));


/**************************************************************
    Next Page Formats 
****************************************************************/

const nextProducts = () => {
    
    getProductstoHTML(allProducts, nextIndex, nextQty);
    nextIndex += nextQty;

    if (nextIndex >= allProducts.length)
        $bntProducts.style.visibility =  `hidden`;
    else if (allProducts.length >= nextIndex + nextQty)
        $bntProducts.innerHTML = `Show next ${nextQty} products`;
    else if (allProducts.length < nextIndex + nextQty)
        $bntProducts.innerHTML = `Show next ${allProducts.length - nextIndex} products`;
}


$bntProducts.addEventListener(`click`, nextProducts); 


// const filterProducts = () => {
    
//     let nextIndex = 0;
//     let nextQty = 5;
    
    
//     const nextFilteredProduct = getProductstoHTML(allProducts, nextIndex, nextQty);
//     nextIndex += nextQty;

//     if (nextIndex >= allProducts.length)
//         $bntProducts.style.visibility =  `hidden`;
//     else if (allProducts.length >= nextIndex + nextQty)
//         $bntProducts.innerHTML = `Show next ${nextQty} products`;
//     else if (allProducts.length < nextIndex + nextQty)
//         $bntProducts.innerHTML = `Show next ${allProducts.length - nextIndex} products`;

// $bntProducts.addEventListener(`click`, nextFilteredProduct); 

// }
/**************************************************************
                Search by Name Button
****************************************************************/

const showMatchingProds = (query) => {
    showAllProducts( allProducts.filter( prod => prod.shop.toLowerCase().includes( query.toLowerCase() ) ) );

    $bntProducts.style.visibility =  `hidden`;

    // document.getElementById(`title`).innerHTML = `<h1 class="title"> We found ${newList.length} results </h1>`;
  }

    document.getElementById(`search`).addEventListener(`submit`, (event) => {
    event.preventDefault();
    let q = document.getElementById(`search`).query.value;
     
 
    
    showMatchingProds(q);

   
});

/**************************************************************
                Sort By Price 
****************************************************************/

const sortByPrice = (event) => {
    const priceRange = allProducts.sort((a,b)=> b.price - a.price);
    document.getElementById(`title`).innerHTML = `<h1 class="title">Sorted by Price: High to Low</h1>`;
    showAllProducts(priceRange );
}

$btnPrice.addEventListener(`click`, sortByPrice); 

  /**************************************************************
                Sort By Style 
****************************************************************/

const sortByStyle = (event) => {
    const styleSort = allProducts.sort((a,b)=> {
    const styleA = a.style.toUpperCase(); 
    const styleB= b.style.toUpperCase();
    if (styleA < styleB) {
        return - 1; 
    }
    if (styleA > styleB) {
        return 1;
    }

    return 0;
    });
    
    document.getElementById(`title`).innerHTML = `<h1 class="title">Sorted by Style</h1>`;
    showAllProducts( styleSort );
    roomRangeRadio.style.visibility = `hidden`; 


}


/**************************************************************
                Sort By Rooms
****************************************************************/

$btnStyle.addEventListener(`click`, sortByStyle); 

const sortByRoom = (event) => {
    const roomSort = allProducts.sort((a,b)=> {
    const roomA = a.rooms.toUpperCase(); 
    const roomB= b.rooms.toUpperCase();
    if (roomA < roomB) {
        return - 1; 
    }
    if (roomA > roomB) {
        return 1;
    }

    return 0;
    });
    
    document.getElementById(`title`).innerHTML = `<h1 class="title">Sorted by Rooms</h1>`;
    showAllProducts( roomSort );

    roomRangeRadio.style.visibility = `visible`; 
    $btnRooms.addEventListener(`click`, sortByRoom); 
}



roomRangeRadio.addEventListener(`click`, (event) => {

    let val = document.getElementById(`roomRange`).pop.value;
  
    if (val == 0) {
        showAllProducts( allProducts.filter(prod => prod.rooms ==`All`))
    } else if (val == 1) {
        showAllProducts ( allProducts.filter(prod=> prod.rooms ==`Living Room`))
    }
    
    else if (val == 2) {
        showAllProducts ( allProducts.filter(prod=> prod.rooms ==`Patio`))
    }
    
    else if (val == 3) {
        showAllProducts ( allProducts.filter(prod=> prod.rooms ==`Office`))
    } 

    else if (val == 4) {
        showAllProducts ( allProducts.filter(prod=> prod.rooms ==`Bedroom`))
    } 

  });



$btnRooms.addEventListener(`click`, sortByRoom); 

/**************************************************************
                Sort By Colour
****************************************************************/

const sortByColour = (event) => {
    const colourSort = allProducts.sort((a,b)=> {
    const colourA = a.colour.toUpperCase(); 
    const colourB= b.colour.toUpperCase();
    if (colourA < colourB) {
        return - 1; 
    }
    if (colourA > colourB) {
        return 1;
    }

    return 0;
    });
    
    document.getElementById(`title`).innerHTML = `<h1 class="title">Sorted by Colour</h1>`;
    showAllProducts( colourSort );
    roomRangeRadio.style.visibility = `hidden`; 

}

$btnColour.addEventListener(`click`, sortByColour); 

/**************************************************************
                Sort By Availability 
****************************************************************/

const filterInStock = (event) => {
    const inStockFilter = allProducts.filter(prod => prod.isInStock == true);

    
    document.getElementById(`title`).innerHTML = `<h1 class="title">Products in Stock</h1>`;
    showAllProducts( inStockFilter );
    roomRangeRadio.style.visibility = `hidden`; 

}

$btnStock.addEventListener(`click`, filterInStock); 