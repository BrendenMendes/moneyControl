module.exports={
    stockAlertFinalReply:stockAlertFinalReply
}

function stockAlertFinalReply(model){
    return new Promise(function(resolve,reject){
        try{
            let reply={
                type:"text",
                next:{}
            }
            if(model.tags.subscription.toLowerCase()=="yes"){
                reply.text="Great you would receive an update for me every time I have something for you from "+model.tags.companySelected;
            }
            else{
                reply.text="Okay thank you.";
            }
            model.reply=reply;
            return resolve(model);
        }
        catch(e){
            console.log(e);
            return reject("Something went wrong.");
        }
    })
}