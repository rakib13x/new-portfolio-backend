import { Model } from 'mongoose';

export interface TProject {
    name: string;
    photo: string;
    description: string;
    link?: string;
    technologies: string[];
    time: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProjectModel extends Model<TProject> {
}
