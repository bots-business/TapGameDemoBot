/*CMD
  command: /reset
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// reset Game data

let gameUser = new GameUser(user);
gameUser.reset();

Bot.sendMessage("Game data has been reset");
