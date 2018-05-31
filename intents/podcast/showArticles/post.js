module.exports={
    sample:sample
}

function sample(model){
    return new Promise(function(resolve,reject){
        try{
            if(model.data.includes("see more")){
            }
            else{
                delete model.stage;
            }
            return resolve(model);
        }
        catch(e){
            console.log(e);
            return reject("Something went wrong.");
        }
    });
}