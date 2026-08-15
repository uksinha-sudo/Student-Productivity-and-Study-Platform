import type { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=middleware.d.ts.map