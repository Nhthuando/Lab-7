import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router();

router.post('/', (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getUsers(req, res));

export default router;

