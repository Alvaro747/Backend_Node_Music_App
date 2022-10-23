const fs=require('fs')
const { matchedData } = require('express-validator');
const {storageModel} = require('../models');
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH=`${__dirname}/../storage`

// obtener lista de la BD
const getItems = async (req,res) =>{
    try {
        const data = await storageModel.find({})
        res.send({data})
    } catch (e) {
        handleHttpError(res,'Error_get_items')
    }
};

// obtener un detalle
const getItem = async (req,res) =>{
    try {
        const {id}= matchedData(req)
        const data = await storageModel.findById(id)
        res.send({data})
    } catch (e) {
        handleHttpError(res,'Error_get_item')
    }
};

// insertar un registro
const createItems = async (req,res) =>{
   try {
        const {body,file} = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
   } catch (e) {
    handleHttpError(res,'Error_create_item')
   }
};


// eliminar un registro
const deleteItems = async (req,res) =>{
    try {
        const {id}=matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.delete({_id:id})
        const {filename}= dataFile
        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted:1
        }
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_DELETE_STORAGE')
    }
};



module.exports = {
    getItems,
    getItem,
    createItems,
    deleteItems
};