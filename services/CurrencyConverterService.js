
class CurrencyConverterService {
    constructor(data) {
        this.data = data;
    }

    convert(from,to,amount) {
        if(this.data.find(el => el.id === from)===undefined) {
            return {
                from: from,
                to: to,
                amount: amount,
                value: amount/this.data.find(el => el.id === to).quotes[from].price
            }
        }
        else if(this.data.find(el => el.id === to)!==undefined){
            return {
                from: from,
                to: to,
                amount: amount,
                value: this.data.find(el => el.id === from).quotes["USD"].price *amount/this.data.find(el => el.id === to).quotes["USD"].price
            }
        }
        else
            {
                return {
                    from: from,
                    to: to,
                    amount: amount,
                    value: this.data.find(el => el.id === from).quotes[to].price * amount
                }
            }
        }



}
module.exports = CurrencyConverterService;