const router = require('express').Router();

router.get('/', async (req,res)=>{
    let list=data.filter((item) => item.rank <= 100).sort((a, b) => a.rank < b.rank ? -1 : 1).map(({id, name}) => ({id, name}))
    if(req.query.all!==undefined)
    list.unshift({id:'USD', name:'Dolar amerykański' },{id:'PLN',name:'Polski złoty'},{id:'EUR',name:'Euro'},{id:'GBP',name:'Funt brytyjski'})
    res.json(list)
})

module.exports= router;