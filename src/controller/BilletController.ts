import { Request } from "express";
import Calculations from '../helper/HelperCalculations'
interface Billet {
    expirationDate:string,
    barCode: string,
    amount: string
}
export class BilletController {
    async run(request: Request): Promise<Billet> {
    const calculations = new Calculations()
    const numBillet = request.params.numBillet;
    const infBillet = {
        expirationDate:'',
        barCode: '',
        amount: ''
    };

    const line = numBillet.replace(/[^0-9]/g, '');
    let typeBillet = '';

    if (line.length === 47) {
        typeBillet = 'B';
    } else if (line.length === 48) {
        typeBillet = 'C';
    }

    if (typeBillet !== 'B' && typeBillet !== 'C') {
        throw new Error("invalid typed line");
    }

    let fieldA = '';
    let fieldB = '';
    let fieldC = '';
    let fieldD = '';
    let digitA = 0;
    let digitB = 0;
    let digitC = 0;
    let digitD = 0;
    let digitG = 0;
    let barCode = '';

    if (typeBillet === 'B') {
        fieldA = line.substring(0, 9);
        fieldB = line.substring(10, 10);
        fieldC = line.substring(21, 10);
        fieldD = line.substring(33);
        digitA = Number(line.substring(9, 1));
        digitB = Number(line.substring(20, 1));
        digitC = Number(line.substring(31, 1));
        digitG = Number(line.substring(32, 1));
        barCode = line.substring(0, 4) + digitG +
            fieldD + fieldA.slice(4) + fieldB + fieldC;

        if (Number(barCode.substring(4, 11)) != 0) {
            infBillet.expirationDate= calculations.expirationFactor(fieldD.substring(0, 4));
        }
        if (fieldD.substring(4, 8) + '.' + fieldD.substring(9)) {
            infBillet.amount = 'R$ ' + +fieldD.substring(4, 8) + ',' + fieldD.substring(12);
        }
    } else if (typeBillet === 'C') {
        fieldA = line.substring(0, 11);
        fieldB = line.substring(12, 11);
        fieldC = line.substring(24, 11);
        fieldD = line.substring(36, 11);
        digitA = Number(line.substring(11, 1));
        digitB = Number(line.substring(23, 1));
        digitC = Number(line.substring(35, 1));
         digitD = Number(line.substring(47, 1));
        digitG = Number(line.substring(3, 1));
        barCode = fieldA + fieldB + fieldC + fieldD;

        if (Number(fieldD.substring(0, 4)) != 0) {
            infBillet.expirationDate = calculations.expirationFactor(fieldD.substring(0, 4));
        }
        if (fieldD.substring(4, 8) + '.' + fieldD.substring(9)) {
            infBillet.amount  = 'R$ ' + +barCode.substring(4, 9) + ',' + barCode.substring(13, 2);
        }
    }
    
    if (digitA != calculations.CalculateDACModule10(fieldA) ||
        digitB != calculations.CalculateDACModule10(fieldB) ||
        digitC != calculations.CalculateDACModule10(fieldC) ||
        (typeBillet === 'B' && digitG != calculations.CalculateDACModule11(line.substring(0, 4) +
            fieldD + fieldA.slice(4) + fieldB + fieldC))) {
        throw new Error("Invalid billet number.");
        
    }
    if (typeBillet === 'C' && (digitD != calculations.CalculateDACModule10(fieldD) ||
        (['6', '7'].indexOf(fieldA.substring(2, 1)) != -1 && digitG != calculations.CalculateDACModule10(fieldA.substring(0, 3) + fieldA.slice(4) + fieldB + fieldC + fieldD))) ||
        (['8', '9'].indexOf(fieldA.substring(2, 1)) != -1 && digitG != calculations.CalculateDACModule11(fieldA.substring(0, 3) + fieldA.slice(4) + fieldB + fieldC + fieldD))) {
            throw new Error("Invalid billet number.");
    }

    infBillet.barCode = barCode;

   return infBillet
    }
}