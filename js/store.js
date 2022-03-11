const allProducts=[
    {id:1, title: "nameProduct-1", price: 10, img:"Images/1-pmv-.jpg", count: 1},
    {id:2, title: "nameProduct-2", price: 5, img:"Images/2-revolt.jpg", count: 1},
    {id:3, title: "nameProduct-3", price: 30, img:"Images/4- headset.jpg", count: 1},
    {id:4, title: "nameProduct-4", price: 50, img:"Images/3-dove .jpg", count: 1},
    {id:5, title: "nameProduct-5", price: 45, img:"Images/Album 3.png", count: 1},
    {id:6, title: "nameProduct-6", price: 15, img:"Images/Album 4.png", count: 1}
];

userBasket=[];

let $ = document;
let shopItemsContainer=$.querySelector(".shop-items");
/* basketProductContainerAll = cardItemsContainer */
let basketProductContainerAll=$.querySelector(".cart-items");
let btn_purchase=$.querySelector("#remove-all-items");
let totalPricesCalcElem=$.querySelector(".cart-total-price");

allProducts.forEach((product)=>{
    let productContaier=$.createElement("div");
    productContaier.className="shop-item";

    let productTitleSpan=$.createElement("span");
    productTitleSpan.className="shop-item-title";
    productTitleSpan.innerHTML=product.title;
    
    let productImgEle=$.createElement("img");
    // productImgEle.src=product.img;
    productImgEle.setAttribute("src",product.img)
    productImgEle.classList.add("shop-item-image");

    let productDetailContainer=$.createElement("div");
    productDetailContainer.className="shop-item-details";

    let productPriceSpan=$.createElement("span");
    productPriceSpan.className="shop-item-price";
    productPriceSpan.innerHTML=product.price;

    let productAddBtn=$.createElement("button");
    productAddBtn.innerHTML="ADD TO CART";
    /* wenn you have differnt class , you use className */
    productAddBtn.className="btn btn-primary shop-item-button";
    productAddBtn.addEventListener("click",()=>{
        addProductToBasket(product.id);

    });
    
    productDetailContainer.append(productPriceSpan,productAddBtn);

    productContaier.append(productTitleSpan,productImgEle,productDetailContainer);

    shopItemsContainer.append(productContaier);
    
    
});

function addProductToBasket(productId){
    /* mainProduct= productSelected */
    let productSelected= allProducts.find((product)=>{
       return product.id===productId;
    })
    userBasket.push(productSelected);

    basketProductGenerator(userBasket);
    calcTotalPrice(userBasket);
}

function basketProductGenerator(basketUserArray){
    basketProductContainerAll.innerHTML="";
    basketUserArray.forEach((product)=>{
        // console.log(product);
        /* basketProductContainer */
        let basketProductsDetailsContainer =  $.createElement("div");
        basketProductsDetailsContainer.classList.add("cart-row");
        /* 1 */
        let basketProducts_ImgContainer=$.createElement("div");
        basketProducts_ImgContainer.className="cart-item cart-column";
        
        let basketProducts_Img=$.createElement("img");
        basketProducts_Img.classList.add("cart-item-image-");
        basketProducts_Img.setAttribute("src",product.img);
        basketProducts_Img.setAttribute("width","100");/* ?? px */
        basketProducts_Img.setAttribute("height","100");
        
        let basketProducts_span=$.createElement("span");
        basketProducts_span.className="cart-item-title";
        basketProducts_span.innerHTML=product.title;
        
        basketProducts_ImgContainer.append(basketProducts_Img,basketProducts_span); 
        /* 2 */
        let basketProductPriceSpam= $.createElement("span");
        basketProductPriceSpam.className="cart-price cart-column";
        basketProductPriceSpam.innerHTML=product.price;

        /* 3  */
        let basketProductQuantityContainer=$.createElement("div");
        basketProductQuantityContainer.className="cart-quantity cart-column";

        let basketProductInputNumber=$.createElement("input");
        basketProductInputNumber.classList.add("cart-quantity-input");
        basketProductInputNumber.setAttribute("value",product.count);
        // basketProductInputNumber.value=product.count;
        basketProductInputNumber.setAttribute("type","number");
        basketProductInputNumber.addEventListener("change",()=>{
                changeCountFromUserBasket(product.id,basketProductInputNumber.value);
        })

        let basketProductBtnRemove=$.createElement("button");
        basketProductBtnRemove.className="btn btn-danger";
        basketProductBtnRemove.innerHTML="REMOVE";

        basketProductBtnRemove.addEventListener("click",()=>{
            removeProductFromBasket(product.id);
        })


        basketProductQuantityContainer.append(basketProductInputNumber,basketProductBtnRemove);
        // console.log(basketProductQuantityContainer);

        /* append  1,2,3  in basketProductsDetailsContainer */
        basketProductsDetailsContainer.append(basketProducts_ImgContainer,basketProductPriceSpam,basketProductQuantityContainer)

        basketProductContainerAll.append(basketProductsDetailsContainer);

    })
    // let totalPricesCalc= calcTotalPrice(basketUserArray);

} 

function removeProductFromBasket(productID){
    /* findIndex or filter */
    let indexRemoveProduct=userBasket.findIndex((product)=>{
        return product.id===productID;
    })    
    /* with filter without splice just:condition =>  return product.id!==productID; */
            userBasket.splice(indexRemoveProduct, 1); 
            basketProductGenerator(userBasket)

}

function removeCompeleteProductBasket(){
    userBasket=[];
    basketProductGenerator(userBasket)
}
btn_purchase.addEventListener("click",removeCompeleteProductBasket);

function calcTotalPrice(userBasket){
    let sumPrice=0;
    userBasket.forEach((product)=>{
         sumPrice += product.price * product.count;    
    })
    totalPricesCalcElem.innerHTML=sumPrice;
}
/* updateProductCount */
function changeCountFromUserBasket(product_Id,newCountValue){
   
    userBasket.findIndex((product)=>{
        if( product.id===product_Id){
            product.count=newCountValue;
        }
    })
    /* after count chaange update total-Price */
    calcTotalPrice(userBasket)
}
