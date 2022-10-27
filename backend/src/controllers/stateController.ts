import { Request, Response } from 'express'
import { connection } from '../connection/connection'

export const stateController = {
  async createState (req: Request, res: Response) {
    const sql = 'INSERT INTO states SET ?'
    const state = {
      id: null,
      code: req.body.value,
      state: req.body.label
    }

    try {
      const response = await connection.promise().query(sql, state)
      res.send(response)
    } catch (err) {
      res.send('Could not add state')
    }
  }
}
