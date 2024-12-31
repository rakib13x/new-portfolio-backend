import express from 'express';
import { ProjectControllers } from '../../controllers/project.controller';
import validateProject from '../../middlewares/validateProject';
import {
    createProjectValidationSchema,
    updateProjectValidationSchema,
} from '../../validations/project.validation';

const router = express.Router();

// Create a new project
router.post(
    '/create-project',
    validateProject(createProjectValidationSchema),
    ProjectControllers.createProject
);

// Get all projects
router.get('/getAllProject', ProjectControllers.getAllProjects);

// Get a single project by ID
router.get('/:id', ProjectControllers.getProject);

// Update a project by ID
router.put(
    '/:id',
    validateProject(updateProjectValidationSchema),
    ProjectControllers.updateProjectController
);

// Delete a project by ID
router.delete('/:id', ProjectControllers.deleteProjectController);

export const ProjectRoutes = router;
