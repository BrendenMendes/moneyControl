'use strict'
module.exports={
	main:main
}

let obj = {
	start : start
}

function main(req, res){
		console.log(req.params.stage)
		obj[req.params.stage](req.body)
		.then((data)=>{
			res.send(data)
		})
		.catch((e)=>{
			console.log(e)
			res.sendStatus(203)
		})
}

function start(model){
	return new Promise(function(resolve, reject){
		model.reply={
            type:"generic",
            text:"Hi I’m Mike, your Smart News Reporter from MoneyControl. ${image::http://jubi-images.herokuapp.com/moneyControl/myAvatar.png} I can help you discover news of your taste. So go ahead and choose from the options below.",
            next:{
                data:[
                	{
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
                    }
                ]  
            }
        }
        resolve(model)
	})
}