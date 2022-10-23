const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage')
const {validatorGetItem}= require('../validators/storage')
const {createItems, getItem, getItems, deleteItems} = require('../controllers/storage')

/**
 * obtener todos los items
 */
router.get('/',getItems)
/**
 * obtener un solo item por id
 */
router.get('/:id',validatorGetItem,getItem)
/**
 * crear un nuevo item
 */
router.post('/',uploadMiddleware.single('myfile'),createItems)

/**
 * eliminar un item
 */
router.delete('/:id',validatorGetItem,deleteItems)


module.exports = router;
