import {app} from '../src/app';
import request from 'supertest'
describe('GET BILLET', () => {
    const lineValid47 = '00190500954014481606906809350314337370000000100'
    const reslineValid47 = {
        expirationDate: "2007-12-31",
        barCode: "00193373700000001000500940144816060680935031",
        amount: "1.00"
    }
    const lineValid48 = "21290001192110001210904475617405975870000002000";
    const reslineValid48 = {
            expirationDate: "2018-07-16",
            barCode: "21299758700000020000001121100012100447561740",
            amount: "20.00"
    }
    const lineInvalid = '00190500954014481606906809350314337370000000100000'
  it('return status 200 and billet data of typeable line with 47 digits', async()=>{
    const res = await request(app).get(`/boleto/${lineValid47}`).send()
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(reslineValid47);

  })
  it('return status 200 and billet data of typeable line with 48 digits', async()=>{
    const res = await request(app).get(`/boleto/${lineValid48}`).send()
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(reslineValid48);

  })
  it('return status 400 invalid typeable line', async()=>{
    const res = await request(app).get(`/boleto/${lineInvalid}`).send()
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
        message: "invalid typed line",
    });

  })
 
});