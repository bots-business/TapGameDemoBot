/*CMD
  command: /webApp
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// we need personal user url for data sync beetwen WebApp and bot
let syncUserDataUrl = Libs.Webhooks.getUrlFor({
  command: "syncUserData",
  // it is personal for user
  user_id: user.id
})

let url = WebApp.getUrl({
  command: "renderWebApp",
  options: {
    syncUserDataUrl: syncUserDataUrl
  }
});

Api.sendMessage({
  text: `Open this link to start WebApp: <a href='${url}'>open</a>` +
    "\n\n Commands: \n" +
    "/balance - check your balance \n" +
    "/resetBalance - reset balance to 100",
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [
    [
      // open the any web page on button pressing
      { text: "open Web App", web_app: { url: url } },
    ]
  ]}
});
