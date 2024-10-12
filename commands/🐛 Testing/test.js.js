/*CMD
  command: test.js
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🐛 Testing
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

mocha.setup('bdd');


// it is example. You can use this as a template for your tests
describe('My First Test', function() {
  it('should be 4', function() {
    // just example
    const result = 2 + 2;
    if (result !== 4) {
      throw new Error('Addition result is incorrect');
    }
  });
});

describe('Pages Navigation', function() {
  it('have sub buttons', function() {
    let buttons = document.querySelectorAll('.bottom-nav button');
    if(!buttons) {
      throw new Error('No nav buttons found');
    }

    expectedButtons = ['Work', 'Mine', 'Friends', 'Earn'];

    buttons.forEach(function(button) {
      if(!expectedButtons.includes(button.innerText)) {
        throw new Error('Unexpected button found: ' + button.innerText);
      }
    });
  });

  function verifyNaveButtonClick(pageName, done) {
    openSubPage(pageName, function(button) {
      if(!button) {
        throw new Error('No ' + pageName + ' button found');
      }
      // have active class
      if(!button.classList.contains('active')) {
        throw new Error(pageName + ' button is not active');
      }

      done();
    });
  }

  it('can click on sub page Work', function(done) {
    verifyNaveButtonClick('Work', done);
  })

  it('can click on sub page Mine', function(done) {
    verifyNaveButtonClick('Mine', done);
  })

  it('can click on sub page Friends', function(done) {
    verifyNaveButtonClick('Friends', done);
  })

  it('can click on sub page Earn', function(done) {
    verifyNaveButtonClick('Earn', done);
  })

});

describe('Tap work', function() {
  it('can get current balance', function() {
    let balance = getCurrentBalance();
    if(balance < 0) {
      throw new Error('Balance is negative');
    }
  });

  it('can press on Tap button 10 times and earn 10 coins', function(done) {
    // goto Work page first
    openSubPage('Work', function() {
      let tapButton = document.querySelector('.work-button video');
      if (!tapButton) {
        return done(new Error('No tap button found'));
      }

      let balanceBeforeWork = getCurrentBalance();

      // make Tap click 10 times
      for (let i = 0; i < 10; i++) {
        tapButton.click();
      }

      // wait for tap work to complete
      setTimeout(function() {
        // balance must be +10 or more
        let balanceAfterWork = getCurrentBalance();
        if (balanceAfterWork < balanceBeforeWork + 10) {
          return done(new Error('Balance is not increased'));
        }
        // check energy value
        let energyEl = document.querySelector('.energy');
        if (!energyEl) {
          return done(new Error('No energy element found'));
        }
        let energy = energyEl.innerText;
        curEnergy = parseInt(energy.split('/')[0]);
        // must be 990
        if (curEnergy !== 990) {
          return done(new Error('Energy is not 990'));
        }
        totalEnergy = parseInt(energy.split('/')[1]);
        // must be 1000
        if (totalEnergy !== 1000) {
          return done(new Error('Total energy is not 1000'));
        }

        done();
      }, 100); // wait for 100ms
    });
  });

});

// Common functions block
function openSubPage(pageName, callback) {
  // click on sub page button
  let buttons = document.querySelectorAll('.bottom-nav button');
  let resultButton = null;
  buttons.forEach(function(button) {
    if(button.innerText === pageName) {
      button.click();
      resultButton = button;
    }
  });

  // wait for page to load
  setTimeout(function() {
    callback(resultButton);
  }, 10);
}

// get current balance
function getCurrentBalance() {
  let balanceEl = document.querySelector('.top-balance');
  if(!balanceEl) {
    throw new Error('No balance element found');
  }

  return parseInt(balanceEl.innerText);
}

// for test runs
new bootstrap.Modal(document.getElementById('mochaModal')).show();

document.getElementById('runTestsButton').addEventListener('click', function() {
  document.getElementById('startTestNotify').style.display = 'none';
  mocha.run();
});
