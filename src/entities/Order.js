
import { ORDER_STATES } from '../constants/orderStates.js';

class Order {
    constructor(order_id, order_date, state, total, client_id, store_id, pickup_code = null, pickup_date = null) {
        this.order_id = order_id;
        this.order_date = order_date || new Date();
        this.state = state || ORDER_STATES.PENDING; 
        this.total = total || 0.0;
        this.client_id = client_id; 
        this.store_id = store_id; 
        this.pickup_code = pickup_code; 
        this.pickup_date = pickup_date;
    }
}

export default Order;