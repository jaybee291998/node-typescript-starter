import express, { Request, Response } from 'express'

const router = express.Router()
const people = [
    { id: 1, name: 'clark kent', age: 35 },
    { id: 2, name: 'peter parker', age: 21 },
    { id: 3, name: 'juan cruz', age: 28 },
]

router.get('/', (req: Request, resp: Response) => {
    resp.status(200).json(people)
})

router.get('/:id', (req: Request, resp: Response) => {
    const person = people.find((p) => p.id === parseInt(req.params.id))
    if (person) {
        resp.status(201).json(person)
    } else {
        resp.status(404)
    }
})

router.post('/', (req: Request, resp: Response) => {
    const payload = { ...req.body }
    people.push(payload)
    resp.status(201).json({ ...payload })
})

export default router
