import * as P from "./paymentType"



type currency = 'EUR' | 'KRW'


export const handlePayment = (currency : currency, amount : number) => {
    window.IMP?.init('iamport')

    if(currency === 'EUR'){
        amount =  Math.round(1433.8 * amount)
    }

    const data: P.RequestPayParams = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: amount, 
      buyer_tel: '00-000-0000',
    }
    const callback = (response: P.RequestPayResponse) => {
      const { success, merchant_uid, error_msg, imp_uid, error_code } = response
      if (success) {
        console.log(response)
      } else {
        console.log(response)
      }
    }
    window.IMP?.request_pay(data, callback)
  }