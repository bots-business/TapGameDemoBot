/*CMD
  command: syncUserData
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(options.method === "POST") {
  // POST request
  // save balance to user
  user.balance = options.params.balance;
  User.setProp("balance", user.balance);
}else{
  // GET request
  // load balance from user
  user.balance = User.getProp("balance") || 0;
}

let result = { user: user };

// render result
WebApp.render({
  content: JSON.stringify(result),
  mime_type: "application/json"
});


