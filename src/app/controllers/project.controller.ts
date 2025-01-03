import httpStatus from 'http-status';
import { ProjectServices } from '../services/project.service';

import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { TProject } from '../interface/project.interface';

const createProject = catchAsync(async (req, res) => {
    console.log('Processing project creation...');

    // Extract fields from req.body
    const { name, description, link, technologies, time } = req.body;

    // Handle the photo file
    let photoUrl: string;
    if (req.file && req.file.path) {
        photoUrl = req.file.path; // Cloudinary URL
    } else {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Project photo is required!',
        });
    }

    // Parse technologies array
    const technologiesArray = Array.isArray(technologies)
        ? technologies
        : typeof technologies === 'string'
            ? technologies.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech.length > 0)
            : [];

    if (technologiesArray.length === 0) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'At least one technology is required!',
        });
    }

    // Ensure 'link' is provided
    if (!link || typeof link !== 'string' || link.trim() === '') {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Project link is required!',
        });
    }

    const projectData: TProject = {
        name,
        photo: photoUrl,
        description,
        link: link.trim(),
        technologies: technologiesArray,
        time,
        createdAt: undefined,
        updatedAt: undefined
    };

    console.log('Project data to create:', projectData);

    try {
        const result = await ProjectServices.createProjectIntoDB(projectData);
        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Project created successfully',
            data: result,
        });
    } catch (err) {
        console.error('Error creating project:', err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error while creating project.',
        });
    }
});
const getAllProjects = catchAsync(async (req, res) => {
    const projects = await ProjectServices.getAllProjects();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Projects retrieved successfully',
        data: projects,
    });
});

const getProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const project = await ProjectServices.getProjectById(id);

    if (!project) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Project not found',
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project retrieved successfully',
        data: project,
    });
});

const updateProjectController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updateData: Partial<TProject> = { ...req.body };

    const updatedProject = await ProjectServices.updateProject(id, updateData);

    if (!updatedProject) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Project not found',
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project updated successfully',
        data: updatedProject,
    });
});

const deleteProjectController = catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProject = await ProjectServices.deleteProject(id);

    if (!deletedProject) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Project not found',
        });
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project deleted successfully',
        data: deletedProject,
    });
});

export const ProjectControllers = {
    createProject,
    getAllProjects,
    getProject,
    updateProjectController,
    deleteProjectController,
};
