import { Router } from 'express'
import { UserHandler } from '../controllers'

const router = Router()
router.get('/', UserHandler.getAll)
router.post('/create', UserHandler.create)
router.get('/getall', UserHandler.getAll)
router.get('/get/:id', UserHandler.getObjectById)
router.put('/update/:id', UserHandler.updateObject)
router.delete('/delete/:id', UserHandler.deleteObject)
export default router
