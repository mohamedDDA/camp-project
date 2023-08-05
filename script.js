


window.addEventListener('load', function () {
    // Select the loading container and set durations
    var loadingContainer = document.querySelector('#loading-wrapper');
    var duration = 3800; // Set the duration in milliseconds (e.g., 3500 = 3.5 seconds)
    var fadeOutDuration = 500; // Set the fade out duration in milliseconds (e.g., 500 = 0.5 seconds)

    var body = document.querySelector('body');

    setTimeout(function () {
        // Fade out the loading container
        loadingContainer.style.opacity = '0';

        // Enable vertical scrolling on the body
        body.style.overflowY = 'visible';

        setTimeout(function () {
            // Hide the loading container after fade out
            loadingContainer.style.display = 'none';
        }, fadeOutDuration);
    }, duration);
});




const main = () => {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    //INSERT EVENT DATE AND TIME HERE IN THIS FORMAT: 'June 1, 2023, 19:00:00'
    const EVENTDATE = new Date('August 8, 2023, 19:00:00')

    const countDown = new Date(EVENTDATE).getTime()
    const x = setInterval(() => {

        const now = new Date().getTime()
        const distance = countDown - now

        document.getElementById("days").innerText = Math.floor(distance / day)
        document.getElementById("hours").innerText = Math.floor((distance % day) / (hour))
        document.getElementById("minutes").innerText = Math.floor((distance % hour) / (minute))
        document.getElementById("seconds").innerText = Math.floor((distance % minute) / second)

        //delay in milliseconds
    }, 0)
}

main();

function toggleHeartIcon(icon) {
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
}


const dropdownIcon = document.querySelector('.drop-icon');

// Get the dropdown menu element
const dropNav = document.querySelector('.drop-nav');

// Add a click event listener to the dropdown icon
dropdownIcon.addEventListener('click', function () {
    dropNav.classList.toggle('open'); // Toggle the "open" class on the dropdown menu
});










// Fetch products and populate the shop section
// Fetch top rated products and populate the best products section
const categoriesSection = document.querySelector('#Categories');
const bestCont = categoriesSection.querySelector('.best-cont');

fetch('store.json')
    .then(response => response.json())
    .then(data => {
        const products = data.store;
        const topProducts = products
            .filter(product => product.stars) // filter out products without stars
            .sort((a, b) => b.stars - a.stars) // sort products by stars in descending order
            .slice(0, 10); // get the top 10 products by stars

        const productCards = topProducts.map(product => {
            let starsHtml = '';
            const solidStars = '<i class="fas fa-star"></i>'.repeat(product.stars);
            const regularStars = '<i class="far fa-star"></i>'.repeat(5 - product.stars);
            starsHtml = `<i>${solidStars}${regularStars}</i>`;
            const dataType = `data-brand="${product.brand.toLowerCase()}" data-type="${product.type.toLowerCase()}"`;
            return `            
            <div class="card " ${dataType}>
            <div class="image"><img src="${product.image}" alt=""></div>
            <div class="text">
              <div class="feedback">
                <div class="stars">${starsHtml}</div>
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

        bestCont.innerHTML = productCards;
    })
    .catch(error => console.error(error));





// document.addEventListener('DOMContentLoaded', function () {
//     const savedList = document.querySelector('.Saved');
//     const saveIcon = document.querySelector('.saveL');

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











document.getElementById("message-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var subjectError = document.getElementById("subject-error");
    var messageError = document.getElementById("message-error");
    var successMessage = document.getElementById("success-message");
    var errorMessage = document.getElementById("error-message");

    nameError.textContent = name === "" ? "Name is required." : "";
    emailError.textContent = email === "" ? "Email is required." : "";
    subjectError.textContent = subject === "" ? "Subject is required." : "";
    messageError.textContent = message === "" ? "Message is required." : "";

    if (name === "" || email === "" || subject === "" || message === "") {
        return; // Exit the function if there are validation errors
    }

    // Configure your EmailJS settings
    emailjs.init("YQP55Kw0tXoUx0Wn6");

    // Prepare the email parameters
    var emailParams = {
        to_email: "milanone4@gmail.com", // Replace with your email
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    // Send the email using EmailJS
    emailjs.send("service_7d4bbul", "template_kani98j", emailParams)
        .then(function (response) {
            successMessage.textContent = "Message sent successfully!";
            // Optionally, you can reset the form here
        }, function (error) {
            errorMessage.textContent = "An error occurred. Please try again later.";
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

window.addEventListener('scroll', () => {
    toggleAnimation('animate-up', animateUpElements);
    toggleAnimation('animate-left', animateLeftElements);
    toggleAnimation('animate-right', animateRightElements);
});
