class Client {
    constructor(client_id, name, phone, email, address, password) {
        this.client_id = client_id; 
        this.name = name;
        this.phone = phone || null;
        this.email = email || null;
        this.address = address || null;
        this.password = password || null;
    }
}

export default Client;
