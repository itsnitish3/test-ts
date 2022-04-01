import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services';
import User from '../models/userModel';

// class UserHandler {
//     static async dis(req: Request, res: Response, next: NextFunction) {
//         res.send('Hello desss!');
//     }
// }

const UserHandler = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await UserService.addObject(data);
      const response = {
        status: 200,
        message: 'success',
        data: result,
      };
      return res.send(response);
    } catch (error) {
      const response = {
        status: 400,
        message: 'failure',
        data: null,
      };
      return res.send(response);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await UserService.getAll();
      const response = {
        status: 200,
        message: 'success',
        data: result,
      };
      return res.send(response);
    } catch (error) {
      const response = {
        status: 400,
        message: 'failure',
        data: null,
      };
      return res.send(response);
    }
  },
  getObjectById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objectId = req.params.id;
      const selectFrom = req.query.selectFrom || {};
      const result = await UserService.getObjectById(objectId, selectFrom);
      const response = {
        status: 200,
        message: 'success',
        data: result,
      };
      return res.send(response);
    } catch (error) {
      const response = {
        status: 400,
        message: 'failure',
        data: null,
      };
      return res.send(response);
    }
  },
  updateObject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objectId = req.params.id;
      const updatedObject = req.body;
      const result = UserService.updateObject(objectId, updatedObject);
      const response = {
        status: 200,
        message: 'success',
        data: result,
      };
      return res.send(response);
    } catch (error) {
      const response = {
        status: 400,
        message: 'failure',
        data: null,
      };
      return res.send(response);
    }
  },
  deleteObject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objectId = req.params.id;
      const result = UserService.deleteObjectById(objectId);
      const response = {
        status: 200,
        message: 'success',
        data: result,
      };
      return res.send(response);
    } catch (error) {
      const response = {
        status: 400,
        message: 'failure',
        data: null,
      };
      return res.send(response);
    }
  },
};

export default UserHandler;
// console.log(UserHandler.getAll())
