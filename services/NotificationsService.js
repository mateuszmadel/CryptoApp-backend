class NotificationsService {
    constructor(notificationModel,purchaseModel) {
        this.notificationModel = notificationModel;
        this.purchaseModel = purchaseModel;
        this.sseHeader = {'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no'}
    };


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
    async check(user){
        let nData=[];
        const userNotifications= await this.notificationModel.find({user});

        userNotifications.forEach(function(entry,index) {
            let currPrice=data.find(el => el.id === entry.coinId).quotes[entry.currency].price
            if((entry.status===1 && currPrice>entry.value) ||(entry.status===0 && currPrice<entry.value))
                nData.push({...this[index]._doc})
        },userNotifications)

        return nData


    }

}

module.exports = NotificationsService;