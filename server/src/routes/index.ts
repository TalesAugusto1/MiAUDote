import { Router } from 'express';
import adocaoRoutes from './adocaoRoutes';
import animalRoutes from './animalRoutes';
import formularioRoutes from './formularioRoutes';
import ongRoutes from './ongRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/ongs', ongRoutes);
router.use('/animais', animalRoutes);
router.use('/adocoes', adocaoRoutes);
router.use('/formularios', formularioRoutes);

export default router; 