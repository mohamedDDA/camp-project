const shopSection = document.querySelector('.shop-cont');
let products = [];

fetch('store.json')
    .then(response => response.json())
    .then(data => {
        products = data.store;
        renderProducts(products);

        const categoryCheckboxes = document.querySelectorAll('#phone, #laptop, #Accessories, #Games');
        const brandCheckboxes = document.querySelectorAll('#Xiaomi, #Apple, #Lenovo, #Samsung, #Asus, #Microsoft, #Dell');
        const starFilters = document.querySelectorAll('.stars-filter');

        const searchButton = document.querySelector('button[type="submit"]');
        searchButton.addEventListener('click', () => filterProducts());

        function renderProducts(productsToRender) {
            const productCards = productsToRender.map(product => {
                let starsHtml = '';
                if (product.stars) {
                    const solidStars = '<i class="fas fa-star"></i>'.repeat(product.stars);
                    const regularStars = '<i class="far fa-star"></i>'.repeat(5 - product.stars);
                    starsHtml = `<div class="stars">${solidStars}${regularStars}</div>`;
                }

                let dataType = '';
                if (product.brand) {
                    dataType = `data-brand="${product.brand.toLowerCase()}"`;
                }
                if (product.type) {
                    const productType = product.type.toLowerCase();
                    dataType += ` data-type="${productType}"`;
                }

                return `
                    <div class="card" ${dataType}>
                        <div class="image"><img src="${product.image}" alt=""></div>
                        <div class="text">
                            <div class="feedback">
                                ${starsHtml}
                                <div class="reviews">(${product.reviews})</div>
                            </div>
                            <div class="name">${product.name}</div>
                            <div class="price">${product.price}$</div>
                        </div>
                        <div class="btns">
                            <button class="add-to-cart">Add To Cart</button>
                            <i class="far fa-heart save-icon" data-id="${product.id}"></i>
                        </div>
                    </div>
                `;
            }).join('');

            shopSection.innerHTML = productCards;
        }

        function filterProducts() {
            const selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.id.toLowerCase());
            const selectedBrands = Array.from(brandCheckboxes).filter(cb => cb.checked).map(cb => cb.id.toLowerCase());
            const selectedStars = Array.from(starFilters).find(filter => filter.classList.contains('selected'))?.getAttribute('data-stars');

            const filteredProducts = products.filter(product => {
                const productCategory = product.type.toLowerCase();
                const productBrand = product.brand.toLowerCase();

                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
                const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(productBrand);
                const starsMatch = !selectedStars || product.stars.toString() === selectedStars;

                return categoryMatch && brandMatch && starsMatch;
            });

            if (filteredProducts.length === 0) {
                shopSection.innerHTML = '<h1>Sorry, no matching products</h1>';
            } else {
                renderProducts(filteredProducts);
            }
        }


        starFilters.forEach(starFilter => {
            starFilter.addEventListener('click', () => {
                starFilters.forEach(filter => filter.classList.remove('selected'));
                starFilter.classList.add('selected');
            });
        });
    })
    .catch(error => console.error(error));


// Add an event listener to the "Search" button
const searchButton = document.querySelector('button[type="submit"]');
searchButton.addEventListener('click', () => filterProducts(products));








const liElements = document.querySelectorAll('li.stars-filter');

liElements.forEach(li => {
    li.addEventListener('click', () => {
        liElements.forEach(otherLi => {
            if (otherLi !== li) {
                otherLi.classList.remove('select');
            }
        });
        li.classList.add('select');
    });
});







function toggleAnimation(animationClass, targetElements) {
    targetElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight - 100 && elementBottom >= 0) {
            element.classList.remove(animationClass);
            element.classList.add('reset');
        } else if (element.classList.contains('reset')) {
            element.classList.remove('reset');
        } else {
            element.classList.add(animationClass);
            element.classList.remove('reset');
        }
    });
}
const animateUpElements = document.querySelectorAll('.animate-up');
const animateLeftElements = document.querySelectorAll('.animate-left');
const animateRightElements = document.querySelectorAll('.animate-right');

// Call toggleAnimation() once immediately after page load
document.addEventListener('DOMContentLoaded', () => {
    toggleAnimation('animate-up', animateUpElements);
    toggleAnimation('animate-left', animateLeftElements);
    toggleAnimation('animate-right', animateRightElements);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
});


// document.addEventListener('DOMContentLoaded', function () {
//     const savedList = document.querySelector('.cart-list');
//     const saveIcon = document.querySelector('.shoping-cart');

//     function handleClick(event) {
//         if (event.target.classList.contains('save-icon')) {
//             saveCard(event);
//         } else if (event.target.classList.contains('remove-icon')) {
//             removeCard(event);
//         }
//     }

//     function saveCard(event) {
//         const card = event.target.closest('.card');
//         const imgSrc = card.querySelector('.image img').src;
//         const name = card.querySelector('.name').textContent;

//         event.target.classList.replace("far", "fas");

