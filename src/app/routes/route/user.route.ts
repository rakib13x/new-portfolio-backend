import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { UserControllers } from '../../controllers/user.controller';
import validateSignUp from '../../middlewares/validateSignUp';
import { createUserValidationSchema } from '../../validations/user.validation';

const router = express.Router();

router.post(
  '/',
  validateSignUp(createUserValidationSchema),
  UserControllers.createUser,
);



export const UserRoutes = router;
