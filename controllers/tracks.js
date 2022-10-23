
const { matchedData } = require('express-validator');
const {tracksModel} = require('../models');
const { handleHttpError } = require('../utils/handleError');

// obtener lista de la BD
const getItems = async (req,res) =>{

    try {
        const user = req.user
        const data = await tracksModel.find({})
        res.send({data, user})
    } catch (e) {
        handleHttpError(res,'ERROR_GET_ITEMS',500)
    } 
};

// obtener un detalle
const getItem = async (req,res) =>{
    try {
        req = matchedData(req)
        const {id}=req
        const data = await tracksModel.findById(id)
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_GET_ITEM')
    }
};

// insertar un registro
const createItems = async (req,res) =>{
    try {

        const body = matchedData(req)
        const data = await tracksModel.create(body)
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_CREAR_ITEM',500)
    } 
};

// actualizar un registro
const updateItems = async (req,res) =>{
    try {
        const {id, ...body}= matchedData(req)
        const data = await tracksModel.findByIdAndUpdate(
            id,body
        )
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_UPDATE_ITEM',500)
    }  
};

// eliminar un registro
const deleteItems = async (req,res) =>{
    try {
        req = matchedData(req)
        const {id}=req
        const data = await tracksModel.delete({_id:id})
        res.send({data})
    } catch (e) {
        handleHttpError(res,'ERROR_DELETE_ITEM')
    }
};



module.exports = {
    getItems,
    getItem,
    createItems,
    updateItems,
    deleteItems
};