class Notification {
    constructor(notification_id, message, sent_date, type, order_id) {
        this.notification_id = notification_id;
        this.message = message;
        this.sent_date = sent_date || new Date();
        this.type = type;
        this.order_id = order_id; 
    }
}
export default Notification;