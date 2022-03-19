import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'express-async-errors';
import { errorHandling } from './middlewares/MiddlewaresErrors'
import cors from 'cors';
import { routerBillet } from './routes/routesBillet';
const app = express();
app.use(express.json());
app.use(cors())
app.use([ routerBillet]);
app.use(errorHandling);

export { app }