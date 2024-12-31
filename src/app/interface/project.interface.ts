import { Model } from 'mongoose';

export interface TProject {
    name: string;
    photo: string;
    description: string;
    technologies: string[];
    time: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProjectModel extends Model<TProject> {
}
