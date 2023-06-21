import express, { Request, Response, NextFunction } from 'express'
import employeeService from '../services/employeeService'

const router = express.Router()

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const employees = await employeeService.findall()
        resp.status(200).json(employees)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const payload = { ...req.body }
        console.log(payload)

        const newEmployee = await employeeService.save(payload)
        resp.status(201).json({ ...newEmployee.dataValues })
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const existingEmployee = await employeeService.findById(req.params.id)
        if (existingEmployee) {
            resp.status(200).json(existingEmployee)
        } else {
            resp.status(404).json({
                message: `department_not_found: ${req.params.id}`,
            })
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const employeeId = req.params.id
        const data = await employeeService.update(employeeId, {
            ...req.body,
        })

        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const employeeId = req.params.id
        await employeeService.deleteByPrimaryKey(employeeId)

        res.status(200).json({
            message: `department_successfully_deleted: ${employeeId}`,
        })
    } catch (err) {
        next(err)
    }
})

export default router
