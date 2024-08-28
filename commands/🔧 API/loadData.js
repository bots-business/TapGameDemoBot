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


// for balance adding after users taps on button
function getTrackTapWorkUrl() {
  return Libs.Webhooks.getUrlFor({
    command: "trackTapWork",
    user_id: user.id
  })
}

let buildings = {
  Mine: {
    mine: {
      title: "Upgrade mine",
      icon: "https://cdn-icons-png.flaticon.com/512/11926/11926834.png",
      l1: { cost: 100, income: 1000 },
      l2: { cost: 200, income: 2000 },
    },
    truck: {
      title: "Add truck",
      icon: "https://cdn-icons-png.flaticon.com/512/11926/11926820.png",
      l1: { cost: 1000, income: 5000 },
      l2: { cost: 2000, income: 10000 },
    }
  },
  Markets: {
    apple: {
      title: "Apple for connection",
      icon: "https://cdn-icons-png.flaticon.com/512/11926/11926899.png",
      l1: { cost: 100, income: 1000 },
      l2: { cost: 200, income: 2000 },
    },
  }
};

let gameUser = new GameUser();

let result = {
  user: gameUser.to_json(),
  buildings: buildings,
  urls: {
    trackTapWork: getTrackTapWorkUrl()
  }
};

// render result
WebApp.render({
  content: JSON.stringify(result),
  mime_type: "application/json"
});


