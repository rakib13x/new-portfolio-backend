import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TUser } from '../interface/user.interface';
import { UserServices } from '../services/user.service';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';


const createUser = catchAsync(async (req, res) => {
  console.log('Processing signup...');

  const userData: Partial<TUser> = {
    ...req.body,
    role: req.body.role || 'user',
  };

  console.log('User data to create:', userData);

  try {
    const result = await UserServices.createUserIntoDB(
      userData as TUser,

    );
    const { password, ...userWithoutPassword } = result.toObject();

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
      data: userWithoutPassword,
    });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while creating user.',
    });
  }
});


export const UserControllers = {
  createUser,
};
