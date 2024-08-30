/*CMD
  command: index.html
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Web app example</title>

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/css-spinning-spinners/1.1.0/load3.css" />

    <style>
      body {
        background-color: #212529 !important;
      }

      .container {
        background-color: #212529;
        color: white;
        margin: 0;
        padding: 0;
        min-height: 100%;
      }

      .coin-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }
      .coin-container img {
        width: 100px;
      }
      .coin-text {
        font-size: 2rem;
        margin-left: 10px;
      }

      .progress {
        width: 100%;
        height: 10px;
        background-color: #333;
        border-radius: 5px;
        overflow: hidden;
      }

      .progress-bar {
        height: 100%;
        background: linear-gradient(to right, #4cd964, #5ac8fa, #007aff);
        border-radius: 5px;
        transition: width 0.5s ease-in-out;
      }

      .footer-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
      }

      .game-button {
        background-color: #333;
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        color: white;
        margin-right: 5px;
        flex-grow: 1;
      }
      .game-button span {
          display: block;
          color: #ffd700; /* Gold color for coins */
          font-size: 1.5rem;
      }
      .game-button:nth-child(1) span {
          color: #ff7f50; /* Coral color for Earn per tap */
      }
      .game-button:nth-child(2) span {
          color: #1e90ff; /* DodgerBlue color for Coins to level up */
      }
      .game-button:nth-child(3) span {
          color: #32cd32; /* LimeGreen color for Profit per hour */
      }

      .work-button .gradient-border {
        display: inline-block;
        padding: 12px;
        border-radius: 50%;
        background: linear-gradient(45deg, #11153a, #2b407c, #6c3ef7, #339af0);
        background-size: 200% 200%;
        animation: gradient-animation 5s ease infinite;
      }

      .work-button .gradient-border video {
        display: block;
        border-radius: 50%;
        overflow: hidden;
      }

      @keyframes gradient-animation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      /* page navigation */
      .nav-bar {
        display: flex;
        justify-content: space-between;
        background-color: #2a2e35;
        border-radius: 20px;
        padding: 10px;
        margin-bottom: 20px;
      }

      .nav-item {
        background: none;
        border: none;
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
      }

      .nav-item.active {
        color: #007bff;
      }

      /* bottom naivgation panel */
      .bottom-nav {
        display: flex;
        justify-content: space-around;
        background-color: #1e2228;
        padding: 10px;
        border-radius: 10px;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 1000; /* Обеспечивает, что блок будет поверх других элементов */
      }

      .nav-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: none;
        border: none;
        color: #6c757d;
        font-size: 0.8rem;
        transition: color 0.3s;
      }

      .nav-button img {
        width: 24px;
        height: 24px;
        margin-bottom: 5px;
      }

      .nav-button.active {
        color: #ffffff;
      }

      .nav-button:focus {
        outline: none;
      }

      .user-info {
        padding: 10px;
        background-color: #1e2228;
        border-radius: 10px;
      }

      .icon-coin {
        background-image: url('https://cdn-icons-png.flaticon.com/512/9382/9382189.png');
        background-size: contain;
        width: 24px;
        height: 24px;
        padding-left: 30px;
        background-repeat: no-repeat;
      }


      /* Event card on Mine page */
      .event-card {
        background-color: #2a2e35;
        border-radius: 15px;
        padding: 15px;
        margin-bottom: 15px;
      }

      .event-card.disabled{
        background-color: #3a3e45;
      }

      .event-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }

      .event-icon {
        width: 50px;
        height: 50px;
        margin-right: 15px;
        border-radius: 10px;
      }

      .event-details h3 {
        margin: 0;
        font-size: 16px;
      }

      .event-details p {
        margin: 5px 0;
        font-size: 12px;
        color: #8a8d91;
      }

      .event-profit {
        font-size: 14px;
        font-weight: bold;
      }

      .level-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #3a3e45;
        padding-top: 10px;
      }

      .level, .total-profit {
        font-size: 14px;
      }

      .hidden-block {
        display: none;
      }
    </style>

  </head>
  <body>
    <div class="container" id="app">

      <div class="loading" v-if="!isStarted"></div>

      <div class="pages hidden-block">
        <div class="user-info d-flex justify-content-between align-items-center">
          <span class="text-secondary">{{ user.username || user.telegramid }}</span>
          <span class="text-light icon-coin mr-5"> {{ user.balance }}</span>
        </div>

        <div class="d-flex justify-content-center pt-2" v-if="activePage === 'Work' || activePage === 'Mine'">
          <div class="game-button">
            <div>Earn per tap</div>
            <span>+1</span>
          </div>
          <div class="game-button">
            <div>Coins to level up</div>
            <span>5K</span>
          </div>
          <div class="game-button">
            <div>Profit per hour</div>
            <span>0</span>
          </div>
        </div>

        <!-- page: Work -->
        <div v-if="activePage === 'Work'">
          <div class="coin-container mt-4">
            <img src="https://cdn-icons-png.flaticon.com/512/9382/9382189.png" alt="Coin">
            <span class="coin-text">{{ user.balance }}</span>
          </div>

          <h5 class="d-flex justify-content-between">
            <span>Bronze ></span>
            <span>Level {{user.level}}/9</span>
          </h5>
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
          </div>

          <div class="m-5 work-button text-center">
            <div class="gradient-border">
              <video @click="tap()" width="200" height="200" preload="true"
                ref="video"
                style="background: transparent url('https://cdn-icons-png.flaticon.com/512/11926/11926848.png') 50% 50% / fit no-repeat;"
                muted="muted" playsinline="">
                <source src="https://cdn-icons-mp4.flaticon.com/512/11926/11926848.mp4" type="video/mp4">
              </video>
            </div>
          </div>

          <p><i class="bi bi-lightning-fill text-warning"></i>{{ user.energy }} / {{ user.maxEnergy }}</p>
        </div>

        <!-- page: Mine -->
        <div v-if="activePage === 'Mine'">
          <div class="coin-container mt-4">
            <img src="https://cdn-icons-png.flaticon.com/512/9382/9382189.png" alt="Coin">
            <span class="coin-text">{{ user.balance }}</span>
          </div>

          <div class="nav-bar">
            <button  @click="setMineSubPage('Mine')" :class="['nav-item', { active: mineSubPageName === 'Mine' }]" >Mine</button>
            <button  @click="setMineSubPage('Markets')" :class="['nav-item', { active: mineSubPageName === 'Markets' }]" >Markets</button>
          </div>

          <!-- Buildings -->
          <div v-for="(items, subPageName) in buildings" :key="subPageName">
            <div v-if="mineSubPageName === subPageName">
              <div v-for="(building, key) in items"
                   :key="key"
                   class="event-card"
                   @click="showUpgradeModal(building)"
                   :class="{ disabled: buildingLevel(building) === 0 }">
                <div class="event-header">
                  <img :src="building.icon" :alt="building.title" class="event-icon">
                  <div class="event-details">
                    <h3>{{ building.title }}</h3>
                    <p>Hour income</p>
                    <span class="event-profit icon-coin">{{ buildingIncome(building) }}</span>
                  </div>
                </div>
                <div class="level-info d-flex justify-content-between align-items-center">
                  <div class="level">lvl {{buildingLevel(building)}}</div>
                  <div class="total-profit icon-coin" style="margin-right: 40px;">{{ buildingCost(building) }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- page: Friends -->
        <div v-if="activePage === 'Friends'">
          <div class="text-center">
            <h1>Invite friends!</h1>
            <p>You and your friend will have bonuses</p>
          </div>

          <div class="event-card">
            <div class="event-header">
              <img src="https://cdn-icons-png.flaticon.com/512/9382/9382189.png" alt="Reward" class="event-icon">
              <div class="event-details">
                <h3>Invite friend</h3>
                <span class="event-profit icon-coin">+5 000</span> for you and your friend
              </div>
            </div>
          </div>

          <p class="mt-5">Your friends list (0)</p>
          <div class="event-card">
            <div class="event-header">
              <img src="https://cdn-icons-png.flaticon.com/512/9382/9382189.png" alt="Reward" class="event-icon">
              <div class="event-details">
                <h3>Nickname</h3>
                <span class="event-profit icon-coin">+5 000</span>
              </div>
            </div>
          </div>



        </div>

        <!-- page: Earn -->
        <div v-if="activePage === 'Earn'">
          <div class="coin-container mt-4">
            <img src="https://cdn-icons-png.flaticon.com/512/9382/9382189.png" alt="Coin">
          </div>
          <div>
            <h1 class="text-center mb-3">Earn more!</h1>
          </div>

          <h3>Daily tasks</h3>
          <div class="event-card">
            <div class="event-header">
              <img src="https://cdn-icons-png.flaticon.com/512/9382/9382189.png" alt="Reward" class="event-icon">
              <div class="event-details">
                <h3>Daily reward</h3>
                <span class="event-profit icon-coin">100</span>
              </div>
            </div>
          </div>

          <h3 class="mt-5">Tasks list</h3>
          <div class="event-card">
            <div class="event-header">
              <img src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/telegram-alt-128.png" alt="Join" class="event-icon">
              <div class="event-details">
                <h3>Join to <a href="https://t.me/chatbotsbusiness">BB chat</a></h3>
                <span class="event-profit icon-coin">100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- bottom butttons -->
      <div class="bottom-nav hidden-block">
        <button v-for="(item, index) in navItems"
                :key="index"
                @click="setActivePage(item.name)"
                :class="['nav-button', { active: activePage === item.name }]">
          <img :src="item.icon" :alt="item.name">
          <span>{{ item.name }}</span>
        </button>
      </div>

      <!-- TopModal -->
      <div class="modal fade" id="TopModal" tabindex="-1" aria-labelledby="tokenomicsModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header border-0">
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              <img :src="topModal.image" class="mb-3" width="100" height="100">
              <h2 class="mb-3">{{topModal.title}}</h2>
              <p class="text-secondary mb-4">
                {{topModal.description}}
              </p>
              <p class="mb-2">{{topModal.subTitle}}</p>
              <p class="text-warning fs-5 mb-4">
                {{topModal.secondValue}}
              </p>
              <p class="fs-2 mb-4">
                {{topModal.value}}
              </p>
              <button @click="topModal.onClick" class="btn btn-primary btn-lg w-100">
                {{topModal.button_caption}}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>




    <!-- VueJS script -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3.4.38/dist/vue.global.min.js"></script>

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">

    <script>
      // Simple ResLib for frontend
      let growthResource = function(resource, growthData){
        return {
          resource: resource,

          info: function(){
            return growthData || {}
          },

          title: function(){
            if(!this.isEnabled){ return }

            let growth = this.info();
            let start_text = 'add ' + String(growth.increment);
            let middle_text = ' once at ' + String(growth.interval) + ' secs';

            if(growth.type=='simple'){
              return  start_text + middle_text
            }
            if(growth.type=='percent'){
              return  start_text + '%' + middle_text
            }
            if(growth.type=='compound_interest'){
              return  start_text + '%' + middle_text + ' with reinvesting'
            }
          },

          have: function(){ return this.info() },

          isEnabled: function(){
            let growth = this.info();
            if(growth){ return growth.enabled }
            return false;
          },

          _toggle: function(status){
            let growth = this.info();
            if(!growth){ return }

            growth.enabled = status;
          },

          stop: function(){
            return this._toggle(false);
          },

          progress: function(){
            let growth = this.info();
            if(!growth){ return }

            let total_iterations = this.totalIterations(growth);
            let fraction = total_iterations % 1;
            return fraction*100;
          },

          willCompletedAfter: function(){
            return this.info().interval - this.progress()/100 * this.info().interval;
          },

          totalIterations: function(growth){
            if(!growth){ growth = this.info() }

            let now = (new Date().getTime());
            let duration_in_seconds = ( now - growth.started_at ) / 1000;
            return duration_in_seconds / growth.interval;
          },

          _calcMinMax(result, growth){
            if((growth.min)&&(growth.min > result)){
              return growth.min
            }

            if((growth.max)&&(growth.max < result)){
              return growth.max
            }

            return result
          },

          _calcByTotalIterations(value, total_iterations, growth){
            var result;
            if(growth.type=='simple'){
              result = value + total_iterations * growth.increment
            }
            if(growth.type=='percent'){
              let percent =  growth.increment / 100;
              let all_percents =  percent * growth.base_value * total_iterations
              result = value + all_percents;
            }
            if(growth.type=='compound_interest'){
              let percent = (1 + growth.increment / 100);
              result = value * Math.pow(percent, total_iterations)
            }
            return result;
          },

          _getTotalIterationsWithLimit(growth){
            let total_iterations = this.totalIterations(growth);

            if(!growth.max_iterations_count){ return total_iterations }

            let total = total_iterations + growth.completed_iterations_count;
            if(total < growth.max_iterations_count){
              return total_iterations
            }

            return growth.max_iterations_count - growth.completed_iterations_count;
          },

          _calcValue(value, growth){
            let total_iterations = this._getTotalIterationsWithLimit(growth);

            if(total_iterations<1){ return }

            let fraction = total_iterations % 1;
            total_iterations = total_iterations - fraction;

            var result = this._calcByTotalIterations(value, total_iterations, growth)

            growth.completed_iterations_count+= total_iterations;

            result = this._calcMinMax(result, growth);

            this._updateIteration(growth, fraction * 1000);

            return result;
          },

          getValue: function(value){
            let growth = this.info();
            if(!growth){ return value }
            if(!growth.enabled){ return value }

            let new_value = this._calcValue(value, growth);

            if(!new_value){ return value }

            this.resource._set(new_value);  /// update value

            return new_value;
          },

          _updateIteration: function(growth, fraction){
            if(!growth){ growth = this.info() }
            if(!growth){ return }

            let started_at = (new Date().getTime());
            /// started same early
            if(fraction){ started_at = started_at - fraction }

            growth.started_at = started_at;
          },

          _updateBaseValue: function(base_value){
            var growth = this.info();
            if(!growth){ return }

            growth.base_value = base_value;
          },

          _newGrowth: function(options){
            return {
              base_value: this.resource.baseValue(),
              increment: options.increment,
              interval: options.interval,
              type: options.type,
              min: options.min,
              max: options.max,
              max_iterations_count: options.max_iterations_count,
              enabled: true,
              completed_iterations_count: 0
            }
          },

          _addAs: function(options){
            let growth = this._newGrowth(options);
            return this._updateIteration(growth);
          },

          add: function(options){
            /// absolute growth value
            options.type = 'simple';
            options.increment = options.value;
            return this._addAs(options);
          },

          addPercent: function(options){
            /// percent
            options.type = 'percent';
            options.increment = options.percent;
            return this._addAs(options);
          },

          addCompoundInterest: function(options){
            /// compound percent
            options.type = 'compound_interest';
            options.increment = options.percent;
            return this._addAs(options);
          }

        }
      }

      let Resource = function(initValue){
        return {
          growth: null,

          _setGrowth: function(growth){
            this.growth = growth;
          },

          isNumber: function(value){ return typeof(value)=='number' },

          verifyNumber: function(value){
            if(!this.isNumber(value)){
              let evalue = '';
              if(typeof(value)!='undefined'){ evalue = JSON.stringify(value) }
              throw 'ResLib: value must be number only. It is not number: ' + typeof(value) + ' ' + evalue;
            }
          },

          removeRes: function(res_amount){
            this.set(this.value() - res_amount);
            return true;
          },

          baseValue: function(){
            let cur_value = initValue;
            if(typeof(cur_value)=='undefined'){ return 0 }

            return cur_value;
          },

          value: function(){
            let cur_value = this.baseValue();

            if(this._withEnabledGrowth()){
              return this.growth.getValue(cur_value);
            }
            return cur_value;
          },

          add: function(res_amount){
            this.verifyNumber(res_amount);
            this.set(this.value() + res_amount)
            return true;
          },

          have: function(res_amount){
            this.verifyNumber(res_amount);
            // can not have negative or null amount
            if(res_amount < 0){ return false }
            if(res_amount == 0){ return false }

            return this.value() >= res_amount;
          },

          remove: function(res_amount){
            if(!this.have(res_amount)){
              throw 'ResLib: not enough resources'
            }
            return this.removeRes(res_amount);
          },

          removeAnyway: function(res_amount){
            this.verifyNumber(res_amount);
            return this.removeRes(res_amount)
          },

          _withEnabledGrowth: function(){
            return (this.growth && this.growth.isEnabled())
          },

          _set: function(res_amount){
            initValue = res_amount;
          },

          set: function(res_amount){
            this.verifyNumber(res_amount);
            this._set(res_amount);

            if( this._withEnabledGrowth() ){
              this.growth._updateBaseValue(res_amount)
            }
          }
        }
      }

      function initRes(value, growthData){
        let res = Resource(value);

        let growth = growthResource(res, growthData);
        res._setGrowth(growth);

        return res;
      }


    </script>


    <script>
      // VueJS app for Tap game
      const app = Vue.createApp({
        data() {
          return {
            isStarted: false,
            // pass balance from options
            user: {},
            buildings: {},
            totalTapsCount: 0,
            ApiUrls: {},
            // extract url from url path. It is personal url for user
            loadUrl: new URL(window.location.href).searchParams.get("loadUrl"),
            topModal: {},
            // current active page
            activePage: 'Work',
            mineSubPageName: 'Mine',
            navItems: [
              { name: 'Work', icon: 'https://cdn-icons-png.flaticon.com/512/11926/11926848.png' },
              { name: 'Mine', icon: 'https://cdn-icons-png.flaticon.com/512/4491/4491005.png' },
              { name: 'Friends', icon: 'https://cdn-icons-png.flaticon.com/512/4490/4490913.png' },
              { name: 'Earn', icon: 'https://cdn-icons-png.flaticon.com/512/4490/4490716.png' }
            ]
          };
        },
        methods: {
          setActivePage(pageName) {
            this.activePage = pageName;
          },
          setMineSubPage(subPageName) {
            this.mineSubPageName = subPageName;
          },
          addBalance(amount) {
            this.user.balance += amount;
          },
          animateTapButton(){
            const video = this.$refs.video;
            video.play();
            video.addEventListener('ended', () => {
              video.currentTime = 0;
              video.pause();
            }, { once: true });
          },
          tap(){
            this.animateTapButton();
            this.totalTapsCount = this.totalTapsCount + 1;

            // One tap = 1 coin = user.level
            let reward = this.user.level;
            this.addBalance(reward);

            this.user.energyRes.remove(1);
            this.renderAllRes();

            // track once at 20 taps
            // reduce bot iteration count
            if(this.totalTapsCount % 20 === 0){
              this.trackTapWork();
            }
          },
          renderAllRes(){
            this.user.energy = Math.round(this.user.energyRes.value());
            this.user.maxEnergy = this.user.energyRes.growth.info().max;
          },
          buildingLevel(building) {
            return this.user.upgradesList[building.title]?.level || 0;
          },
          // get Cost or Income for building
          getBuildingParam(building, param, for_next_level = false) {
            let effectiveLevel = this.buildingLevel(building) || 1;
            if(for_next_level){ effectiveLevel += 1 }
            return building[`l${effectiveLevel}`][param];
          },
          buildingCost(building, for_next_level = false) {
            return this.getBuildingParam(building, 'cost', for_next_level);
          },
          buildingIncome(building, for_next_level = false) {
            return this.getBuildingParam(building, 'income', for_next_level);
          },
          showUpgradeModal(building){
            this.showModal({
              image: building.icon,
              title: building.title,
              description: 'Upgrade building for earning more coins',
              subTitle: 'Profit per hour',
              secondValue: this.buildingIncome(building, true) + ' coins',
              value: this.buildingCost(building, true) + ' coins',
              button_caption: 'Upgrade',
              onClick: () => this.upgradeBuilding(building),
            })
            console.log(this.topModal);
          },
          upgradeBuilding(building) {
            console.log('Upgrade building', building);
            this._makePostRequest('upgradeBuilding', { title: building.title }, (data) => {
              console.log('Upgrade response:', data);
              if(data.error){
                alert(data.error);
                return;
              }
              // this.user.balance = data.balance;
            });
          },
          showModal(params){
            this.topModal = params;
            new bootstrap.Modal(document.getElementById('TopModal'), {
              backdrop: 'static'
            }).show();
          },
          loadUserData() {
            // get balance from server
            // see: bot command syncBalance
            fetch(this.loadUrl)
              .then(response => response.json())
              .then(data => {
                console.log(data); // just for debug
                this.user = data.user;
                this.user.energyRes = initRes(this.user.energy, data.user.energyGrowth);

                // avaible buildings
                this.buildings = data.buildings;

                // API urls
                this.ApiUrls = data.urls;

                // timer for All Res updates
                this.renderAllRes();
                setInterval(this.renderAllRes, 1000);

                this.isStarted = true;
                // remove 'hidden-block' class from all elements with this class
                document.querySelectorAll('.hidden-block').forEach(el => el.classList.remove('hidden-block'));
              });
          },
          trackTapWork() {
            // save balance to server
            // see: bot command syncBalance
            this._makePostRequest('trackTapWork', { balance: this.user.balance, energy: this.user.energy });
          },
          _makePostRequest(command, params, callback){
            fetch(this.ApiUrls[command], {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(params)
            }).then((data) => {
              console.log('Command posted:', command + '. Response:', data);
              if(callback){ callback(data) }
            });
          }
        },
        // we need to load balance from server
        mounted() {
          this.loadUserData();
        }
      });

      app.mount('#app');
    </script>

  </body>
</html>
