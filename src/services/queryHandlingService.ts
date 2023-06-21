import { db } from '../database/models'
import QueryHandling from '../database/models/queryHandling'
import employeeService from './employeeService'

class QueryHandlingService {
    findall = async () => {
        const queries: QueryHandling[] = await db.QueryHandling.findAll()
        return queries
    }

    findById = async (id: string) => {
        const query: QueryHandling | null = await db.QueryHandling.findByPk(id)
        return query
    }

    save = async (object: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object must contain atleast one entity')
            }
            if (!object.hasOwnProperty('employeeId')) {
                throw new Error('must provide an employee id')
            }
            const providedEmployeeId = object['employeeId']
            const existingEmployee = await employeeService.findById(
                providedEmployeeId
            )
            console.log(providedEmployeeId)
            console.log(existingEmployee)

            if (!existingEmployee) {
                throw new Error(
                    `employee with id=${providedEmployeeId} does not exist`
                )
            }
            const query = await db.QueryHandling.create({ ...object })
            return query
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

        let existingQuery = await this.findById(id)
        if (!existingQuery) {
            throw new Error('query not found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await db.QueryHandling.update(
                { ...object },
                {
                    where: { id },
                }
            )

            existingQuery = await this.findById(id)
            return existingQuery
        } catch (err) {
            throw err
        }
    }

    deleteByPrimaryKey = async (id: string) => {
        const existingQuery = await this.findById(id)
        if (!existingQuery) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await existingQuery.destroy()
        } catch (err) {
            throw err
        }
    }
}

const queryHandlingService: QueryHandlingService = new QueryHandlingService()
export default queryHandlingService
