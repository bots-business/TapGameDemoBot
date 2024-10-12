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
describe('Simple Test example', function() {
  it('2+2 should be 4', function() {
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
      let balanceBeforeWork = getCurrentBalance();

      clickTapButton(10, done);

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
      }, 50); // wait for 100ms
    });
  });

});

describe('Mine Page', function() {
  it('should display buildings', function(done) {
    openSubPage('Mine', function() {
      let buildings = document.querySelectorAll('.event-card');
      if (buildings.length === 0) {
        return done(new Error('No buildings found on Mine page'));
      }
      done();
    });
  });

  it('should show upgrade modal when clicking on a building and can close it', function(done) {
    openSubPage('Mine', function() {
      let firstBuilding = document.querySelector('.event-card');
      if (!firstBuilding) {
        return done(new Error('No buildings found'));
      }
      firstBuilding.click();

      // wait for modal to show
      setTimeout(function() {
        // close modal
        closeUpgradeModal(done);
      }, 500);
    });
  });
});

describe('Friends Page', function() {
  it('should display invite friends section', function(done) {
    openSubPage('Friends', function() {
      let inviteSection = document.querySelector('.event-card');
      if (!inviteSection) {
        return done(new Error('Invite friends section not found'));
      }
      if (!inviteSection.textContent.includes('Invite friend')) {
        return done(new Error('Invite friends text not found'));
      }
      done();
    });
  });
});

describe('Earn Page', function() {
  it('should display daily tasks', function(done) {
    openSubPage('Earn', function() {
      let dailyTasksHeader = Array.from(document.querySelectorAll('h3'))
        .find(el => el.textContent === 'Daily tasks');
      if (!dailyTasksHeader) {
        return done(new Error('Daily tasks section not found'));
      }
      let dailyRewardCard = document.querySelector('.event-card');
      if (!dailyRewardCard || !dailyRewardCard.textContent.includes('Daily reward')) {
        return done(new Error('Daily reward task not found'));
      }
      done();
    });
  });
});

describe('User Info', function() {
  it('should display user info', function() {
    let userInfo = document.querySelector('.user-info');
    if (!userInfo) {
      throw new Error('User info section not found');
    }
    let username = userInfo.querySelector('.text-secondary');
    let balance = userInfo.querySelector('.top-balance');
    if (!username || !balance) {
      throw new Error('Username or balance not found in user info');
    }
  });
});

describe('Progress Bar', function() {
  it('should have a progress bar on Work page', function(done) {
    openSubPage('Work', function() {
      let progressBar = document.querySelector('.progress-bar');
      if (!progressBar) {
        return done(new Error('Progress bar not found on Work page'));
      }
      done();
    });
  });
});

describe('Energy Regeneration. Please wait - 6 secs...', function() {
  // slowly test, need to wait
  it('should regenerate energy over time', function(done) {
    this.timeout(10000);  // 10 seconds for this test
    openSubPage('Work', function() {
      clickTapButton(10, done);
      let initialEnergy;

      // wait for energy to decrease after tapping
      setTimeout(function() {
        initialEnergy = getEnergy();
      }, 200);

      // wait for energy to regenerate
      setTimeout(function() {
        let newEnergy = getEnergy();
        if (newEnergy <= initialEnergy) {
          return done(new Error('Energy did not regenerate'));
        }
        done();
      }, 5000);
    });
  });
});

describe('Building Upgrades', function() {
  it('should not allow upgrade if balance is insufficient', function(done) {
    this.timeout(10000);  // 10 seconds for this test
    openSubPage('Mine', function() {
      let buildings = document.querySelectorAll('.event-card');
      if (buildings.length === 0) {
        return done(new Error('No buildings found'));
      }

      // find a building that can not be upgraded
      let expensiveBuilding;
      for (let building of buildings) {
        building.click();
        setTimeout(function() {
          let upgradeButton = document.querySelector('#TopModal .btn');
          if (upgradeButton && upgradeButton.disabled) {
            expensiveBuilding = building;
          }
        }, 500);
      }

      setTimeout(function() {
        if (!expensiveBuilding) {
          return done(new Error('Could not find a building too expensive to upgrade'));
        }
        closeUpgradeModal(done);
      }, 600 * buildings.length);
    });
  });
});

