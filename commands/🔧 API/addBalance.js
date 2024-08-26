/*CMD
  command: addBalance
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔧 API
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

if(options.method === "POST") {
  // POST request
  // save balance to user
  user.balance = options.params.balance;

  // TODO: need to check that user have energy

  let result = { user: user };

  // render result
  WebApp.render({
    content: JSON.stringify(result),
    mime_type: "application/json"
  });
}


