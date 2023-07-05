import express from 'express';
import { getAllProperties, createProperty, updateProperty, deleteProperty, getPropertyDetail } from '../controllers/property.controller.js';

const router = express.Router();

router.get('/', getAllProperties)
router.post('/', createProperty)
router.put('/:id', updateProperty)
router.delete('/:id', deleteProperty)
router.get('/:id', getPropertyDetail)

export default router