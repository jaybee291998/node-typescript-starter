import { db } from '../database/models'
import Employee from '../database/models/employee'

class EmployeeService {
    findall = async () => {
        const employees: Employee[] = await db.Employee.findAll({
            attributes: [
                'id',
                'firstName',
                'lastName',
                'address',
                'age',
                'join_date',
                'department',
                'salary',
            ],
        })
        return employees
    }

    findById = async (id: string) => {
        const employee: Employee | null = await db.Employee.findByPk(id, {
            attributes: [
                'id',
                'firstName',
                'lastName',
                'address',
                'age',
                'join_date',
                'department',
                'salary',
            ],
        })
        return employee
    }

    save = async (object: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object must contain atleast one entity')
            }
            const employee = await db.Employee.create({ ...object })
            return employee
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

        let existingEmployee = await this.findById(id)
        if (!existingEmployee) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await Employee.update(
                { ...object },
                {
                    where: { id },
                }
            )

            existingEmployee = await this.findById(id)
            return existingEmployee
        } catch (err) {
            throw err
        }
    }

    deleteByPrimaryKey = async (id: string) => {
        const existingEmployee = await this.findById(id)
        if (!existingEmployee) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await existingEmployee.destroy()
        } catch (err) {
            throw err
        }
    }
}

const employeeService: EmployeeService = new EmployeeService()
export default employeeService
