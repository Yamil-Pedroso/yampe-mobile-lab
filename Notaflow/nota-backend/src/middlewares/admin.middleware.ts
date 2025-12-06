import { Request, Response, NextFunction } from "express";

export const isAdminMiddleware = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only endpoint" });
  }

  next();
};
