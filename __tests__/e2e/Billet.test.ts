import {app} from '../../src/app';
import request from 'supertest'

describe('GET BILLET', () => {
    const lineValid47 = '00190500954014481606906809350314337370000000100'
    const reslineValid47 = {
        expirationDate: "2007-12-31",
        barCode: "00193373700000001000500940144816060680935031",
        amount: "1.00"
    }
    const lineValid48 = "846700000017435900240209024050002435842210108119";
    const reslineValid48 = {
      expirationDate: "2020-10-28",
      barCode: "84670000001435900240200240500024384221010811",
      amount: "143.59"
  }
    const lineInvalid = '00190500954014481606906809350314337370000000100000'
    const lineInvalid2 = '0019050095401448160690680935031a4337370000000100000'
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
  it('return status 400 invalid typed line if it has characters other than numbers', async()=>{
    const res = await request(app).get(`/boleto/${lineInvalid2}`).send()
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
        message: "Only numbers on the entered line are accepted",
    });

  })
});