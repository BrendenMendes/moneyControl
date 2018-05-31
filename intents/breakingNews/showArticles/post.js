function seeMoreChoice(model){
    console.log("In see more")
    return new Promise(function(resolve,reject){
        try{
            console.log(model.data)
//            if(model.data.toLowerCase().includes("see more")){
//                model.stage="";
//                console.log("validated see more");
//            }
//            else{
//                delete model.stage;
//            }
            return resolve(model);
        }
        catch(e){
            console.log(e);
            return reject("Something went wrong.");
        }
    });
}    

module.exports={
    seeMoreChoice:seeMoreChoice
}     