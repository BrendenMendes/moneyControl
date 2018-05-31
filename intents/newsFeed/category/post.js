module.exports={
    validateCategory:validateCategory
}

var decorateArticles=require('./../showArticles/pre.js').showNewsFeedArticles;
var sendExternalData=require('./../../../common.js').sendExternalData;

function validateCategory(model){
    return new Promise(function(resolve,reject){
        let categories=["Business","Markets","Property","Stocks","Economy","Research","Mutual Funds","Finance","Auto","Cryptocurrency","Politics","India","World","Technology","Startups"];
        try{
            if(model.data.toLowerCase().includes("see more")){
                return resolve(model);
            }
            else{
                let validated=false;
                for(let i=0;i<categories.length;i++){
                    if(model.data.toLowerCase().includes(categories[i].toLowerCase())){
                        validated=true;
                        model.tags.newsFeedCategorySelected={
                            name    :categories[i],
                            articles:0,
                            page    :0
                        }
                        delete model.stage;
                    }
                }  
                if(!validated){
                    if(model.tags.newsFeedCategory==="one"){
                        model.tags.newsFeedCategory==="two";
                    }
                    else{
                        model.tags.newsFeedCategory="one";
                    }
                    return resolve(model);
                }
                else{
                    decorateArticles(model)
                    .then((data)=>{
//                        console.log(JSON.stringify(data.reply));
                        let reply={
                            text    : data.reply.text,
                            type    : data.reply.type,
                            next    : data.reply.next,
                            sender  : model.sender,
                            language: "en"
                        }
                        sendExternalData(reply)
                        .then((data)=>{     
                            return resolve(model);
                        })
                        .catch((e)=>{
                            console.log(e+"11111111111111");
                            return reject("Something went wrong.");
                        })
                    })
                    .catch((e)=>{
                        console.log(e);
                        return reject("Something went wrong.");
                    })
                }    
            }
        }
        catch(e){
            console.log(e+"2222222222");
            return reject("Something went wrong.")
        }
    })
}