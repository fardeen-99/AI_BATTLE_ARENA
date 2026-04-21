import { type Response, type Request, type NextFunction } from "express";
declare const ErrorMiddleware: (err: any, req: Request, res: Response, next: NextFunction) => Promise<void>;
export default ErrorMiddleware;
//# sourceMappingURL=Error.middleware.d.ts.map