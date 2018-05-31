'use strict'
module.exports={
	main:main
}

let obj = {
	news : news
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

function news(model){
	return new Promise(function(resolve, reject){
        resolve(model)
	})
}