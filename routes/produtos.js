const NeDB = require('nedb')
let db = new NeDB({
    filename: "produtos.db",
    autoload: true
})

module.exports = app =>{

    let route = app.route('/produtos');

    route.get((req, res)=>{
       
        db.find({}).sort({name:1}).exec((err, produtos)=>{
            if(err){
                app.utils.error.send(err, req, res)
            } else{
                res.statusCode = 200;
                res.setHeader('content-Type', 'application/json');
                res.json({
                    produtos
                })
            }
        })
       
       
    })
    
    route.post((req, res) =>{
        
        db.insert(req.body, (err, produto) =>{
            if (err){
               app.utils.error.send(err, req, res)
            }else{
                res.status(200).json(produto)
            }
        })

    })

    let routeId = app.route('/produtos/:id');

    routeId.get((req, res) =>{
        db.findOne({_id:req.params.id}).exec((err, produto) =>{
            if (err){
                app.utils.error.send(err, req, res)
             }else{
                 res.status(200).json(produto)
             }
        })
    })

        routeId.put((req, res) =>{
        db.update({_id: req.params.id}, req.body, err =>{
            if (err){
                app.utils.error.send(err, req, res)
             }else{
                 res.status(200).json(Object.assign(req.params, req.body))
             }
        })
    })


    routeId.delete((req, res)=>{
        db.remove({ _id: req.params.id }, {}, err=>{
            if (err){
                app.utils.error.send(err, req, res)
             }else{
                 res.status(200).json(req.params)
             }
        })
    })
}