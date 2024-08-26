/*CMD
  command: renderWebApp
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

// JS app file:
var jsApp = WebApp.getUrl({ command: "renderJsApp" })

// command index
WebApp.render({
  template: "index.html",
  // you can pass mime type also:
  // mime_type: "text/html", // html by default
  options: {
    jsApp: jsApp
  }
});
