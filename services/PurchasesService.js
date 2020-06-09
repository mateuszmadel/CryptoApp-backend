class PurchasesService {
    constructor(purchaseModel) {
        this.purchaseModel = purchaseModel;
    }
    async add(userInput,user) {
            const record = await this.purchaseModel.create({
                user:user.username,
                ...userInput

            });
            if (!record) {
                throw new Error('err');
            }
            return record.toObject();
    }
    async getAll(user,data){
        const list = await this.purchaseModel.find({user:user.username});
        if (!list) {
            throw new Error('err');
        }

        list.forEach(function(entry,index) {
            let currentPrice=data.find(el => el.id === entry.coinId).quotes[entry.currency].price
            let percent=currentPrice/entry.price*100 - 100;
            let profit=(currentPrice-entry.price)*entry.amount
            let name=data.find(el => el.id === entry.coinId).name
            this[index]={
                ...this[index]._doc,
                name,
                currentPrice,
                percent,
                profit,


            }
        },list)

        return list
    }
}

module.exports = PurchasesService;