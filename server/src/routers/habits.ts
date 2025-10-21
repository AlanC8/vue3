import { Router } from "express";
import { ItemModel } from '../models/ItemModels';
const router = Router()

router.get('/', async (req, res) => {
    try {
      const items = await ItemModel.find();
      res.status(200).json(items);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  });

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const items = await ItemModel.findById(id)
        res.status(200).json(items)
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
})

router.post('/', async (req, res) => {
    try {
      const body = req.body;
  
      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ message: 'Тело запроса не может быть пустым.' });
      }
  
      const newItem = new ItemModel(body);
  
      const savedItem = await newItem.save();
  
      res.status(201).json(savedItem);
    } catch (error) {
      console.error('Ошибка при сохранении в БД:', error);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedItem = await ItemModel.findByIdAndDelete(id);
  
      if (!deletedItem) {
        return res.status(404).json({ message: 'Запись не найдена' });
      }
      
      res.status(200).json({ message: 'Запись успешно удалена' });
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
      res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
  });

export default router;