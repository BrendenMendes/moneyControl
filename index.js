var request = require('request');
 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var post=require('./postDistributor.js');
var pre=require('./preDistributor.js');

app.use(jsonParser);
app.use(urlencodedParser);


app.listen(process.env.PORT||80,()=>{
    console.log("Server is listening.")
})

// app.post('/:type',(req, res)=>{
//     filter(req)
//     .then((model)=>{
//         res.status(200).json(model)})
//     .catch((e)=>{
//         res.status(203).json({message:e})})
// })

app.post('/:folder/:type/:stage', (req,res)=>{
    require('./'+req.params.folder+'/'+req.params.type).main(req, res)
})

// function filter(request){
//     return new Promise(function(resolve, reject){
//         try{
//             switch(request.params.type){
//                     case "welcomeCarousel"  :
//                                                 pre.welcomeCarousel(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;

//                     case "seeMoreChoice"    :
//                                                 console.log("SEE MORE CHOICE")
//                                                 post.seeMoreChoice(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;

//                     case "showBreakingNewsArticles"   : 
//                                                 console.log("SHOW BREKING NEWS ARTICLES")
//                                                 pre.showBreakingNewsArticles(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;

//                     case "showPodcastArticles":
//                                                 pre.showPodcastArticles(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "showCategory"     :
//                                                 pre.showCategory(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "validateCategory" :
//                                                 post.validateCategory(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "showNewsFeedArticles":
//                                                 pre.showNewsFeedArticles(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "subscription":
//                                                 pre.subscription(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "validateCompany"  :
//                                                 post.validateCompany(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "subscriptionStockAlert":
//                                                 pre.subscriptionStockAlert(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "stockAlertFinalReply":
//                                                 pre.stockAlertFinalReply(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;
                    
//                     case "showCompanyPrompt":
//                                                 pre.showCompanyPrompt(request.body)
//                                                 .then((model)=>{return resolve(model)})
//                                                 .catch((e)=>{
//                                                     console.log(e);
//                                                     return reject("Something went wrong.");
//                                                 });
//                         break;

//                     default                 :   
//                                                 return reject("No service at this domain.");
//                         break;
//                 }
//             }
//         catch(e){
//             console.log(e);
//             return reject("Something went wrong.")
//         }
//     });
// }