import { Model, Sequelize, DataTypes } from 'sequelize'
import { ProductAttributes } from '../attributes'

class Product extends Model implements ProductAttributes {
    public id!: string
    public productName!: string
    public baseCost!: number

    static initModel(sequelize: Sequelize): void {
        Product.init(
            {
                id: {
                    field: 'ProdID',
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                productName: {
                    field: 'ProdName',
                    type: DataTypes.STRING,
                },
                baseCost: {
                    field: 'Base_Cost',
                    type: DataTypes.DOUBLE,
                },
            },
            {
                sequelize,
                underscored: true,
                tableName: 'Product',
                timestamps: false,
            }
        )
    }
}

export default Product
