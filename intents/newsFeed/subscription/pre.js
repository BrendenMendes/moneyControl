module.exports={
    subscription:subscription
};

function subscription(model){
    return new Promise(function(resolve,reject){
        try{
            let reply={
                type:"quickReply",
                text:"You can subscribe to this category by clicking the below button.",
                next:{
                    data:[
                        {
                            data:"Subscribe to News Feed",
                            text:"Subscribe to News Feed"
                        }
                    ]
                }
            }
            model.reply=reply;
            return resolve(model);
        }
        catch(e){
            console.log(e);            
            return reject("Something went wrong.")
        }
    })
}