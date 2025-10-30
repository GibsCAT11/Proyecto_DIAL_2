class CartDetail {
    constructor(detail_id, quantity, cart_id, product_id) {
        this.detail_id = detail_id;
        this.quantity = quantity || 0;
        this.cart_id = cart_id;
        this.product_id = product_id;
    }
}

export default CartDetail;