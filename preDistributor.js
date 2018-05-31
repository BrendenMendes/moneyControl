var welcomeCarousel=require('./intents/getStarted/welcome/pre.js').welcomeCarousel;
var showBreakingNewsArticles=require('./intents/breakingNews/showArticles/pre.js').showBreakingNewsArticles;
var showPodcastArticles=require('./intents/podcast/showArticles/pre.js').showPodcastArticles;
var showCategory=require('./intents/newsFeed/category/pre.js').showCategory;
var showNewsFeedArticles=require('./intents/newsFeed/showArticles/pre.js').showNewsFeedArticles;
var subscription=require('./intents/newsFeed/subscription/pre.js').subscription;
var subscriptionStockAlert=require('./intents/stockAlert/subscription/pre.js').subscriptionStockAlert;
var stockAlertFinalReply=require('./intents/stockAlert/finalReply/pre.js').stockAlertFinalReply;
var showCompanyPrompt=require('./intents/stockAlert/validateCompany/pre.js').showCompanyPrompt;

module.exports={
    welcomeCarousel             :welcomeCarousel,
    showBreakingNewsArticles    :showBreakingNewsArticles,
    showPodcastArticles         :showPodcastArticles,
    showCategory                :showCategory,
    showNewsFeedArticles        :showNewsFeedArticles,
    subscription                :subscription,
    subscriptionStockAlert      :subscriptionStockAlert,
    stockAlertFinalReply        :stockAlertFinalReply,
    showCompanyPrompt           :showCompanyPrompt
};