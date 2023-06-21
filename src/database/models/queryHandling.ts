import { Model, Sequelize, DataTypes } from 'sequelize'
import { QueryAttributes } from '../attributes'

class QueryHandling extends Model implements QueryAttributes {
    public id!: string
    public subDate!: Date
    public customerId!: string
    public employeeId!: string
    public resDate!: Date
    public status!: string
    public feedback!: number
    public queryText!: string
    public queryResponse!: string

    static initModel(sequelize: Sequelize): void {
        QueryHandling.init(
            {
                id: {
                    field: 'QID',
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                subDate: {
                    field: 'Sub_Date',
                    type: DataTypes.DATE,
                },
                customerId: {
                    field: 'Cust_ID',
                    type: DataTypes.STRING,
                },
                employeeId: {
                    field: 'EmpID',
                    type: DataTypes.STRING,
                },
                resDate: {
                    field: 'Res_Date',
                    type: DataTypes.DATE,
                },
                status: {
                    field: 'Status',
                    type: DataTypes.STRING,
                },
                feedback: {
                    field: 'Feedback',
                    type: DataTypes.INTEGER,
                },
                queryText: {
                    field: 'Query_Text',
                    type: DataTypes.STRING,
                },
                queryResponse: {
                    field: 'Query_Response',
                    type: DataTypes.STRING,
                },
            },
            {
                sequelize,
                underscored: true,
                tableName: 'QueryHandling',
                timestamps: false,
            }
        )
    }
}

export default QueryHandling