//         const li = document.createElement('li');
//         li.innerHTML = `<span>${name}</span> <img src="${imgSrc}" alt="${name}"><i class="fa-solid fa-xmark remove-icon"></i>`;
//         savedList.appendChild(li);

//         updateSavedCount();
//     }

//     function removeCard(event) {
//         const li = event.target.closest('li');
//         console.log(event.target)
//         li.remove();

//         updateSavedCount();
//     }

//     function updateSavedCount() {
//         const count = savedList.children.length;
//         saveIcon.dataset.count = count;

//         if (count > 0) {
//             saveIcon.classList.add('active');
//         } else {
//             saveIcon.classList.remove('active');
//         }
//     }

//     document.addEventListener('click', handleClick);
// });



document.addEventListener('DOMContentLoaded', function () {
    const savedList = document.querySelector('.Saved');
    const saveIcon = document.querySelector('.saveL');

    function handleClick(event) {
        if (event.target.classList.contains('save-icon')) {
            saveCard(event);
        } else if (event.target.classList.contains('remove-icon')) {
            removeCard(event);
        }
    }

    function saveCard(event) {
        const card = event.target.closest('.card');
        const imgSrc = card.querySelector('.image img').src;
        const name = card.querySelector('.name').textContent;

        event.target.classList.replace("far", "fas");

        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span> <img src="${imgSrc}" alt="${name}"><i class="fa-solid fa-xmark remove-icon"></i>`;
        savedList.appendChild(li);

        updateSavedCount();
    }

    function removeCard(event) {
        const li = event.target.closest('li');
        console.log(event.target)
        li.remove();

        updateSavedCount();
    }

    function updateSavedCount() {
        const count = savedList.children.length;
        saveIcon.dataset.count = count;

        if (count > 0) {
            saveIcon.classList.add('active');
        } else {
            saveIcon.classList.remove('active');
        }
    }

    document.addEventListener('click', handleClick);
});



document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.querySelector('.cart-list');
    const buyButton = document.querySelector('.buy-btn'); // Select the "Buy Now" link
    const shoppingCart = document.querySelector('.shoping-cart');

    // Using event delegation to capture click events on dynamically loaded cards
    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('add-to-cart')) {
            const button = event.target;
            const card = button.closest('.card');
            const image = card.querySelector('.image img').src;
            const name = card.querySelector('.name').textContent;
            const price = card.querySelector('.price').textContent;

            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                 <div>
                <div class="text">
                    <div>${name}</div>
                    <div>${price}</div>
                </div>
                <div class="image">
                    <img src="${image}" alt="${name}">
                </div>

                    
                </div>
            `;

            cartList.insertBefore(cartItem, buyButton); // Insert before the "Buy Now" link

            // Update the cart count in the ::before pseudo-element
            shoppingCart.setAttribute('data-shop-count', ((cartList.children.length) - 1));

            // Toggle the visibility of the ::before pseudo-element
            if (cartList.children.length > 0) {
                shoppingCart.classList.add('full-cart');
            } else {
                shoppingCart.classList.remove('full-cart');
            }
        }
    });
});








const dropdownIcon = document.querySelector('.drop-icon');

// Get the dropdown menu element
const dropNav = document.querySelector('.drop-nav');

// Add a click event listener to the dropdown icon
dropdownIcon.addEventListener('click', function () {
    dropNav.classList.toggle('open'); // Toggle the "open" class on the dropdown menu
});








const heartIcon = document.querySelector('.savec');

// Get the dropdown menu element
const heartList = document.querySelector('.Saved');

// Add a click event listener to the dropdown icon
heartIcon.addEventListener('click', function () {
    heartList.classList.toggle('shows'); // Toggle the "open" class on the dropdown menu
});

const cartIcon = document.querySelector('.shop-icon');

// Get the dropdown menu element
const cartList = document.querySelector('.cart-list');

// Add a click event listener to the dropdown icon
cartIcon.addEventListener('click', function () {
    cartList.classList.toggle('shows'); // Toggle the "open" class on the dropdown menu
});



document.addEventListener("DOMContentLoaded", function () {
    const openIcon = document.querySelector('.open-icon');
    const infoDiv = document.querySelector('.info');

    openIcon.addEventListener('click', function () {
        infoDiv.classList.toggle('show-side');
    });
});



const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', function () {
    const root = document.documentElement;
    const isDarkMode = root.classList.toggle('dark-mode');

    if (isDarkMode) {
        root.style.cssText = `
            --bg-color: #000000;
            --gray-color: #002146;
            --light-gray-color: #131313;
            --text-color: #ffffff;
            --main-color: #002958;
            --alt-color: #002b3b;
            --gredient: linear-gradient(120deg, #001e31 0%, rgba(103, 151, 255, 0)100%);
        `;
    } else {
        root.style.cssText = `
            --bg-color: #fff;
            --gray-color: #ddd;
            --light-gray-color: #f3f3f3;
            --text-color: #333;
            --main-color: #0d6efd;
            --alt-color: #0084b4;
            --gredient: linear-gradient(120deg, #80c6f5 0%, rgba(103, 151, 255, 0)100%);
        `;
    }
});
