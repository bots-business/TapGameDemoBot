/*CMD
  command: +100$
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
gameUser.addBalance(100);

Bot.sendMessage("Your new balance: " + gameUser.balance);

