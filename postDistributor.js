var seeMoreChoice=require('./intents/breakingNews/showArticles/post.js').seeMoreChoice;
var validateCategory=require('./intents/newsFeed/category/post.js').validateCategory;
var validateCompany=require('./intents/stockAlert/validateCompany/post.js').validateCompany;

module.exports={
    seeMoreChoice   :seeMoreChoice,
    validateCategory:validateCategory,
    validateCompany :validateCompany
}

