import { Router } from 'express';
import { formPage, applicationForm, updateForm, removeForm } from '../controllers/ApplicationControllers'
const router = Router();
// Application  form route
router.get('/form', formPage);
router.post('/form', applicationForm);
router.put('/form/:id', updateForm);
router.delete('form/:id', removeForm);

export default router;