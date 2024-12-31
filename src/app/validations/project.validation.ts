import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters long!' }),
  photo: z
    .string()
    .url({ message: 'Photo must be a valid URL!' })
    .or(z.string().min(1, { message: 'Photo path is required!' })),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long!' }),
  technologies: z
    .array(z.string().min(2, { message: 'Each technology must be at least 2 characters long!' }))
    .min(1, { message: 'At least one technology is required!' }),
  time: z
    .string()
    .regex(/^\d{4}$/, { message: 'Time must be a valid year (e.g., "2023")!' }),
});

export const updateProjectValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters long!' })
    .optional(),
  photo: z
    .string()
    .url({ message: 'Photo must be a valid URL!' })
    .or(z.string().min(1, { message: 'Photo path is required!' }))
    .optional(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long!' })
    .optional(),
  technologies: z
    .array(z.string().min(2, { message: 'Each technology must be at least 2 characters long!' }))
    .min(1, { message: 'At least one technology is required!' })
    .optional(),
  time: z
    .string()
    .regex(/^\d{4}$/, { message: 'Time must be a valid year (e.g., "2023")!' })
    .optional(),
});