describe('Navigation Bar Responsiveness', function() {
  it('should have a fixed position at the bottom of the screen', function() {
    let bottomNav = document.querySelector('.bottom-nav');
    if (!bottomNav) {
      throw new Error('Bottom navigation not found');
    }
    let style = window.getComputedStyle(bottomNav);
    if (style.position !== 'fixed' || style.bottom !== '0px') {
      throw new Error('Bottom navigation is not fixed to the bottom');
    }
  });
});

describe('Game Button Information', function() {
  it('should display correct game information on Work page', function(done) {
    openSubPage('Work', function() {
      let gameButtons = document.querySelectorAll('.game-button');
      if (gameButtons.length !== 3) {
        return done(new Error('Incorrect number of game information buttons'));
      }

      let expectedInfo = ['Earn per tap', 'Coins to level up', 'Profit per hour'];
      gameButtons.forEach((button, index) => {
        if (!button.textContent.includes(expectedInfo[index])) {
          return done(new Error(`Button does not contain expected text: ${expectedInfo[index]}`));
        }
      });

      done();
    });
  });
});

describe('Level Progress', function() {
  it('should display current level', function(done) {
    openSubPage('Work', function() {
      let levelInfo = document.querySelector('h5');
      if (!levelInfo || !levelInfo.textContent.includes('Level')) {
        return done(new Error('Level information not found'));
      }
      let level = parseInt(levelInfo.textContent.match(/Level (\d+)/)[1]);
      if (isNaN(level) || level < 1) {
        return done(new Error('Invalid level number'));
      }
      done();
    });
  });
});


describe('Coin Animation', function() {
  it('should animate coin when tapping', function(done) {
    this.timeout(5000);  // 5 seconds for this test
    openSubPage('Work', function() {
      let tapButton = document.querySelector('.work-button video');
      if (!tapButton) {
        return done(new Error('Tap button not found'));
      }

      tapButton.click();

      setTimeout(function() {
        if (tapButton.paused) {
          return done(new Error('Coin animation did not start'));
        }

        tapButton.addEventListener('ended', function() {
          if (tapButton.currentTime !== 0) {
            return done(new Error('Coin animation did not reset'));
          }
          done();
        }, { once: true });
      }, 100);
    });
  });
});

// Common functions block
function getEnergy() {
  let energyEl = document.querySelector('.energy');
  if (!energyEl) {
    throw new Error('Energy element not found');
  }
  return parseInt(energyEl.textContent.split('/')[0]);
}

function clickTapButton(times, done) {
  let tapButton = document.querySelector('.work-button video');
  if (!tapButton) {
    return done(new Error('No tap button found'));
  }

  // make Tap click 10 times
  for (let i = 0; i < times; i++) {
    tapButton.click();
  }
}

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

// get current energy
function getEnergy() {
  let energyEl = document.querySelector('.energy');
  if (!energyEl) {
    throw new Error('Energy element not found');
  }
  return parseInt(energyEl.textContent.split('/')[0]);
}

// close upgrade modal
function closeUpgradeModal(done, callback) {
  let modal = document.querySelector('#TopModal');
  if (!modal || !modal.classList.contains('show')) {
    return done(new Error('Active Upgrade modal not shown'));
  }

  let closeButton = modal.querySelector('.btn-close');
  closeButton.click();
  // and need to wait for modal to close
  setTimeout(function() {
    let modal = document.querySelector('#TopModal');
    if (modal && modal.classList.contains('show')) {
      return done(new Error('Upgrade modal not closed'));
    }
    if (callback){
      return callback(done);
    }
    done();
  }, 500);
}

// for test runs
new bootstrap.Modal(document.getElementById('mochaModal')).show();

document.getElementById('runTestsButton').addEventListener('click', function() {
  document.getElementById('startTestNotify').style.display = 'none';
  mocha.run();
});
