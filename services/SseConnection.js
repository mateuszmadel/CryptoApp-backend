class SseConnection{
    constructor(notificationModel, user) {
        this.notificationModel = notificationModel;
        this.sseHeader = {'Connection': 'keep-alive',
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'X-Accel-Buffering': 'no'};
        this.userNotifications=[]
        this.user=user;
    }

    async getAll(){
        this.userNotifications=await this.notificationModel.find({user:this.user});
    }
    async add(notification){
        this.userNotifications.push(notification)
    }

    async check(model) {
        let nData = [];
        this.userNotifications.forEach(async function (entry) {
            let currPrice = data.find(el => el.id === entry.coinId).quotes[entry.currency].price
            if ((entry.status === 1 && currPrice > entry.value) || (entry.status === 0 && currPrice < entry.value)) {
                nData.push({...entry._doc, name: data.find(el => el.id === entry.coinId).name, currentPrice: currPrice})
                await model.deleteOne({_id: entry._doc._id})
                let index=this.findIndex(el => el._id === entry._doc._id)
                this.splice(index,1)
            }
        },this.userNotifications)

        return nData


    }
}

module.exports = SseConnection;