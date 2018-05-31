var request=require('request');

function sendExternalData(data){
    console.log("send external")
    return new Promise(function(resolve,reject){
        try{
            let projectId;
            console.log(JSON.stringify(data)+"[[[[[[[]]]]]]]")
            if(data.sender&&data.sender.split("|").length===3){
                projectId=data.sender.split("|")[1]
                request({
                    uri     :'https://money-control-backend.herokuapp.com/JUBIZWyWIl_moneyControlBot/external/send',
                    json    :data,
                    method  :'POST'   
                },(err,req,body)=>{
                    if(err){   
                        console.log(err+"---------------------")
                        return reject("Something went wrong.");
                    }
                    else{
                        console.log(body);
                        return resolve(body);
                    }
                })		
            }
            else{
                return reject("Something went wrong.");    
            }
        }catch(e){
            console.log(e)
            return reject("Something went wrong.")
        }
    });
}

module.exports={
    sendExternalData:sendExternalData
}