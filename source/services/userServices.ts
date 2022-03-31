import { User } from '../models'
import _ from 'lodash';

const addObject = (obj: any, next: any) => {
    const objectModel = new User(obj);
    console.log(objectModel);
    objectModel.save((err: any, savedObj: any) => {
        if (err) {
            return next(err);
        } else {
            return next(null, savedObj);
        }
    });
}
const getAll = async () => {
    const data = await User.find().lean().exec();
    return data
}
const getObjectById = (objectId: any, selectFrom: any, next: any) => {
    User.findById(objectId)
        .select(_.isEmpty(selectFrom) ? {} : selectFrom)
        .exec((err, object) => {
            if (err) {
                return next(err);
            } else {
                return next(null, object);
            }
        });
}

const getObjectByQuery = (query: any, selectFrom: any, next: any) => {
    User.findOne(query)
        .select(_.isEmpty(selectFrom) ? {} : selectFrom)
        .exec((err, object) => {
            if (err) {
                return next(err);
            } else {
                return next(null, object);
            }
        });
}

const updateObject = (objectId: any, updatedObject: any, next: any) => {
    User.findById(objectId, (err: any, object: any) => {
        if (err) {
            return next(err);
        } else {
            for (let prop in updatedObject) {
                object[prop] = updatedObject[prop];
            }
            object.save((err: any, savedObj: any) => {
                if (err) {
                    return next(err);
                } else {
                    return next(null, savedObj);
                }
            });
        }
    });
}

const deleteObjectById = (objectId: any, next: any) => {
    User.findByIdAndRemove(objectId, (err: any, object: any) => {
        if (err) {
            next(err);
        } else {
            next(null, object);
        }
    });
}

const getAllObjects = (filters: any, next: any) => {
    let query = filters.query ? filters.query : {};
    let selectFrom = filters.selectFrom ? filters.selectFrom : {};
    let sortBy = filters.sortBy ? filters.sortBy : { _id: -1 };
    let pageNum = filters.pageNum ? filters.pageNum : 1;
    let pageSize = filters.pageSize ? filters.pageSize : 50;
    User.find(query)
        .select(selectFrom)
        .sort(sortBy)
        .skip((pageNum - 1) * pageSize)
        .limit(parseInt(pageSize))
        .lean()
        .exec((err, objects) => {
            if (err) {
                console.log(err);
                next(err);
            }
            next(null, objects);
        });
}

const getAllObjectsCount = (filters: any, next: any) => {
    let query = filters.query ? filters.query : {};
    User.count(query, (err, objects) => {
        if (err) {
            next(err);
        } else {
            next(null, objects);
        }
    });
}

const aggregate = (steps: any, next: any) => {
    User.aggregate(steps, (err: any, objects: any) => {
        if (err) {
            next(err);
        } else {
            next(null, objects);
        }
    });
}
const userServices = {
    addObject,
    getAll,
    getObjectById,
    getObjectByQuery,
    updateObject,
    deleteObjectById,
    getAllObjects,
    getAllObjectsCount,
    aggregate
}
export default userServices