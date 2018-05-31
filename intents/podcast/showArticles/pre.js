var sendExternalData=require('./../../../common.js').sendExternalData;
var fetchArticles=require('./../../../api.js').fetchArticles;

function showPodcastArticles(model){
    return new Promise(function(resolve, reject){
        try{
            console.log(JSON.stringify(model.tags)+"TAGS TAGS--------");
            let tagKeys=Object.keys(model.tags);
            if(tagKeys.includes("podcastPage")){
                model.tags.podcastPage=model.tags.podcastPage+1;
            }
            else{
                model.tags.podcastPage=0;
                model.tags.artciles=0;
            }
            
            let data={
                tag :"podcast",
                page:model.tags.podcastPage
            };
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
                                model.tags.artciles=model.tags.artciles+1;
//                            }
//                            if(i==keys.length-1){
//                                reply.next.data[i].buttons.push({
//                                    text:"See more",
//                                    data:"podcast"
//                                })
//                            }
                        } 
                        if(model.tags.artciles===totalArticles){
                            console.log("IF CONDITION MACTHED")
                            model.tags.podcastPage=0;
                            model.tags.artciles=0;
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
                                        data:"See more on Podcast",
                                        text:"See more on Podcast"
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
    showPodcastArticles:showPodcastArticles
}