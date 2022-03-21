import { Request } from "express";
import Calculations from '../helper/HelperCalculations'
import Currency from '../helper/HelperCurrency'
interface Billet {
    expirationDate:string,
    barCode: string,
    amount: string
}
export class BilletController {
     run(request: Request): Billet {
    const calculations = new Calculations()
    const currency = new Currency()
    const numBillet = request.params.numBillet;
    const infBillet = {
        expirationDate:'',
        barCode: '',
        amount: ''
    };

    if(numBillet.match(/[^0-9]/g))  throw new Error("Only numbers on the entered line are accepted");
    let typeBillet = '';

    if (numBillet.length === 47) {
        typeBillet = 'B';
    } else if (numBillet.length === 48) {
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
        fieldA = numBillet.substring(0, 9);
        fieldB = numBillet.substring(10, 20);
        fieldC = numBillet.substring(21, 31);
        fieldD = numBillet.substring(33);
        digitA = Number(numBillet.substring(9, 10));
        digitB = Number(numBillet.substring(20, 21));
        digitC = Number(numBillet.substring(31, 32));
        digitG = Number(numBillet.substring(32, 33));
        barCode = numBillet.substring(0, 4) + digitG +
            fieldD + fieldA.slice(4) + fieldB + fieldC;

        infBillet.expirationDate= calculations.expirationFactor(fieldD.substring(0, 4));
        infBillet.amount  = currency.convertCurrency(fieldD.substring(8));
    } else if (typeBillet === 'C') {
        fieldA = numBillet.substring(0, 11);
        fieldB = numBillet.substring(12, 23);
        fieldC = numBillet.substring(24, 35);
        fieldD = numBillet.substring(36,47);
        digitA = Number(numBillet.substring(11,12));
        digitB = Number(numBillet.substring(23,24));
        digitC = Number(numBillet.substring(35,36));
         digitD = Number(numBillet.substring(47,48));
        digitG = Number(numBillet.substring(3,4));
        barCode = fieldA + fieldB + fieldC + fieldD;
        infBillet.expirationDate = calculations.expirationFactor(fieldD.substring(0, 4));
        infBillet.amount  =  currency.convertCurrency(barCode.substring(4,15));
    }
    
    if (digitA != calculations.CalculateDACModule10(fieldA) ||
        digitB != calculations.CalculateDACModule10(fieldB) ||
        digitC != calculations.CalculateDACModule10(fieldC) ||
        (typeBillet === 'B' && digitG != calculations.CalculateDACModule11(numBillet.substring(0, 4) +
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