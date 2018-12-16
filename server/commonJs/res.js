exports.resDoc = function(err,doc){
    if(err) {
        res.json({
            states: 0,
            msg: err.message
        });
    }else {
        res.json({
            states: 1,
            msg: doc
        });
    }
}