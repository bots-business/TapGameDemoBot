/*CMD
  command: loadData
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔧 API
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/


// for balance adding after users taps on button
let addBalanceUrl = Libs.Webhooks.getUrlFor({
  command: "addBalance",
  user_id: user.id
})

// User Balance
let balanceRes = Libs.ResourcesLib.userRes("balance");
user.balanceRes = balanceRes.growth.info();
user.balance = balanceRes.value();

// User general data
let generalData = User.getProp("generalData", {});

// build user object
user.level = generalData.level || 1;
user.upgradesList = generalData.upgradesList || {};
user.completedTasks = generalData.completedTasks || {};

let result = {
  user: user,
  urls: {
    addBalance: addBalanceUrl
  }
};

// render result
WebApp.render({
  content: JSON.stringify(result),
  mime_type: "application/json"
});


