// Define an array to store the cart items
let cartItems = [];

// Function to add a product to the cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existingItem = cartItems.find(item => item.name === product);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: product, quantity: 1 });
  }
  
  // Update the cart display
  displayCart();
}
function addToCartplus(product){
    const thisitem=cartItems.find(item=>item.name===product);
    thisitem.quantity++;
    displayCart();

}
this.formAddToCart = this.$element.find( "form.add-to-cart" );

  var self = this;
  self.formAddToCart.each(function() {
    var $form = $( this );
    var $product = $form.parent();
    var price = self._convertString( $product.data( "price" ) );
    var name =  $product.data( "name" );
    
    $form.on( "submit", function() {
      var qty = self._convertString( $form.find( ".qty" ).val() );
      var subTotal = qty * price;
      var total = self._convertString( self.storage.getItem( self.total ) );
      var sTotal = total + subTotal;
      self.storage.setItem( self.total, sTotal );
      self._addToCart({
        product: name,
        price: price,
        qty: qty
      });
      var shipping = self._convertString( self.storage.getItem( self.shippingRates ) );
      var shippingRates = self._calculateShipping( qty );
      var totalShipping = shipping + shippingRates;
      
      self.storage.setItem( self.shippingRates, totalShipping );
    });
  });



// Function to remove a product from the cart
function removeFromCart(product) {
  // Find the index of the product in the cart
  const index = cartItems.findIndex(item => item.name === product);
  if (index >= 0) {
    cartItems.splice(index, 1);
  }
  
  // Update the cart display
  displayCart();
}

// Function to update the cart display
function displayCart() {
  // Get the cart element and the cart items element
  const cart = document.getElementById("cart-items");
  
  // Clear the existing cart items
  cart.innerHTML = "";
  
  // Loop through the cart items and add them to the cart display
  cartItems.forEach(item => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.innerText = item.name;
    const quantity = document.createElement("span");
    quantity.innerText = item.quantity;
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.onclick = () => removeFromCart(item.name);
    const incButton = document.createElement("button");
    incButton.innerText = "+";
    incButton.onclick = () =>  addToCartplus(item.name);
    li.appendChild(name);
    li.appendChild(quantity);
    li.appendChild(removeButton);
    li.appendChild(incButton);
    cart.appendChild(li);
  });
}
