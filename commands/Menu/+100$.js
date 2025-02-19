/*CMD
  command: +100$
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Menu

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let gameUser = new GameUser(user);
gameUser.addBalance(100);

Bot.sendMessage("Your new balance: " + gameUser.balance);


