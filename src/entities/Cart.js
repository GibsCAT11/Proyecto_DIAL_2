class Cart {
    constructor(cart_id, creation_date, client_id) {
        this.cart_id = cart_id;
        this.creation_date = creation_date || new Date();
        this.client_id = client_id; 
    }
}
export default Cart;