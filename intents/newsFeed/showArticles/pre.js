var sendExternalData=require('./../../../common.js').sendExternalData;
var fetchArticles=require('./../../../api.js').fetchArticles;

function showNewsFeedArticles (model){
    return new Promise(function(resolve, reject){
        try{
            let data={};
            console.log(JSON.stringify(model.tags.newsFeedCategorySelected)+"-------------")
            if(model.tags.newsFeedCategorySelected){
                if( model.tags.newsFeedCategorySelected
                  &&model.tags.newsFeedCategorySelected.page===0
                  &&model.tags.newsFeedCategorySelected.articles===0
                  ){
                    data.tag=model.tags.newsFeedCategorySelected.name.toLowerCase().replace(" ","");
                    data.page=model.tags.newsFeedCategorySelected.page;
                }
                else{
                    model.tags.newsFeedCategorySelected.page=model.tags.newsFeedCategorySelected.page+1
                    data.tag=model.tags.newsFeedCategorySelected.name.toLowerCase().replace(" ","");
                    data.page=model.tags.newsFeedCategorySelected.page;
                }
            }
            else{
                model.tags.newsFeedCategorySelected={
                    name    :"news",
                    page    :0,
                    articles:0
                }
                data.tag=model.tags.newsFeedCategorySelected.name;
                data.page=model.tags.newsFeedCategorySelected.page;
            }
            fetchArticles(data,(error,data)=>{
                if(error){
                    console.log(error);
                    return reject("Something went wrong.");
                }
                else{
                    
                    let reply={};
                    let totalArticles=data.length;
                    delete data.length;
                    let keys=Object.keys(data);
                    if(keys.length>1){
                        reply={
                            type:"generic",
                            text:"You can choose from the following articles.",
                            next:{
                                data:[]  
                            }
                        };
                        for(let i=0;i<keys.length;i++){
//                            if(keys[i]!="length"){
                                reply.next.data.push({
                                    title   :data[keys[i]].headline,
                                    text    :data[keys[i]].intro,
                                    image   :data[keys[i]].post_image,
                                    buttons :[
                                        {
                                            text:"View",
                                            data:"https://www.moneycontrol.com/"+data[keys[i]].posturl,
                                            type:"url"
                                        },
                                        {
                                            text:"Share on Whatsapp",
                                            data:"https://api.whatsapp.com/send?text=https://www.moneycontrol.com/"+data[keys[i]].posturl,
                                            type:"url"
                                        },
                                        {
                                            text:"Share on Facebook",
                                            data:"http://www.facebook.com/share.php?u=https://www.moneycontrol.com/"+data[keys[i]].posturl,
                                            type:"url"
                                        }
                                    ]
                                })
                                model.tags.newsFeedCategorySelected.articles=model.tags.newsFeedCategorySelected.articles+1;
//                            }
//                            if(i==keys.length-1){
//                                reply.next.data[i].buttons.push({
//                                    text:"See more",
//                                    data:"see more news feed articles",
//                                    next:{}
//                                })
//                            }
                        }
                        if(model.tags.newsFeedArticles===totalArticles){
                            console.log("IF CONDITION MACTHED")
                            model.tags.newsFeedCategorySelected.page=0;
                            model.tags.newsFeedCategorySelected.articles=0;
                        }
                    }
                    else{
                        reply={
                            type:"text",
                            text:"Sorry no articles available at the moment."
                        };
                    }
                    let sendExternalReply={
                        text    : reply.text,
                        type    : reply.type,
                        next    : reply.next,
                        sender  : model.sender,
                        language: "en"
                    }
                    sendExternalData(sendExternalReply)
                    .then((data)=>{  
                        setTimeout(function(){
                            model.reply={
                                type:"quickReply",
                                text:"You can see more such articles by clicking the button below.",
                                next:{
                                    data:[{
                                        data:"See more on News Feed",
                                        text:"See more on News Feed"
                                    }]
                                }
                            };
                            return resolve(model);
                        },1500)
                    })
                    .catch((e)=>{
                        console.log(e);
                        return reject("Something went wrong.")
                    });
                }
            })
        }
        catch(e){
            console.log(e)
            return reject("Something went wrong.");
        }
    })
}       

module.exports={
    showNewsFeedArticles :showNewsFeedArticles 
}