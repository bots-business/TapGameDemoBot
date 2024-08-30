/*CMD
  command: upgradeBuilding
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔧 API
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// upgrade Building
// POST request only
if(options.method != "POST") { return }

let gameUser = new GameUser(user);
let result = gameUser.upgradeBuilding(options.params.title);

// render result
WebApp.render({
  content: JSON.stringify(result),
  mime_type: "application/json"
});
