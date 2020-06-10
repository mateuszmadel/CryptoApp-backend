class NotificationsService {
    constructor(notificationModel,purchaseModel) {
        this.notificationModel = notificationModel;
        this.purchaseModel = purchaseModel;
    }
    async add(user,userInput){
        const purchaseRecord=await this.purchaseModel.findOne({_id:userInput.id});
        const value = userInput.type ==='money'? userInput.value : purchaseRecord.price*(userInput.value+100)/100;
        const record = await this.notificationModel.create({
            user,
            coinId:purchaseRecord.coinId,
            value,
            currency:purchaseRecord.currency,
            status:userInput.status
        });
        if (!record) {
            throw new Error('Invalid data');
        }
        return record
    }

}

module.exports = NotificationsService;