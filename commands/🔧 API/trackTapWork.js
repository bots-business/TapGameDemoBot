/*CMD
  command: trackTapWork
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔧 API
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// POST request only
if(options.method != "POST") { return }

let gameUser = new GameUser(user);
let result = gameUser.trackTapWork(options.params)

// render result
WebApp.render({
  content: result,
  mime_type: "application/json"
});
