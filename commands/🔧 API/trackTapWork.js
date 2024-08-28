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

// load user details

// save new balance to user
user.balance = options.params.balance;



  let result = { user: user };

  // render result
  WebApp.render({
    content: JSON.stringify(result),
    mime_type: "application/json"
  });



