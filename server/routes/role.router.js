import express from 'express';
import roleController from '../controllers/role.controller.js';

const router = express.Router();

// ------------------ CRUD -------------------
router.get('/role/:id', roleController.getOne);
router.get('/roles', roleController.getAll);
router.post('/create-role', roleController.create);
router.delete('/delete-role/:id', roleController.delete);
router.put('/update-role/:id', roleController.update);


export default router;