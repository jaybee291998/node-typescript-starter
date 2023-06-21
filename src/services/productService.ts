import { db } from '../database/models'
import Product from '../database/models/product'

class ProductService {
    findall = async () => {
        const products: Product[] = await db.Product.findAll({
            attributes: ['id', 'productName', 'baseCost'],
        })
        return products
    }

    findById = async (id: string) => {
        const product: Product | null = await db.Product.findByPk(id, {
            attributes: ['id', 'productName', 'baseCost'],
        })
        return product
    }

    save = async (object: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object must contain atleast one entity')
            }
            const product = await db.Product.create({ ...object })
            return product
        } catch (err) {
            throw err
        }
    }

    update = async (id: string, object: any) => {
        if (!object && Object.keys(object).length == 0) {
            throw new Error(
                'Object to be updated must contain at least one property.'
            )
        }

        let existingProduct = await this.findById(id)
        if (!existingProduct) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await db.Product.update(
                { ...object },
                {
                    where: { id },
                }
            )

            existingProduct = await this.findById(id)
            return existingProduct
        } catch (err) {
            throw err
        }
    }

    deleteByPrimaryKey = async (id: string) => {
        const existingProduct = await this.findById(id)
        if (!existingProduct) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await existingProduct.destroy()
        } catch (err) {
            throw err
        }
    }
}

const productService: ProductService = new ProductService()
export default productService
