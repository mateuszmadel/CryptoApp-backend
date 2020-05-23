
class CurrencyConverterService {
    constructor(data) {
        this.data = data;
    }
    listOfCurrencies(){
        let list=this.data.filter((item) => item.rank <= 100).sort((a, b) => a.rank < b.rank ? -1 : 1)
        list=list.map(({id, name}) => ({id, name}))
        list.unshift({id:'USD', name:'Dolar amerykański' },{id:'PLN',name:'Polski złoty'},{id:'EUR',name:'Euro'},{id:'GBP',name:'Funt brytyjski'})
        return list;
    }
    convert(from,to,amount) {
        //curr
        if(this.data.find(el => el.id === from)===undefined &&this.data.find(el => el.id === to)===undefined){
            return {
                from: from,
                to: to,
                amount: amount,
                value: this.data.find(el => el.id === 'btc-bitcoin').quotes[to].price/this.data.find(el => el.id === 'btc-bitcoin').quotes[from].price * amount
            }
        }
        //curr to crypto
        else if(this.data.find(el => el.id === from)===undefined) {
            return {
                from: from,
                to: to,
                amount: amount,
                value: amount/this.data.find(el => el.id === to).quotes[from].price
            }
        }
            //crypto to curr
        else if(this.data.find(el => el.id === to)===undefined)
            {
                return {
                    from: from,
                    to: to,
                    amount: amount,
                    value: this.data.find(el => el.id === from).quotes[to].price * amount
                }
            }
        //crypto to crypto
        else{
            return {
                from: from,
                to: to,
                amount: amount,
                value: this.data.find(el => el.id === from).quotes["USD"].price *amount/this.data.find(el => el.id === to).quotes["USD"].price
            }
        }

        }



}
module.exports = CurrencyConverterService;