var request=require('request');

function fetchArticles(data,callback){
    try{
        console.log(JSON.stringify(data));
        requestBody={
            uri     :"https://www.moneycontrol.com/newsapi/get_post_api/tags/"+data.tag+"/"+data.page+"/1",
            method  :"GET",
            json    :{}
        }
        console.log(JSON.stringify(requestBody)+"+++++++++++++++++")
        request(requestBody,(error,resp,body)=>{
            try{
//                    console.log(body);
                body=JSON.stringify(body);
                body=JSON.parse(body);
                callback(null,body);
            }
            catch(e){
                console.log(e);
                callback(e,null);
            }
        })
    }
    catch(e){
        console.log(e);
        callback(e,null);
    }
}

function stockPrice(data){
    console.log("IN STOCK PRICE")
    return new Promise(function(resolve,reject){
        requestBody={
            uri     :"https://priceapi.moneycontrol.com/pricefeed/"+data.exchange+"/equitycash/"+data.companyCode,
            method  :"GET",
            json    :{}
        }
        request(requestBody,(error,resp,body)=>{
            try{
//                console.log(body);
                body=JSON.stringify(body);
                body=JSON.parse(body);
                return resolve(body);
            }   
            catch(e){
                console.log(e);
                return reject(e);
            }
        })
    })  
}

module.exports={
    fetchArticles   :fetchArticles,
    stockPrice      :stockPrice
};    