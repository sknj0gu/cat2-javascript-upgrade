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