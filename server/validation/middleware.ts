import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export interface FormattedValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationFailureResponse {
  success: false;
  message: string;
  errors: FormattedValidationError[];
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: FormattedValidationError[] };

/**
 * Transforms ZodError into a clean, developer & client-friendly array of errors.
 */
export function formatZodError(error: ZodError): FormattedValidationError[] {
  const issues = (error as any).issues || (error as any).errors || [];
  return issues.map((err: any) => ({
    field: Array.isArray(err.path) && err.path.length > 0 ? err.path.join('.') : 'payload',
    message: err.message || 'Invalid input value.',
    code: err.code,
  }));
}

/**
 * Standalone validation helper: Validates any raw data object against a Zod schema.
 * Returns either `{ success: true, data }` with clean sanitized/coerced data,
 * or `{ success: false, errors }` with formatted field errors.
 */
export function validatePayload<T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: formatZodError(result.error),
    };
  }
  return {
    success: true,
    data: result.data,
  };
}

/**
 * Express Middleware factory that validates `req.body` against a Zod schema.
 * If validation fails, it halts the pipeline with HTTP 400 and returns structured errors.
 * If validation passes, `req.body` is replaced with the sanitized/coerced data.
 */
export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validation = validatePayload(schema, req.body);

    if (validation.success === false) {
      res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify your submitted fields.',
        errors: validation.errors,
      } as ValidationFailureResponse);
      return;
    }

    // Assign validated and sanitized data back to req.body
    req.body = validation.data;
    next();
  };
}

/**
 * Express Middleware factory that validates `req.query` parameters against a Zod schema.
 */
export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validation = validatePayload(schema, req.query);

    if (validation.success === false) {
      res.status(400).json({
        success: false,
        message: 'Invalid query parameters provided.',
        errors: validation.errors,
      } as ValidationFailureResponse);
      return;
    }

    req.query = validation.data as any;
    next();
  };
}

/**
 * Express Middleware factory that validates `req.params` against a Zod schema.
 */
export function validateParams<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validation = validatePayload(schema, req.params);

    if (validation.success === false) {
      res.status(400).json({
        success: false,
        message: 'Invalid URL route parameters.',
        errors: validation.errors,
      } as ValidationFailureResponse);
      return;
    }

    req.params = validation.data as any;
    next();
  };
}
