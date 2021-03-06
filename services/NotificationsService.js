class NotificationsService {
    constructor(notificationModel,purchaseModel) {
        this.notificationModel = notificationModel;
        this.purchaseModel = purchaseModel;
    };


    async add(user,userInput){
        const purchaseRecord=await this.purchaseModel.findOne({_id:userInput.id});
        console.log(userInput.value,(userInput.value+100))
        const value = userInput.type ==='money'? userInput.value : purchaseRecord.price*(parseFloat(userInput.value)+100)/100;
        const record = await this.notificationModel.create({
            user,
            coinId:purchaseRecord.coinId,
            value,
            currency:purchaseRecord.currency,
            status:userInput.status
        });
        if (!record) {
            throw new Error('Niepoprawne dane');
        }
        return record
    }


}

module.exports = NotificationsService;