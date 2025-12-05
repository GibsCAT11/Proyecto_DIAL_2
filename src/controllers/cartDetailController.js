import  CartDetailDAO from '../daos/CartDetailDAO.js';

const cartDetailController = {
  async getAll(req, res, next) {
    try {
      const cartDetails = await CartDetailDAO.findAll();
      return res.status(200).json(cartDetails);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const detail = await CartDetailDAO.findById(id);
      if (!detail) {
        return res.status(404).json({ message: 'Cart detail not found' });
      }
      return res.status(200).json(detail);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const newDetail = await CartDetailDAO.create(req.body);
      return res.status(201).json(newDetail);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updatedDetail = await CartDetailDAO.update(id, req.body);
      if (!updatedDetail) {
        return res.status(404).json({ message: 'Cart detail not found' });
      }
      return res.status(200).json(updatedDetail);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await CartDetailDAO.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Cart detail not found' });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default cartDetailController;
