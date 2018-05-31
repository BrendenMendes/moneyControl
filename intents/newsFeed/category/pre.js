module.exports={
    showCategory:showCategory
};

function showCategory(model){
    return new Promise(function(resolve,reject){
        try{
            let category1=["Business","Markets","Property","Stocks","Economy","Research","Mutual Funds"];

            let category2=["Finance","Auto","Cryptocurrency","Politics","India","World","Technology","Startups"];
            let categories=[];
            if(model.tags.newsFeedCategory){
                if(model.tags.newsFeedCategory=="one"){
                    model.tags.newsFeedCategory="two";
                    categories=category2;
                }
                else{
                    model.tags.newsFeedCategory="one";
                    categories=category1;
                }
            }
            else{
                model.tags.newsFeedCategory="one";
                categories=category1;
            }
            let reply={
                text:"What kind of news would you like to browse?",
                type:"quickReply",
                next:{
                    data:[]
                }
            };
            for(let i=0;i<categories.length;i++){
                reply.next.data.push({
                    data:categories[i],
                    text:categories[i]
                })
            }
            reply.next.data.push({
                    data:"see more",
                    text:"see more"
                })
            model.reply=reply;
            return resolve(model);
        }
        catch(e){
            console.log(e);            
            return reject("Something went wrong.")
        }
    })
}
