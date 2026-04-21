import { type Request, type Response, type NextFunction } from "express";
declare const RegisterValidation: (((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
declare const LoginValidation: (((req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined) | import("express-validator").ValidationChain)[];
export { RegisterValidation, LoginValidation };
//# sourceMappingURL=auth.validation.d.ts.map