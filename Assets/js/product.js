pCards = [
    {
        name: "Oversized Hoodie",
        pImg: "product-1.png",
        oldPrice: "60.00",
        newPrice: "39.99",
        id: "1",
        category: "Tops",
    },
    {
        name: "Streetwear Shoes",
        pImg: "product-2.png",
        oldPrice: "75.00",
        newPrice: "51.50",
        id: "2",
        category: "Shoes",
    },
    {
        name: "Silver Cross Pendant",
        pImg: "product-3.png",
        oldPrice: "20.00",
        newPrice: "12.99",
        id: "3",
        category: "Jewelry",
    },
    {
        name: "Varsity Jacket",
        pImg: "product-4.png",
        oldPrice: "80.00",
        newPrice: "54.99",
        id: "4",
        category: "Tops",
    },
    {
        name: "Tokyo Hoodie",
        pImg: "product-5.png",
        oldPrice: "60.00",
        newPrice: "39.99",
        id: "5",
        category: "Tops",
    },
    {
        name: "Cargo Pants",
        pImg: "product-6.png",
        oldPrice: "75.00",
        newPrice: "51.50",
        id: "6",
        category: "Bottoms",
    },
    {
        name: "Graphic Sweatshirt",
        pImg: "product-7.png",
        oldPrice: "46.00",
        newPrice: "27.99",
        id: "7",
        category: "Tops",
    },
    {
        name: "Nike Air Shoes",
        pImg: "product-8.png",
        oldPrice: "80.00",
        newPrice: "54.99",
        id: "8",
        category: "Shoes",
    },
    {
        name: "Otter Cream Plushie",
        pImg: "product-9.png",
        oldPrice: "15.00",
        newPrice: "7.79",
        id: "9",
        category: "Plushies",
    },
    {
        name: "Twisted Smiley Necklace",
        pImg: "product-10.png",
        oldPrice: "18.00",
        newPrice: "10.89",
        id: "10",
        category: "Jewelry",
    },
    {
        name: "Drop Shoulder Tee",
        pImg: "product-11.png",
        oldPrice: "34.50",
        newPrice: "24.99",
        id: "11",
        category: "Tops",
    },
    {
        name: "Otter Brown Plushie",
        pImg: "product-12.png",
        oldPrice: "20.79",
        newPrice: "12.99",
        id: "12",
        category: "Plushies",
    },
    {
        name: "Motion Tee",
        pImg: "product-13.png",
        oldPrice: "45.00",
        newPrice: "32.99",
        id: "13",
        category: "Top",
    },
    {
        name: "Urban Ambition",
        pImg: "product-14.png",
        oldPrice: "75.00",
        newPrice: "49.99",
        id: "14",
        category: "Top",
    },
    {
        name: "All Eyes Hoodie",
        pImg: "product-15.png",
        oldPrice: "60.00",
        newPrice: "45.89",
        id: "15",
        category: "Top",
    },
    {
        name: "Miami Curb Bracelet",
        pImg: "product-16.png",
        oldPrice: "30.00",
        newPrice: "14.99",
        id: "16",
        category: "Jewelry",
    },
]
document.addEventListener("DOMContentLoaded", () => {
    const productsContainerNew = document.querySelector('.new .products');
    const productsContainerPopular = document.querySelector('.popular .products');
    const productsContainerBest = document.querySelector('.best .products');

    pCards.forEach((product, index) => {
        let productHTML = `
        <div data-aos="zoom-out-down" data-aos-duration="2000" data-aos-offset="200" 
             class="product-card" data-category="${product.category}">
            <div class="img-container">
                <img src="Assets/images/products/${product.pImg}" alt="${product.name}">
                <div class="wishlist-icon">
                    <i class="bi bi-suit-heart" data-tooltip="Add to Wishlist" data-product-id="${product.id}"></i>
                </div>
                <div class="overlay">
                    <div class="quick-buttons">
                        <i class="bi bi-eye" data-tooltip="Quick View"></i>
                        <i class="bi bi-suit-heart" data-tooltip="Add to Wishlist" data-product-id="${product.id}"></i>
                        <i class="bi bi-bag" data-tooltip="Add to Cart" data-product-id="${product.id}"></i>
                    </div>
                    <a href="productlink"><button>View Product</button></a>
                </div>
            </div>
            <h3>${product.name}</h3>
            <div class="product-price">
                <p class="n-price">$${product.newPrice}</p>
                <p class="o-price">$${product.oldPrice}</p>
            </div>
        </div>
    `;

        if (index < 4) {
            productsContainerNew.insertAdjacentHTML('beforeend', productHTML);
        } else if (index < 12) {
            productsContainerPopular.insertAdjacentHTML('beforeend', productHTML);
        }
        else {
            productsContainerBest.insertAdjacentHTML('beforeend', productHTML);
        }
    });


    displayProducts(pCards);
});
