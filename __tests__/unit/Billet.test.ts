import Calculations from '../../src/helper/HelperCalculations'
import Currency from '../../src/helper/HelperCurrency'
const calculations = new Calculations()
const currency = new Currency()
const lineValid47 = '00190500954014481606906809350314337370000000100'
const lineValid48 = "846700000017435900240209024050002435842210108119";
   
describe('expirationFactor', () => {
    
  it('billet data of typeable line with 47 digits', async()=>{
    const expirationDate = lineValid47.substring(33);
    const res = calculations.expirationFactor(expirationDate.substring(0, 4));
    expect(res).toEqual('2007-12-31');
  })
  it('billet data of typeable line with 48 digits', async()=>{
    const barcode = lineValid48.substring(0,47);
    const expirationDate = barcode.substring(36,47);
    const res = calculations.expirationFactor(expirationDate.substring(0,4));
    
    expect(res).toEqual('2020-10-28');
  })
 
});
describe('CalculateDACModule10', () => {

it('billet data of typeable line with 47 digits', async()=>{
  const field = lineValid47.substring(0, 9);
  const res = calculations.CalculateDACModule10(field);
  expect(res).toEqual(5);
})
it('billet data of typeable line with 48 digits', async()=>{
  const field = lineValid48.substring(0, 11);
  const res = calculations.CalculateDACModule10(field);
  expect(res).toEqual(7);
})

});
describe('CalculateDACModule11', () => {

  it('billet data of typeable line with 47 digits', async()=>{
    const res = calculations.CalculateDACModule11(lineValid47.substring(0, 4) +
    lineValid47.substring(33) + lineValid47.substring(0, 9).slice(4)
    + lineValid47.substring(10, 20) + lineValid47.substring(21, 31))
    expect(res).toEqual(3);
  })
  it('billet data of typeable line with 48 digits', async()=>{

    const res = calculations.CalculateDACModule11(lineValid48.substring(0, 4) +
    lineValid48.substring(36,47) + lineValid48.substring(0, 11).slice(4) 
    + lineValid48.substring(12, 23) + lineValid48.substring(24, 35));
    expect(res).toEqual(2);
  })
  
  });

  describe('convertCurrency', () => {

    it('billet data of typeable line with 47 digits', async()=>{
      const fieldD = lineValid47.substring(33);
      const res = currency.convertCurrency(fieldD.substring(8))
      expect(res).toEqual("1.00");
    })
    it('billet data of typeable line with 48 digits', async()=>{
      const barcode = '84670000001435900240200240500024384221010811';
      const res = currency.convertCurrency(barcode.substring(4,15))
      expect(res).toEqual("143.59");
    })
    
    });