const csvparse = async (req) => {
    var finalobj = {
        "processed": [
        ],
        "unprocessed": [
        ]
    }
     for(var i = 0; i < req.length; i++){
        if(finalobj.processed.find(mb => mb.mobile === req[i].mobile) == undefined){
            finalobj.processed.push(req[i]);
        }
        else{
            finalobj.unprocessed.push(req[i]);
        }
     }
    return finalobj;
}

module.exports = {
    csvparse
}