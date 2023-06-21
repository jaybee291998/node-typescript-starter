import { Model, Sequelize, DataTypes } from 'sequelize'
import { EmployeeAttributes } from '../attributes'

class Employee extends Model implements EmployeeAttributes {
    public id!: string
    public firstName!: string
    public lastname!: string
    public address!: string
    public age!: number
    public join_date!: Date
    public department!: string
    public salary!: number

    static initModel(sequelize: Sequelize): void {
        Employee.init(
            {
                id: {
                    field: 'EmpID',
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                firstName: {
                    field: 'EFirstName',
                    type: DataTypes.STRING,
                },
                lastName: {
                    field: 'ELastName',
                    type: DataTypes.STRING,
                },
                address: {
                    field: 'Address',
                    type: DataTypes.STRING,
                },
                age: {
                    field: 'Age',
                    type: DataTypes.INTEGER,
                },
                join_date: {
                    field: 'D_Join',
                    type: DataTypes.DATE,
                    defaultValue: Sequelize.fn('NOW'),
                },
                department: {
                    field: 'Dept',
                    type: DataTypes.STRING,
                },
                salary: {
                    field: 'Salary',
                    type: DataTypes.INTEGER,
                },
            },
            {
                sequelize,
                underscored: true,
                tableName: 'Employees',
                timestamps: false,
            }
        )
    }
}

export default Employee
