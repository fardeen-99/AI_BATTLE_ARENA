import { type Request, type Response } from "express";
interface RegisterBody {
    username: string;
    email: string;
    password: string;
}
type LoginBody = Omit<RegisterBody, "email">;
export declare const registerUser: (req: Request<{}, {}, RegisterBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginUser: (req: Request<{}, {}, LoginBody>, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logoutUser: (req: Request, res: Response) => Promise<void>;
export declare const getme: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.controller.d.ts.map