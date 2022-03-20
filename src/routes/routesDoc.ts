import swaggerUi from  'swagger-ui-express';
import swaggerFile from  '../swagger.json';
import { Router } from "express";
const routerDoc = Router()
routerDoc.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export { routerDoc }