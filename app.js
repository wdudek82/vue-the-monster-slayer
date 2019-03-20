const app = new Vue({
  el: "#app",
  data: {
    gameTitle: "The Monster Slayer",
    isGameStarted: false,
    specialAttackCooldown: 0,
    playerHealth: 100,
    monsterHealth: 100
  },
  methods: {
    toggleGameStarted() {
      this.isGameStarted = !this.isGameStarted;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.specialAttackCooldown = 0;
    },
    attack(type) {
      this.playerHealth -= Math.floor(Math.random() * 4) + 1;

      switch (type) {
        case "normal":
          this.monsterHealth -= Math.floor(Math.random() * 4) + 1;
          break;
        case "special":
          this.monsterHealth -= 3 + Math.floor(Math.random() * 4);
          break;
        default:
          console.log("Not implemented");
      }
    },
    healthBarStyles(health) {
      if (health > 70) {
        return { bgColor: "green", color: "#fff" };
      } else if (health > 30) {
        return { bgColor: "orange", color: "#333" };
      } else {
        return { bgColor: "red", color: "#333" };
      }
    },
    getHealthBarStyles(health) {
      const styleObj = this.healthBarStyles(health);

      return {
        width: `${health}%`,
        background: styleObj.bgColor,
        color: styleObj.color,
        transition: "width 500ms ease-in-out"
      };
    }
  }
});
