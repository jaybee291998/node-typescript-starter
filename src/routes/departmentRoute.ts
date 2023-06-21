import express, { Request, Response, NextFunction } from 'express'
import departmentService from '../services/departmentService'

const router = express.Router()

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const departments = await departmentService.findall()
        resp.status(200).json(departments)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const payload = { ...req.body }
        const newDepartment = await departmentService.save(payload)
        resp.status(201).json({ ...newDepartment.dataValues })
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const existingDepartment = await departmentService.findById(
            parseInt(req.params.id)
        )
        if (existingDepartment) {
            resp.status(200).json(existingDepartment)
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
        const departmentId = parseInt(req.params.id)
        const data = await departmentService.update(departmentId, {
            ...req.body,
        })

        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const departmentId = parseInt(req.params.id)
        await departmentService.deleteByPrimaryKey(departmentId)

        res.status(200).json({
            message: `department_successfully_deleted: ${departmentId}`,
        })
    } catch (err) {
        next(err)
    }
})

export default router
