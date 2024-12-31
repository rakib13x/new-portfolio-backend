import AppError from '../errors/AppError';
import { TUser } from '../interface/user.interface';
import { User } from '../models/user.model';


const createUserIntoDB = async (
  user: TUser,
) => {
  const userData = {
    ...user,
  };

  const result = await User.create(userData);
  return result;
};


export const UserServices = {
  createUserIntoDB,
};
