/*CMD
  command: loadData
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🔧 API
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/


const apiMethods = [
  "trackTapWork", // adding balance on tappping
  "upgradeBuilding" // upgrade buildings level
];

// build urls for api methods
const apiUrls = apiMethods.reduce((acc, method) => {
  acc[method] = Libs.Webhooks.getUrlFor({ command: method, user_id: user.id })
  return acc;
}, {});

let buildings = new Buildings().list;
let gameUser = new GameUser(user);

let result = {
  user: gameUser.toJSON(),
  buildings: buildings,
  urls: apiUrls
};

// render result
WebApp.render({
  content: result,
  mime_type: "application/json"
});


