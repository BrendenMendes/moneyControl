var stringSimilarity = require('string-similarity');
var companyDataJson = require('./../companyData.json');
var getStockDetails = require('./../../../api.js').stockPrice;
var sendExternalData=require('./../../../common.js').sendExternalData;

module.exports={
    validateCompany:validateCompany
}

function validateCompany(model){
    return new Promise(function(resolve,reject){
        let companyArray=["Asian Paints","Bajaj Auto","Bajaj Finance","Bajaj Finserv","Bharti Infratel","BPCL","Bharti Airtel","Cipla","Coal India","Dr Reddys Labs","Eicher Motors","GAIL","Grasim","Hindalco","HCL Tech","HDFC","HDFC Bank","Hero Motocorp","HUL","HPCL","ICICI Bank","Indiabulls Hsg","IndusInd Bank","IOC","Infosys","ITC","Kotak Mahindra","Lupin","Larsen","M&M","Adani Ports","Maruti Suzuki","NTPC","ONGC","Power Grid Corp","Reliance","SBI","Vedanta","UPL","Sun Pharma","TCS","Tata Motors","Titan Company","Tata Steel","Tech Mahindra","UltraTechCement","Axis Bank","Wipro","Yes Bank","Zee Entertain"];
        try{
            var matches = stringSimilarity.findBestMatch(model.data.toLowerCase(),companyArray);
//            console.log(JSON.stringify(matches));
            if(matches.bestMatch.rating===1){
                if(companyDataJson[matches.bestMatch.target]){
                    if(model.tags.showCompanyPrompt){
                        delete model.tags.showCompanyPrompt
                    };
                    model.tags.companySelected=matches.bestMatch.target;
                    let companyCode = companyDataJson[matches.bestMatch.target].code;
                    let apiData1={
                        exchange    :"nse",
                        companyCode :companyCode
                    }
                    let stockDetails={
                        nse:{},
                        bse:{}
                    }
                    
                    getStockDetails(apiData1)
                    .then((info)=>{
                        return new Promise(function(resolve,reject){
                            let keys=Object.keys(info.data);
                            if( keys.includes("pricecurrent")
                              &&keys.includes("pricepercentchange")){
                                stockDetails.nse={
                                    priceCurrent        :info.data.pricecurrent,
                                    pricePercentChange  :info.data.pricepercentchange
                                }
                                let apiData2={
                                    exchange    :"bse",
                                    companyCode :companyCode
                                }
                                return resolve(apiData2)
                            }
                            else{
                                return reject("Something went wrong.");
                            }
                        });
                    })
                    .then(getStockDetails)
                    .then((info)=>{
                        return new Promise(function(resolve,reject){
                            let keys=Object.keys(info.data);
                            if( keys.includes("pricecurrent")
                              &&keys.includes("pricepercentchange")){
                                stockDetails.bse={
                                    priceCurrent        :info.data.pricecurrent,
                                    pricePercentChange  :info.data.pricepercentchange
                                }
                                let reply={
                                    text    : model.tags.companySelected+"|break|BSE:"+stockDetails.bse.priceCurrent+"("+stockDetails.bse.pricePercentChange+")|break|NSE:"+stockDetails.nse.priceCurrent+"("+stockDetails.nse.pricePercentChange+")",
                                    type    : "text",
                                    next    : {},
                                    sender  : model.sender,
                                    language: "en"
                                }
                                return resolve(reply)
                            }
                            else{
                                return reject("Something went wrong.");
                            }
                        });
                    })
                    .then(sendExternalData)
                    .then((data)=>{  
                        delete model.stage;
                        return resolve(model);
                    })
                    .catch((e)=>{
                        console.log(e);
                        return reject("Something went wrong.")
                    });
                }
                else{
                    return reject("Something went wrong.");
                }  
            }
            else{
                let possibleCompaniesReply={
                    type:"quickReply",
                    text:"Did you mean from the following?",
                    next:{
                        data:[]
                    }
                };
                for(let i=0;i<matches.ratings.length;i++){
                    if(matches.ratings[i].rating>0.5){
                        if(possibleCompaniesReply.next.data.length<=5){
                            possibleCompaniesReply.next.data.push({
                                data:matches.ratings[i].target,
                                text:matches.ratings[i].target,
                            })
                        }
                        else{
                            break;
                        }
                    }
                }
                if(possibleCompaniesReply.next.data.length>0){
                    model.tags.showCompanyPrompt=possibleCompaniesReply;
                    return resolve(model);
                }
                else{
                    if(model.tags.showCompanyPrompt){
                        delete model.tags.showCompanyPrompt; 
                    }
                    let externalReply={
                        text    : "Please enter a valid company name.",
                        type    : "text",
                        next    : {},
                        sender  : model.sender,
                        language: "en"
                    };
                    sendExternalData(externalReply)
                    .then((data)=>{  
                        return resolve(model);
                    })
                    .catch((e)=>{
                        console.log(e);
                        return reject("Something went wrong.")
                    });
                }
            }   
        }
        catch(e){
            console.log(e);
            return reject("Something went wrong.");
        }
    })
}   