import { addDays, parse } from 'date-fns';
import format from 'date-fns/format';
export default class HelperCalculations{
    CalculateDACModule10(field:string):number {
        const sum = field.split('').reverse().reduce((acc, item, i) => {
            let result = Number(item) * (i % 2 ? 1 : 2);
            if (result > 9) {
                result = result - 9;
            }
            return acc + result;
        }, 0);
    
        if (sum % 10) {
            return 10 - sum % 10;
        }
    
        return 0;
    }
    
    CalculateDACModule11(field:string):number {
        let multiplier = 2;
        let sum = field.split('').reverse().reduce((acc, item) => {
            const result = Number(item) * multiplier;
            if (multiplier < 9) {
                multiplier++;
            } else {
                multiplier = 2;
            }
    
            return acc + result;
        }, 0);
    
        sum = sum % 11;
        if (sum == 11 || sum == 10 || sum == 0) {
            return 1;
        }
        
        return 11 - sum;
    }
    
    expirationFactor(days:string):string {
        if (Number(days.substring(0, 4)).toString().length < 4 ) return ''
        const baseDateBC = parse('1997-10-07', 'yyyy-MM-dd', new Date());
        return format(addDays(baseDateBC, +days), 'yyyy-MM-dd')
    }
    
}