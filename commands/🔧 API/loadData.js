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

user.balance = Libs.ResourcesLib.userRes("balance");

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


