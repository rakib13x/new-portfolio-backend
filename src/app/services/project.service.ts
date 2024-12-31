import { TProject } from '../interface/project.interface';
import { Project } from '../models/project.model';


const createProjectIntoDB = async (project: TProject): Promise<TProject> => {
    const projectData = { ...project };
    const result = await Project.create(projectData);
    return result;
};

const getAllProjects = async (): Promise<TProject[]> => {
    return await Project.find();
};

const getProjectById = async (id: string): Promise<TProject | null> => {
    return await Project.findById(id);
};

const updateProject = async (
    id: string,
    payload: Partial<TProject>
): Promise<TProject | null> => {
    return await Project.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProject = async (id: string): Promise<TProject | null> => {
    return await Project.findByIdAndDelete(id);
};

export const ProjectServices = {
    createProjectIntoDB,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
