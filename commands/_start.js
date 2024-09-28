/*CMD
  command: /start
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
let loadUrl = Libs.Webhooks.getUrlFor({
  command: "loadData",
  // it is personal for user
  user_id: user.id
})

let url = WebApp.getUrl({
  command: "renderWebApp",
  options: {
    loadUrl: loadUrl
  }
});

let welcomeText;
// It is have personal data: loadUrl
welcomeText = "Hello. It is demo Tap Game Bot. \n\nYou can play now!",
// it is for debug. Try to don't show url for user.
// welcomeText = `Hello. It is demo Tap Game Bot. \n\nYou can [play now](${url})!`,

Api.sendMessage({
  text: welcomeText,
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [
      [
        // open the any web page on button pressing
        { text: "Play now", web_app: { url: url } },
      ]
    ],
    keyboard: [
      [
        { text: "Balance" },
        { text: "+100$" }
      ],
      [
        { text: "Reset" }
      ]
    ],
    resize_keyboard: true
  }
});
