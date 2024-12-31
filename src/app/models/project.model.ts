import { model, Schema } from 'mongoose';
import { ProjectModel, TProject } from '../interface/project.interface';


const projectSchema = new Schema<TProject>(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
        },
        photo: {
            type: String,
            required: [true, 'Project photo is required'],
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
        },
        link: {
            type: String,
            required: [true, 'Project link is required'],
        },
        technologies: {
            type: [String],
            required: [true, 'At least one technology is required'],
            validate: {
                validator: function (arr: string[]) {
                    return arr.length > 0;
                },
                message: 'Technologies array cannot be empty',
            },
        },
        time: {
            type: String,
            required: [true, 'Project time (year) is required'],
            match: [/^\d{4}$/, 'Time must be a valid year (e.g., "2023")'],
        },
    },
    {
        timestamps: true,
    }
);

export const Project = model<TProject, ProjectModel>('Project', projectSchema);
