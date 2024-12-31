import httpStatus from 'http-status';

import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { AuthServices } from '../services/auth.service';

const loginUser = catchAsync(async (req, res) => {
    const { user, accessToken } = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token: accessToken,
    });
});

export const AuthControllers = {
    loginUser,
};
