export default class HelperCurrency{
    convertCurrency(value:string):string{
       const currencyRaw = parseFloat(value).toString()

        const currency = currencyRaw.substring(0, currencyRaw.length -2) + "." + currencyRaw.substring(currencyRaw.length -2, currencyRaw.length);


        return currency
    
}
    
}