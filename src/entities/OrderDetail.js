class OrderDetail {
    constructor(detail_order_id, quantity, sale_price, order_id, product_id) {
        this.detail_order_id = detail_order_id;
        this.quantity = quantity || 0;
        this.sale_price = sale_price;
        this.order_id = order_id;
        this.product_id = product_id;
    }
}
export default OrderDetail;