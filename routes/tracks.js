
const express = require('express');
const router = express.Router();
const {getItems, getItem, createItems,updateItems,deleteItems} = require('../controllers/tracks');
const {validatorCreateItem,validatorGetItem}= require('../validators/tracks')
const customHeader = require('../middleware/customHeader')
const authMiddleware = require('../middleware/session');
const checkRol = require('../middleware/rol');
// lista todos los items
router.get('/',authMiddleware,getItems);

//lista un solo item po id

router.get('/:id',authMiddleware,validatorGetItem,getItem);

// crea un nuevo item
router.post('/',authMiddleware,checkRol(['admin']),validatorCreateItem,customHeader,createItems);

// actualizar un registo
router.put('/:id',authMiddleware,validatorGetItem,validatorCreateItem,updateItems)

//eliminar item
router.delete('/:id',authMiddleware,validatorGetItem,deleteItems)
module.exports = router;