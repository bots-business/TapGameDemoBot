/*CMD
  command: Reset
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Menu
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

let gameUser = new GameUser(user);
gameUser.reset();

Bot.sendMessage("Game data reseted.\nYour balance: " + gameUser.balance);
