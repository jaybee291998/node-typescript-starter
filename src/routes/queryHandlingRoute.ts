import express, { Request, Response, NextFunction } from 'express'
import queryHandlingService from '../services/queryHandlingService'

const router = express.Router()

router.get('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const queries = await queryHandlingService.findall()
        resp.status(200).json(queries)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const payload = { ...req.body }
        payload['subDate'] = new Date()
        console.log(payload)

        const newQuery = await queryHandlingService.save(payload)
        resp.status(201).json({ ...newQuery.dataValues })
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        const existingQuery = await queryHandlingService.findById(req.params.id)
        if (existingQuery) {
            resp.status(200).json(existingQuery)
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
        const queryId = req.params.id
        const data = await queryHandlingService.update(queryId, {
            ...req.body,
        })

        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const queryId = req.params.id
        await queryHandlingService.deleteByPrimaryKey(queryId)

        res.status(200).json({
            message: `department_successfully_deleted: ${queryId}`,
        })
    } catch (err) {
        next(err)
    }
})

export default router
