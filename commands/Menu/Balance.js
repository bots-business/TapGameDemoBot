/*CMD
  command: Balance
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
Bot.sendMessage("Your balance: " + gameUser.balance);
