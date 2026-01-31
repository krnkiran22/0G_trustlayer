import { Request, Response, NextFunction } from 'express';
import {
  validateContractAddress,
  validateNetwork,
  sanitizeInput,
} from '../utils/validators';
import { ValidationError } from '../utils/errors';

export function validateAnalysisRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { address, network } = req.body;

    // Validate address
    const addressValidation = validateContractAddress(address);
    if (!addressValidation.valid) {
      throw new ValidationError(addressValidation.error!);
    }

    // Validate network
    const networkValidation = validateNetwork(network);
    if (!networkValidation.valid) {
      throw new ValidationError(networkValidation.error!);
    }

    // Sanitize inputs
    req.body.address = sanitizeInput(address);
    req.body.network = sanitizeInput(network);

    next();
  } catch (error) {
    next(error);
  }
}

export function validateQueryParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit } = req.query;

    if (limit) {
      const limitNum = parseInt(limit as string);
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        throw new ValidationError('Limit must be between 1 and 100');
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}
