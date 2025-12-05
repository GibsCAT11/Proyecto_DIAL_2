import CartDetailDAO from '../daos/CartDAO.js';

const cartController = {
  async getAll(req, res, next) {
    try {
      const carts = await CartDetailDAO.findAll();
      return res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const cart = await CartDetailDAO.findById(id);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      return res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const newCart = await CartDetailDAO.create(req.body);
      return res.status(201).json(newCart);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedCart = await CartDetailDAO.update(id, req.body);
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      return res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await CartDetailDAO.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default cartController;
