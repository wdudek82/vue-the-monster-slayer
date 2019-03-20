const app = new Vue({
  el: '#app',
  data: {
    gameTitle: 'The Monster Slayer',
    isGameStarted: false,
    isGameOver: false,
    specialAttackCooldown: 0,
    playerHealth: 100,
    monsterHealth: 100,
    gameLog: [],
  },
  methods: {
    toggleGameStarted() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.isGameStarted = !this.isGameStarted;
      this.specialAttackCooldown = 0;
      this.isGameOver = false;
    },
    createGameLog(content) {
      const timestamp = new Date();
      const hours = timestamp.getHours();
      const minutes = timestamp.getMinutes();
      const seconds = timestamp.getSeconds();

      const newGameLog = {
        timestamp: `
          ${hours < 10 ? 0 : ''
          }${hours
          }:${minutes < 10 ? 0 : ''
          }${minutes
          }:${seconds < 10 ? 0 : ''
          }${seconds}
        `,
        content,
      };

      this.gameLog.unshift(newGameLog);
    },
    monsterRegenerates() {
      // monster regenerates health over time
      if (this.monsterHealth < 100) {
        this.monsterHealth += 1;
      }
    },
    playerHealing() {
      const healing = 2 + Math.floor(Math.random() * 7);

      if (this.playerHealth + healing >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healing;
      }

      this.createGameLog(`Player restored ${healing}hp.`);
    },
    playerNormalAttack() {
      const playerAttack = Math.floor(Math.random() * 5) + 1;
      this.monsterHealth -= playerAttack;

      this.createGameLog(
        `Player attacked Monster and dealt ${playerAttack}pkt of damage.`,
      );
    },
    playerSpecialAttack() {
      const playerAttack = 5 + Math.floor(Math.random() * 6);
      this.monsterHealth -= playerAttack;
      this.specialAttackCooldown = 3;

      this.createGameLog(
        `Player dealt ${playerAttack}pkt damage to Monster using special attack.`,
      );
    },
    monsterAttacks() {
      const monsterAttack = Math.floor(Math.random() * 5) + 1;
      this.playerHealth -= monsterAttack;

      this.createGameLog(`Monster dealt ${monsterAttack}pkt damage to Player.`);
    },
    nextTurn(type) {
      this.monsterAttacks();
      this.monsterRegenerates();

      if (this.specialAttackCooldown > 0) {
        this.specialAttackCooldown -= 1;
      }

      switch (type) {
        case 'normal': {
          this.playerNormalAttack();
          break;
        }
        case 'special': {
          this.playerSpecialAttack();
          break;
        }
        case 'heal': {
          this.playerHealing();
          break;
        }
        default:
          console.log('Not implemented');
      }

      if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
        this.isGameOver = true;
        this.createGameLog('Game Over!');
      }
    },
    healthBarStyles(health) {
      if (health > 70) {
        return { bgColor: 'green', color: '#fff' };
      } else if (health > 30) {
        return { bgColor: 'orange', color: '#333' };
      } else {
        return { bgColor: 'red', color: '#333' };
      }
    },
    getHealthBarStyles(health) {
      const styleObj = this.healthBarStyles(health);

      return {
        width: `${health > 0 ? health : 0}%`,
        background: styleObj.bgColor,
        color: styleObj.color,
        transition: 'width 500ms ease-in-out',
      };
    },
  },
});
