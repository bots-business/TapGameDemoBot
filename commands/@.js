/*CMD
  command: @
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

const BASE_ENERGY = 1000;

class Buildings {
  constructor() {
    this.list = {
      Mine: {
        mine: {
          title: "Upgrade mine",
          icon: "https://cdn-icons-png.flaticon.com/512/11926/11926834.png",
          l1: { cost: 100, income: 1000 },
          l2: { cost: 200, income: 2000 },
          l3: { cost: 300, income: 3000 },
          l4: { cost: 400, income: 4000 },
          l5: { cost: 500, income: 5000 },
        },
        truck: {
          title: "Add truck",
          icon: "https://cdn-icons-png.flaticon.com/512/11926/11926820.png",
          l1: { cost: 1000, income: 5000 },
          l2: { cost: 2000, income: 10000 },
          l3: { cost: 3000, income: 15000 },
          l4: { cost: 4000, income: 20000 },
          l5: { cost: 5000, income: 25000 },
        }
      },
      Markets: {
        apple: {
          title: "Apple for connection",
          icon: "https://cdn-icons-png.flaticon.com/512/11926/11926899.png",
          l1: { cost: 100, income: 1000 },
          l2: { cost: 200, income: 2000 },
          l3: { cost: 300, income: 3000 },
          l4: { cost: 400, income: 4000 },
          l5: { cost: 500, income: 5000 }
        },
      }
    }
  }

  getByTitle(title) {
    const buildings = Object.values(this.list).flatMap(category => Object.values(category));
    return buildings.find(building => building.title === title) || null;
  }

  costFor(building_title, level) {
    return this.getByTitle(building_title)?.[`l${level}`]?.cost || null;
  }
}

class GameUser {
  constructor(user) {
    Object.assign(this, user); // copy all user properties to this object
    this._loadAllResources();
    this._initializeGeneralData();
    this.energy = this.energyRes.value();
  }

  toJSON() {
    const { energyRes, ...jsonObject } = this;
    return jsonObject;
  }

  addBalance(amount) {
    this._setBalance(this.balance + amount);
  }

  // save new balance to user and energy
  trackTapWork(params) {
    if (params.energy > this.energy) {
      return { error: "Not enough energy. You have only: " + this.energy };
    }
    if (params.balance <= 0) {
      return { error: "Balance can't be negative" };
    }
    if (params.balance < user.balance) {
      return { error: "Balance can't be decreased on TapWork" };
    }
    // can't be more then energy * level
    if (params.balance > this.energy * this.level) {
      return { error: "Balance can't be more than energy * level" };
    }
    this._setBalance(params.balance);
    this._setEnergy(params.energy);
    return { success: true };
  }

  upgradeBuilding(building_title) {
    let curBuilding = this.upgradesList[building_title] || { level: 0 };
    const needMoney = new Buildings().costFor(building_title, curBuilding.level + 1);
    if(!needMoney) {
      return { error: "No such building" };
    }
    if(this.balance + this._balance_slip() < needMoney) {
      return { error: "Not enough money" };
    }
    // update balance
    this._setBalance(this.balance - needMoney);
    // update building level
    curBuilding.level++;
    this.upgradesList[building_title] = curBuilding;
    this._saveGeneralData();
    this._recalceUpgradesGrowths();
    return { success: true };
  }

  // delete all user data
  reset() {
    User.deleteProp("generalData");
    User.deleteProp("upgrades");
    User.deleteProp("balance");

    const balanceRes = Libs.ResourcesLib.userRes("balance");
    balanceRes.set(0);
    balanceRes.growth.remove();
    this.balance = 0;

    this.setEnergyGrowth();
  }

  private

  // we save TapWork once at 20 times
  // so we can have small slip
  _balance_slip() {
    return this.level * 20;
  }

  _setBalance(balance) {
    this.balance = balance;
    Libs.ResourcesLib.userRes("balance").set(balance);
  }

  _setEnergy(energy) {
    this.energy = energy;
    this.energyRes.set(energy);
  }

  _loadAllResources() {
    const balanceRes = Libs.ResourcesLib.userRes("balance");
    this.balanceGrowth = balanceRes.growth.info();
    this.balance = balanceRes.value();
    this.energyRes = Libs.ResourcesLib.userRes("energy");
  }

  _initializeGeneralData() {
    let generalData = User.getProp("generalData") || this._createDefaultGeneralData();
    if (generalData.justStarted) {
      delete generalData.justStarted;
      User.setProp("generalData", generalData);
    }
    Object.assign(this, generalData);
  }

  _createDefaultGeneralData() {
    return {
      level: 1,
      energyGrowth: this.setEnergyGrowth(),
      upgradesList: {},
      completedTasks: {},
      justStarted: true
    };
  }

  setEnergyGrowth() {
    const maxValue = BASE_ENERGY * ( this.level || 1);
    this.energyRes.set(maxValue);
    const energyPerSecond = maxValue / (60 * 60);
    this.energyRes.growth.add({ value: energyPerSecond, interval: 1, max: maxValue });
    return this.energyRes.growth.info();
  }

  _saveGeneralData(){
    User.setProp("generalData", {
      level: this.level,
      energyGrowth: this.energyRes.growth.info(),
      upgradesList: this.upgradesList,
      completedTasks: this.completedTasks
    })
  }

  _recalceUpgradesGrowths() {
    this.balanceRes.resetGrowth();
    this.upgradesList.forEach((building, title) => {
      const buildingData = new Buildings().getByTitle(title);
      if (buildingData){
        const growth = buildingData[`l${building.level}`].income;
        this.balanceRes.growth.add({ value: growth, interval: 60, max: null });
      }
    })
  }
}
