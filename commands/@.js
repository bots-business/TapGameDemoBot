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

// initial energy for tapping
const BASE_ENERGY = 1000;

// User class for game
class GameUser {
  constructor(){
    Object.assign(this, user);

    this.loadAllRes();

    // User general data
    let generalData = User.getProp("generalData") || this.initGeneralData();

    if(generalData.justStarted) {
      // new user - save default data
      delete generalData.justStarted;
      User.setProp("generalData", generalData);
    }

    // add general data fields to user object
    Object.assign(this, generalData);
    this.energy = this.energyRes.value();
  }

  to_json(){
    // just return all fields of this object except resources
    let obj = Object.assign({}, this);
    delete obj.energyRes;
    return obj;
  }

  // private methods here
  private

  loadAllRes(){
    let balanceRes = Libs.ResourcesLib.userRes("balance");
    this.balanceGrowth =  balanceRes.growth.info();
    this.balance =  balanceRes.value();

    this.energyRes = Libs.ResourcesLib.userRes("energy");
  }

  initEnergyGrowth(){
    this.energyRes.set(BASE_ENERGY);

    let energy_per_second = BASE_ENERGY / 60 / 60;
    this.energyRes.growth.add({ value: energy_per_second, interval: 1, max: BASE_ENERGY });
    return this.energyRes.growth.info();
  }

  initGeneralData(){
    return {
      level: 1,
      energyGrowth: this.initEnergyGrowth(),
      upgradesList: {},
      completedTasks: {},
      justStarted: true
    };
  }

}
