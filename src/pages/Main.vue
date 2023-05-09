<template>
  <div class="main">
    <aside class="main__left">
      <div class="main__btns">
        <img
          :src="btnHome"
          alt="btnHome"
          class="main__btnHome"
          @click="goHome"
        />
        <!-- <div> -->
          <img
          :src="button"
          alt="btnRetry"
          class="main__btnRetry"
          @click="goRetry"
        />
        <!-- </div> -->
      </div>
      <div class="main__down">
        <div class="main__center">
          <h3 class="main__params">Параметри:</h3>
          <div class="main__cure">
            <div class="medicine">
              <img :src="sadIcon" alt="icon" class="medicine__img" />
              <p class="medicine__count">{{ SAD.length }}</p>
            </div>
            <div class="medicine">
              <img :src="happyIcon" alt="icon" class="medicine__img" />
              <p class="medicine__count">{{ SMILE.length }}</p>
            </div>
            <div class="medicine">
              <img :src="heartIcon" alt="icon" class="medicine__img-last" />
              <p class="medicine__count">{{ HEART.length }}</p>
            </div>
          </div>
        </div>

        <div class="main__counter">
          <p class="main__subtitile">Осталось в очереди:</p>
          <h3 class="main__subtitile">
            <span class="main__number">{{ this.currentInd }}</span
            >/{{ this.CARDS.length }}
          </h3>
        </div>
      </div>
    </aside>
    <main class="main__right">
      <vue-swing
        @throwout="onThrowout"
        :config="config"
        ref="vueswing"
        @throwoutleft="left"
        @throwoutright="right"
        @throwoutup="up"
        @dragmove="dragNew"
        @dragend="dragEnd"
        @dragstart="dragstart"
      >
      <!-- <div></div> -->
        <PersonCard
          :print="print"
          class="personCard"
          v-for="card in this.CARDS"
          :key="card.id"
          :person="Card"
        />
      </vue-swing>
      <div class="main__remedy remedy">
        <button
          class="remedy__name"
          style="
            background: linear-gradient(266.19deg, #8049c7 0%, #ca57fd 100%);
          "
          @click="firstRemedy"
          :disabled="isButtonDisabled"
        >
          Препарат 1
        </button>
        <button
          class="remedy__name"
          style="
            background: linear-gradient(266.19deg, #169ae4 0%, #0cc4fa 100%);
          "
          @click="secondRemedy"
          :disabled="isButtonDisabled"

        >
          Препарат 2
        </button>
        <button
          class="remedy__name"
          style="
            background: linear-gradient(90deg, #FFD748 0.02%, rgba(195, 199, 11, 0.96) 99.97%, #CAC6AB 99.98%, #D3E9E1 99.99%);"
          @click="thirdRemedy"
          :disabled="isButtonDisabled"

        >
          Препарат 3
        </button>
      </div>
    </main>
  </div>
</template>
<script>
import btnHome from "@/images/btn_home.svg";
import btnRetry from "@/images/btn_retry.png";
import happyIcon from "@/images/Happy_icon.svg";
import sadIcon from "@/images/Sad_icon.svg";
import heartIcon from "@/images/heart_icon.svg";
import PersonCard from "@/components/PersonCard.vue";
import button from "@/images/button.svg";
import group from "@/images/Group.png";
import { Swipeable } from "vue-swipy";
import VueSwing from "vue-swing";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { gsap } from "gsap";

export default {
  components: {
    PersonCard,
    Swipeable,
    VueSwing,
  },
  data() {
    return {
      btnHome: btnHome,
      btnRetry: btnRetry,
      happyIcon: happyIcon,
      sadIcon: sadIcon,
      heartIcon: heartIcon,
      group:group,
      currentInd: 1,
      print: "",
      button: button,
      isButtonDisabled:false,
      isCard:true,
      config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          // VueSwing.Direction.DOWN,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT,
        ],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300,
        isThrowOut: (xOffset, yOffset, element) => {
          const xConfidence = Math.min(
            Math.abs(xOffset) / element.offsetWidth,
            1
          );
          const yConfidence = Math.min(
            Math.abs(yOffset) / element.offsetHeight,
            1
          );
          const throwOutNumber = Math.max(xConfidence, yConfidence);

          if (throwOutNumber === 1) return true;
          return false;
        },
        throwOutConfidence: (xOffset, yOffset) => {
          return {
            leftOffset: -xOffset,
            rightOffset: xOffset,
            topOffset: -yOffset,
          };
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      CARDS: "cards/CARDS",
      CURRENT_CARD: "cards/CURRENT_CARD",
      SMILE: "params/SMILE",
      SAD: "params/SAD",
      HEART: "params/HEART",
    }),
    Card() {
      return this.CARDS.find(
        (element) => Number(element.id) === this.currentInd
      );
    },
    // CurrentCard(){
    //     return this.GET_CURRENT_CARD(this.currentInd)
    //   }
    // arrayOfCard() {
    //   return this.CARDS[this.currentInd-1]
    // }
    // getTranslateXY() {
    //   const transformStyle = document.getElementById(".card").style.transform;
    //   const style = window.getComputedStyle(transformStyle);
    //   const matrix = new DOMMatrixReadOnly(style.transform);
    //   return {
    //     translateX: matrix.m41,
    //     translateY: matrix.m42,
    //   };
    // },
  },
  
  mounted() {
    this.GET_CARDS_FROM_API();
    this.GET_CURRENT_CARD(this.currentInd);
    console.log(this.Card);
  },
  methods: {
    ...mapActions({
      GET_CARDS_FROM_API: "cards/GET_CARDS_FROM_API",
      GET_CURRENT_CARD: "cards/GET_CURRENT_CARD",
    }),
    ...mapMutations({
      ADD_SMILE_PARAMS: "params/ADD_SMILE_PARAMS",
      ADD_SAD_PARAMS: "params/ADD_SAD_PARAMS",
      ADD_HEART_PARAMS: "params/ADD_HEART_PARAMS",
      RESET_PARAMS: "params/RESET_PARAMS",
    }),
    goHome() {
      this.$router.push({ name: "cover" });
    },
    goRetry() {
      this.RESET_PARAMS();
      this.currentInd = 1;
    },
    resetWithMove() {
      if (this.currentInd === this.CARDS.length) {
        this.goRetry();
        this.$router.push({ name: "Final" });
      }
    },
    firstRemedy() {
      // this.isButtonDisabled = true;
      this.ADD_SAD_PARAMS(this.CURRENT_CARD);
      this.print = "Препарат 1";
      this.animation("left");
    },
    secondRemedy() {
      this.ADD_SMILE_PARAMS(this.CURRENT_CARD);
      this.print = "Препарат 2";
      this.animation("up");
    },
    thirdRemedy() {
      this.ADD_HEART_PARAMS(this.CURRENT_CARD);
      this.print = "Препарат 3";
      this.animation("right");
    },
    animation(turn) {
      const ind = gsap.timeline();
      this.isButtonDisabled = true;
      switch (turn) {
        case "left":
          ind.to(".personCard", {
            x: -388,
            duration: 0.5,
            rotate: -15,
            onComplete: () => {
              this.currentInd++;
              ind.revert();
              this.print = "";
              this.isButtonDisabled = false;
            },
          });
          break;
        case "right":
          ind.to(".personCard", {
            x: 388,
            duration: 0.5,
            rotate: 15,
            onComplete: () => {
              this.currentInd++;
              ind.revert();
              this.print = "";
              this.isButtonDisabled = false;
            },
          });
          break;
        case "up":
          ind.to(".personCard", {
            y: -328,
            duration: 0.5,
            rotate: -15,
            onComplete: () => {
              this.currentInd++;
              ind.revert();
              this.print = "";
              this.isButtonDisabled = false;
            },
          });
          break;
      }
      if (this.currentInd === this.CARDS.length) {
        this.$router.push({ name: "Final" });
      }
    },
    onThrowout({ target, throwDirection }) {
      console.log(throwDirection);
      this.print = "";
      setTimeout(() => {
        this.currentInd++;
      }, 100);
      if (this.currentInd === this.CARDS.length) {
        this.$router.push({ name: "Final" });
      }
    },
    left({ target }) {
      this.ADD_SAD_PARAMS(this.CURRENT_CARD);
      target.remove();
    },
    right({ target }) {
      this.ADD_HEART_PARAMS(this.CURRENT_CARD);
      target.remove();
    },
    up({ target }) {
      this.ADD_SMILE_PARAMS(this.CURRENT_CARD);
      target.remove();
    },
    dragNew(event) {
      // console.log(event.target)
      const { leftOffset, rightOffset, topOffset } = event.throwOutConfidence;
      if (topOffset < 50 && leftOffset < 50 && rightOffset < 50) {
        this.print = "";
        return;
      }
      const drugName = (() => {
        if (topOffset > leftOffset && topOffset > rightOffset)
          return "Препарат 2";
        if (leftOffset > rightOffset) return "Препарат 1";
        return "Препарат 3";
      })();
      this.print = drugName;
    },
    dragEnd() {
      this.print = "";

    },
    dragstart() {
      console.log(this.currentInd)
      // this.currentInd++
    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  &__left {
    width: 32.64%;
    min-height: 100vh;
    max-width: 470px;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  &__left::before {
    content: "";
    background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.7;
    z-index: -1;
  }
  &__down {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  &__center {
    margin-bottom: 40.42%;
  }
  &__btns {
    display: flex;
    justify-content: left;
    gap: 38px;
    align-items: center;
    padding-left: 50px;
    padding-top: 70px;
  }
  &__btnHome {
    width: 70px;
    height: 70px;
    object-fit: contain;
    object-position: center;
    border-radius: 100px;
    background: #ffffff;
    cursor: pointer;
  }
  &__btnRetry {
    width: 70px;
    height: 70px;
    object-fit: contain;
    object-position: center;
    border-radius: 100px;
    background: #ffffff;
  }
  &__params {
    font-family: "Montserrat";
    font-size: 36px;
    line-height: 44px;
    color: #ffffff;
    width: 390px;
    padding-left: 40px;
    margin-bottom: 30px;
  }
  &__cure {
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
  &__counter {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 6px;
    padding-top: 6px;
  }
  &__counter::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.15;
    z-index: -1;
    background: #ffffff;
  }
  &__subtitile {
    font-family: "Montserrat";
    font-size: 36px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
    font-weight: lighter;
  }
  &__number {
    font-family: "Montserrat";
    // font-size: 45px;
    // line-height: 55px;
    font-size: 36px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
    font-weight: bold;
  }
  &__right {
    width: 67.36%;
    max-width: 970px;
    position: relative;
    min-height: 100vh;
  }
}
.medicine {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: calc(50% - 45px);
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(131, 42, 64, 0.4);
  border-radius: 40px;
  margin-bottom: 40px;
  &__count {
    font-family: "Montserrat";
    font-size: 48px;
    line-height: 59px;
    text-align: center;
    color: #424242;
    width: 52.63%;
  }
  &__img {
    width: 60px;
    height: 60px;
    object-fit: contain;
    object-position: center;
  }
  &__img-last {
    width: 56px;
    height: 48px;
  }
}
.medicine:last-child {
  margin-bottom: 0;
}
.remedy {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding-left: 30px;
  padding-right: 20px;
  position: absolute;
  top: 89.7%;
  height: 8.8%;
  width: 100%;
  &__name {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 3);
    height: 100%;
    border-radius: 100px;
    border: none;
    font-family: "Montserrat";
    font-size: 28px;
    line-height: 34px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
  }
}
</style>
