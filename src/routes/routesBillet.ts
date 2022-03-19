
import { Router } from "express";
import { billetController } from "../controller";
const routerBillet = Router()
routerBillet.get('/boleto/:numBillet',async (request,response) => {
    const billet =  billetController.run(request)
    return response.json(billet)
    });


    
export { routerBillet }