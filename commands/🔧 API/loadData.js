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
function getAddBalanceUrl() {
  return Libs.Webhooks.getUrlFor({
    command: "addBalance",
    user_id: user.id
  })
}

let balanceRes, energyRes;

function loadAllRes(){
  balanceRes = Libs.ResourcesLib.userRes("balance");
  user.balanceGrowth = balanceRes.growth.info();
  user.balance = balanceRes.value();

  energyRes = Libs.ResourcesLib.userRes("energy");
}

function initEnergyGrowth(){
  energyRes.set(BASE_ENERGY);

  let energy_per_second = BASE_ENERGY / 60 / 60;
  energyRes.growth.add({ value: energy_per_second, interval: 1, max: BASE_ENERGY });
  return energyRes.growth.info();
}

function initGeneralData(){
  return {
    level: 1,
    energyGrowth: initEnergyGrowth(),
    upgradesList: {},
    completedTasks: {},
    justStarted: true
  };
}

// load resources for user: Balance, Energy
loadAllRes();

// User general data
let generalData = User.getProp("generalData") || initGeneralData();

if(!generalData.justStarted) {
  // new user
}

// add general data fields to user object
Object.assign(user, generalData);
user.energy = energyRes.value();

buildings = {
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

let result = {
  user: user,
  buildings: buildings,
  urls: {
    addBalance: getAddBalanceUrl()
  }
};

// render result
WebApp.render({
  content: JSON.stringify(result),
  mime_type: "application/json"
});


