import { NextFunction, Request, Response } from "express"



export function errorHandling(err: Error, request: Request, response: Response, next: NextFunction): Response {
    if (err instanceof Error) {
        return response.status(400).json(
            {
                message: err.message,
                status: "error"
            }
        );
    }
    next;
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
    
}