import { readProductsJson, writeAllProductsJson, writeProductsJson, createPagination, createFilter } from '../service/index.js'
import { v4 } from 'uuid'
export const getAllProducts = async (req, res, next) => {
    try{
        const {page, limit, filter} = req.query
        const products = JSON.parse(readProductsJson())
        // console.log(page, limit);
        if(filter){

            const filterData = createFilter(products, filter)

            return res.status(200).send(filterData)
        }
        if(page && limit){
            const data = createPagination(products, limit, page)
            
            return res.status(200).send(data)
        }

        return res.status(200).send(products)
        
    }catch(err){
        next(err)
    }
}
export const getOneProduct = (req, res, next) => {
    try{
        const id = req.params.id

        const products = JSON.parse(readProductsJson())
        

        for(let product of products){
            if(product.id == id){
                 return res.status(200).send(product)
            }
        }
        return res.status(400).send("Product not found")

   }catch(err){
        next(err)
    }
}
export const createProduct = (req, res, next) => {
    try{    
        const {model, price, company} = req.body

        writeProductsJson({id:v4(), model, price, company})

        return res.status(201).send("Product created")

    }catch(err){
        next(err)
    }
}

export const updateProduct = (req, res, next) => {
    try{
        const id = req.params.id
        const body = req.body
        const products = readProductsJson()

        for(let i = 0; i<products.length; i++){
            const product = products[i]
            if(product.id == id){
                
                const updateProduct = {
                    ...product,
                    ...body
                }
                products[i] = updateProduct
                
                writeAllProductsJson(products)
                console.log(product.id);

                return res.status(200).send("Product updated")
            }
        }

        return res.status(400).send("Product id not found")

    }catch(err){
        next(err)
    }
}

export const deleteProduct = (req, res, next) => {
    try{
        const id = req.params.id
        const products = readProductsJson()

        for(let i = 0; i<products.length; i++){
            const product = products[i]

            if(product.id == id){
                products.splice(i,1)
                writeAllProductsJson(products)
                return res.status(200).send("Product deleted")
            }
        }

        return res.status(400).send("Product id not found")
    }catch(err){
        next(err)
    }
}