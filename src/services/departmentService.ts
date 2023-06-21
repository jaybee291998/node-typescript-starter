import { db } from '../database/models'
import Department from '../database/models/department'

class DepartmentService {
    findall = async () => {
        const departments: Department[] = await Department.findAll()
        return departments
    }

    findById = async (id: number) => {
        const department: Department | null = await Department.findByPk(id)
        return department
    }

    save = async (object: any) => {
        // eslint-disable-next-line no-useless-catch
        try {
            if (!object && Object.keys(object).length == 0) {
                throw new Error('Object must contain atleast one entity')
            }
            const department = await Department.create({ ...object })
            return department
        } catch (err) {
            throw err
        }
    }

    update = async (id: number, object: any) => {
        if (!object && Object.keys(object).length == 0) {
            throw new Error(
                'Object to be updated must contain at least one property.'
            )
        }

        let existingDepartment = await this.findById(id)
        if (!existingDepartment) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await Department.update(
                { ...object },
                {
                    where: { id },
                }
            )

            existingDepartment = await this.findById(id)
            return existingDepartment
        } catch (err) {
            throw err
        }
    }

    deleteByPrimaryKey = async (id: number) => {
        const existingDepartment = await this.findById(id)
        if (!existingDepartment) {
            throw new Error('department_not_found')
        }

        // eslint-disable-next-line no-useless-catch
        try {
            await existingDepartment.destroy()
        } catch (err) {
            throw err
        }
    }
}

const departmentService: DepartmentService = new DepartmentService()
export default departmentService
