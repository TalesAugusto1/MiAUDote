import { Router } from 'express';
import { FormularioController } from '../controllers/FormularioController';

const router = Router();
const formularioController = new FormularioController();

// Criar um novo formulário
router.post('/', formularioController.create.bind(formularioController));

// Buscar formulário por ID
router.get('/:id', formularioController.findById.bind(formularioController));

// Buscar formulários por ID do adotante
router.get('/adotante/:idAdotante', formularioController.findByAdotante.bind(formularioController));

// Atualizar formulário
router.put('/:id', formularioController.update.bind(formularioController));

// Deletar formulário
router.delete('/:id', formularioController.delete.bind(formularioController));

export default router; 