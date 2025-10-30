class Payment {
    constructor(payment_id, amount, payment_date, payment_method, order_id) {
        this.payment_id = payment_id;
        this.amount = amount;
        this.payment_date = payment_date || new Date();
        this.payment_method = payment_method;
        this.order_id = order_id;
    }
}
export default Payment;