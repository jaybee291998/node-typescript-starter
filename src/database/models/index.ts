import SequelizeConnection from '../configuration'
// import Department from './department'
import Employee from './employee'
import Product from './product'
import QueryHandling from './queryHandling'
const sequelize = SequelizeConnection.getInstance()

// Department.initModel(sequelize)
Employee.initModel(sequelize)
Product.initModel(sequelize)
QueryHandling.initModel(sequelize)
// console.log(Employee.findAll())
export const db = {
    sequelize,
    Employee,
    Product,
    QueryHandling,
    // Department,
}
