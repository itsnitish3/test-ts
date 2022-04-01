import { User } from '../models';
import _ from 'lodash';

const addObject = async (obj: any) => {
  try {
    const objectModel = new User(obj);
    const data = await objectModel.save();
    return data;
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  const data = await User.find().lean().exec();
  return data;
};

const getObjectById = async (objectId: any, selectFrom: any) => {
  try {
    const data = await User.findById(objectId)
      .select(_.isEmpty(selectFrom) ? {} : selectFrom)
      .exec();
    return data;
  } catch (error) {
    return null;
  }
};

const getObjectByQuery = async (query: any, selectFrom: any) => {
  try {
    const data = await User.findOne(query)
      .select(_.isEmpty(selectFrom) ? {} : selectFrom)
      .exec();
    return data;
  } catch (error) {
    return null;
  }
};

const updateObject = async (objectId: any, updatedObject: any) => {
  try {
    let filter = { _id: objectId };
    let data = await User.findOneAndUpdate(filter, updatedObject, {
      new: true,
    });
    return data;
  } catch (error) {
    return null;
  }
};

const deleteObjectById = async (objectId: any) => {
  try {
    const data = await User.findByIdAndRemove(objectId);
    return data;
  } catch (error) {
    return null;
  }
};

const getAllObjects = async (filters: any) => {
  try {
    let query = filters.query ? filters.query : {};
    let selectFrom = filters.selectFrom ? filters.selectFrom : {};
    let sortBy = filters.sortBy ? filters.sortBy : { _id: -1 };
    let pageNum = filters.pageNum ? filters.pageNum : 1;
    let pageSize = filters.pageSize ? filters.pageSize : 50;
    const data = await User.find(query)
      .select(selectFrom)
      .sort(sortBy)
      .skip((pageNum - 1) * pageSize)
      .limit(parseInt(pageSize))
      .lean()
      .exec();
    return data;
  } catch (error) {
    return null;
  }
};

const getAllObjectsCount = async (filters: any) => {
  try {
    let query = filters.query ? filters.query : {};
    const data = await User.count(query);
    return data;
  } catch (error) {
    return null;
  }
};

const aggregate = async (steps: any) => {
  try {
    const data = await User.aggregate(steps);
    return data;
  } catch (error) {
    return null;
  }
};
const userServices = {
  addObject,
  getAll,
  getObjectById,
  getObjectByQuery,
  updateObject,
  deleteObjectById,
  getAllObjects,
  getAllObjectsCount,
  aggregate,
};
export default userServices;
