module.exports={
    subscriptionStockAlert:subscriptionStockAlert
}

function subscriptionStockAlert(model){
    return new Promise(function(resolve,reject){
        try{
            let reply={
                type:"quickReply",
                text:"Would you like me to give you an update whenever something with "+model.tags.companySelected+" comes up?",
                next:{
                    data:[
                        {
                            data:"yes",
                            text:"Yes"
                        },
                        {
                            data:"no",
                            text:"No"
                        }
                    ]
                }
            }
            model.reply=reply;
            return resolve(model);
        }
        catch(e){
            console.log(e);
            return reject("Something went wrong");
        }
    })
}