module.exports={
    showCompanyPrompt:showCompanyPrompt
}

function showCompanyPrompt(model){
    return new Promise(function(resolve,reject){
        try{
            if(model.tags.showCompanyPrompt){
                model.reply=model.tags.showCompanyPrompt;
            }
            return resolve(model);
        }
        catch(e){
            console.log(e);
            return reject("Something went wrong.");
        }
    })
}   