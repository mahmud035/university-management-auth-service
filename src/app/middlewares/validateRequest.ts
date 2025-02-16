import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });

      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequest;

// NOTE: Work flow
// middleware -> validateRequest(userZodSchema) => async(req, res, next)

/**
 * It’s a higher-order function that takes a `Zod` schema.
 * Validates request data (`body`, `query`, `params`, `cookies`).
 * Calls `next()` if valid, otherwise forwards the error.
 * Improves maintainability by centralizing validation logic.
 */
