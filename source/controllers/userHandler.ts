import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services'
import User from '../models/userModel'

// class UserHandler {
//     static async dis(req: Request, res: Response, next: NextFunction) {
//         res.send('Hello desss!');
//     }
// }


const UserHandler = {
    create: (req: Request, res: Response, next: NextFunction): void => {
        const data = req.body;

        UserService.addObject(data, (err: any, savedObj: any) => {
            if (err) {
                // next(err);
                return res.status(500).send(err);
            } else {
                return res.send(savedObj);
            }
        });
    },
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        const data = await UserService.getAll()
        res.send(data);
    },
    getObjectById: (req: Request, res: Response, next: NextFunction): void => {
        const objectId = req.params.id;
        const selectFrom = req.query.selectFrom||{};

        UserService.getObjectById(objectId, selectFrom, (err: any, object: any) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send(object);
            }
        });
    },
    updateObject: (req: Request, res: Response, next: NextFunction): void => {
        const objectId = req.params.id;
        const updatedObject = req.body;

        UserService.updateObject(objectId, updatedObject, (err: any, object: any) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send(object);
            }
        });
    },
    deleteObject: (req: Request, res: Response, next: NextFunction): void => {
        const objectId = req.params.id;

        UserService.deleteObjectById(objectId, (err: any, object: any) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send(object);
            }
        });
    }
}

export default UserHandler
// console.log(UserHandler.getAll())