//Loop-rendered dynamic content
    //array of items
    const products = [
        { name: "Pork Chops", price: "KSh 850" },
        { name: "Streaky Bacon", price: "KSh 450" },
        { name: "Choma Sausages", price: "KSh 500" }
    ];

    function renderProducts() {
        const productList = document.getElementById("product-list");
        productList.innerHTML="";//clears previous input
        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            
            const productName = document.createElement("h3");
            productName.textContent = product.name;

            const productPrice = document.createElement("p");
            productPrice.textContent = product.price;

            //appending 
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productList.appendChild(productItem)
        });
    }
    renderProducts();

    //wishlist form handling

    const wishlistForm = document.getElementById('wishlist-form');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const wishlistItems = document.getElementById('wishlistItems');

function addWishlistItem() {
    const name = productName.value.trim();
    const description = productDescription.value.trim();
    
    if (name === '' || description === '') {
        alert('Please fill in both fields!');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    
    // Create div with name and description
    const div = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = name;
    const p = document.createElement('p');
    p.textContent = description;
    div.appendChild(strong);
    div.appendChild(p);
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });
    
    // Add everything to li
    li.appendChild(div);
    li.appendChild(deleteBtn);
    
    // Add to list
    wishlistItems.appendChild(li);
    
    // Clear form
    productName.value = '';
    productDescription.value = '';
    productName.focus();
}

// Form submit
wishlistForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addWishlistItem();
});

// Delete existing items
document.querySelectorAll('.delete-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        this.parentElement.remove();
    });
});


// Form handling  and validation for feedback form
const feedbackForm = document.getElementById('feedback-form');
const feedbackOutput = document.getElementById('feedback-output');

feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('feedback-name').value.trim();
    const email = document.getElementById('feedback-email').value.trim();
    const message = document.getElementById('feedback-message').value.trim();
    
    // email validation
    if (!name || !email || !message) {
        feedbackOutput.textContent = 'Please fill in all fields!';
        return;
    }
    
    if (!email.includes('@')) {
        feedbackOutput.textContent = 'Please enter a valid email!';
        return;
    }
    
    // show feedback
    feedbackOutput.textContent = `Thanks ${name}! We received your message: "${message}"`;
    
    // Clear form
    this.reset();
});


// Save wishlist with localStorage
// Load items when page loads
function loadWishlist() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
        const items = JSON.parse(saved);
        items.forEach(function(item) {
            addItemToPage(item.name, item.desc);
        });
    }
}

// Save items to localStorage
function saveWishlist() {
    const items = [];
    document.querySelectorAll('#wishlistItems li').forEach(function(li) {
        items.push({
            name: li.querySelector('strong').textContent,
            desc: li.querySelector('p').textContent
        });
    });
    localStorage.setItem('wishlist', JSON.stringify(items));
}

// Add item to page
function addItemToPage(name, desc) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = name;
    const p = document.createElement('p');
    p.textContent = desc;
    div.appendChild(strong);
    div.appendChild(p);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveWishlist();
    });
    
    li.appendChild(div);
    li.appendChild(deleteBtn);
    wishlistItems.appendChild(li);
}

// Load saved items
loadWishlist();

// Save when adding new item
const originalAdd = addWishlistItem;
addWishlistItem = function() {
    const name = productName.value.trim();
    const desc = productDescription.value.trim();
    if (name === '' || desc === '') {
        alert('Please fill in both fields!');
        return;
    }
    addItemToPage(name, desc);
    saveWishlist();
    productName.value = '';
    productDescription.value = '';
    productName.focus();
};
// Banner caption toggle

const bannerImage = document.getElementById('banner-image');
const bannerCaption = document.getElementById('bannerCaption');

bannerImage.addEventListener('click', function() {
    bannerCaption.classList.toggle('show');
});