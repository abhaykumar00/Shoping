function displayCart() {
    // Get cart details from local storage
    var cart = JSON.parse(localStorage.getItem("cart"));

    // Display cart details in cart page
    var cartTable = document.getElementById("cartTable");
    var totalPrice = 0;

    // Add table headers
    var headerRow = document.createElement("tr");
    var headerImage = document.createElement("th");
    var headerName = document.createElement("th");
    var headerPrice = document.createElement("th");
    headerImage.innerText = "Image";
    headerName.innerText = "Product Name";
    headerPrice.innerText = "Price";
    headerRow.appendChild(headerImage);
    headerRow.appendChild(headerName);
    headerRow.appendChild(headerPrice);
    cartTable.appendChild(headerRow);

    // Add table rows for each item in the cart
    for (var i = 0; i < cart.length; i++) {
        var productRow = document.createElement("tr");
        var productImage = document.createElement("img");
        var productName = document.createElement("td");
        var productPrice = document.createElement("td");

        productImage.src = cart[i].imageUrl;
        productImage.alt = cart[i].productName;
        productImage.style.width = "100px";
        productImage.style.height = "100px";
        productName.innerText = cart[i].productName;
        productPrice.innerText = "$" + cart[i].price.toFixed(2);

        productRow.appendChild(productImage);
        productRow.appendChild(productName);
        productRow.appendChild(productPrice);
        cartTable.appendChild(productRow);

        totalPrice += cart[i].price;
    }

    // Add table footer with total price
    var footerRow = document.createElement("tr");
    var footerLabel = document.createElement("td");
    var footerTotal = document.createElement("td");
    footerLabel.colSpan = 2;
    footerLabel.innerText = "Total Price";
    footerTotal.innerText = "$" + totalPrice.toFixed(2);
    footerRow.appendChild(footerLabel);
    footerRow.appendChild(footerTotal);
    cartTable.appendChild(footerRow);
}



function clearCart() {
    // Clear cart data in local storage
    localStorage.removeItem("cart");
    localStorage.clear();
}

function addToCart(productName, price, imageUrl) {
    // Get existing cart from local storage or create a new one if it doesn't exist
    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add new product to cart
    cart.push({productName: productName, price: price, imageUrl: imageUrl});

    // Update cart in local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to cart page
    window.location.href = "cart.html";
}
