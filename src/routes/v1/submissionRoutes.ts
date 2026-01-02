import express from 'express';

import { addSubmission } from '../../controllers/sunmissionController.js';
import { validateCreateSubmissionDto } from '../../validators/zodValidators.js';
import { createSubmissionZodSchema } from '../../dtos/CreateSubmissionDto.js';


const  submissionRouter = express.Router();

submissionRouter.post('/',validateCreateSubmissionDto(createSubmissionZodSchema), addSubmission);

export default submissionRouter;