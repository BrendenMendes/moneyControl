function welcomeCarousel(model){
    return new Promise(function(resolve,reject){
        try{
            let reply={
                type:"generic",
                text:"Hi I’m Mike, your Smart News Reporter from MoneyControl. ${image::http://jubi-images.herokuapp.com/moneyControl/myAvatar.png} I can help you discover news of your taste. So go ahead and choose from the options below.",
                next:{
                    data:[{
                            title   :"Breaking News",
                            text    :"Breaking News",
                            image   :"http://jubi-images.herokuapp.com/moneyControl/BreakingNews.png",
                            buttons :[
                                {
                                    text:"Breaking News",
                                    data:"Breaking News"
                                }
                            ]
                        },
                        {
                            title   :"Podcast",
                            text    :"Podcast",
                            image   :"http://jubi-images.herokuapp.com/moneyControl/Pod.png",
                            buttons :[
                                {
                                    text:"Podcast",
                                    data:"Podcast"
                                }
                            ]
                        },
                        {
                            title   :"My News Feed",
                            text    :"My News Feed",
                            image   :"http://jubi-images.herokuapp.com/moneyControl/News.png",
                            buttons :[
                                {
                                    text:"My News Feed",
                                    data:"My News Feed"
                                }
                            ]
                        },
                        {
                            title   :"Stock Alert",
                            text    :"Stock Alert",
                            image   :"http://jubi-images.herokuapp.com/moneyControl/Stock.png",
                            buttons :[
                                {
                                    text:"Stock Alert",
                                    data:"Stock Alert"
                                }
                            ]
                        }]  
                }
            };
            model.reply=reply;
            return resolve(model);
        }
        catch(e){
            console.log(e);            
            return reject("Something went wrong.")
        }
    })
}

module.exports={
    welcomeCarousel:welcomeCarousel
};