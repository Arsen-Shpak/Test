<template>
  <div class="final">
    <img :src="btnHome" alt="btnHome" class="final__btnHome" @click="goHome" />
    <div class="wrapper">
      <div class="final__percent percent">
        <div class="percent-wrapper">
          <h4 class="percent__number">{{ sadPercent }}%</h4>
          <p class="percent__name">Препарат1</p>
        </div>
        <div class="percent-wrapper">
          <h4 class="percent__number">{{ smilePercent }}%</h4>
          <p class="percent__name">Препарат2</p>
        </div>
        <div class="percent-wrapper">
          <h4 class="percent__number">{{ heartPercent }}%</h4>
          <p class="percent__name">Препарат3</p>
        </div>
      </div>
      <div class="final__content">
        <h3 class="final__result">Ваш результат:</h3>
        <h2 class="final__question">«Что я здесь делаю?»</h2>
        <p class="final__test">
          Это тестовое задание, так что не будем углубляться в глубины проблем
          фармацевтов.
        </p>
      </div>
    </div>
    <FinalButton title="Попробовать еще" @finalButton="tryAgain" />
    <img :src="finalImg" alt="finalImg" class="final__img" />
  </div>
</template>
<script>
import btnHome from "@/images/btnHome.png";
import finalImg from "@/images/finalImg.png";
import FinalButton from "@/components/FinalButton.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    FinalButton,
  },
  data() {
    return {
      btnHome: btnHome,
      finalImg: finalImg,
    };
  },
  computed: {
    ...mapGetters({
      SMILE: "params/SMILE",
      SAD: "params/SAD",
      HEART: "params/HEART",
    }),
    smilePercent() {
      return Math.round((this.SMILE.length / this.sumParams) * 100);
    },
    sadPercent() {
      return Math.round((this.SAD.length / this.sumParams) * 100);
    },
    heartPercent() {
      return Math.round((this.HEART.length / this.sumParams) * 100);
    },
    sumParams() {
      return this.SMILE.length + this.SAD.length + this.HEART.length;
    },
  },
  mounted() {
    console.log(this.SMILE);
  },
  methods: {
    ...mapMutations({ RESET_PARAMS: "params/RESET_PARAMS" }),
    goHome() {
      this.RESET_PARAMS();
      this.$router.push({ name: "cover" });
    },
    tryAgain() {
      this.RESET_PARAMS();
      this.$router.push({ name: "main" });
    },
  },
};
</script>
<style lang="scss" scoped>
.final {
  &__btnHome {
    object-fit: contain;
    object-position: center;
    width: 70px;
    height: 70px;
    margin-top: 70px;
    margin-left: 50px;
    margin-bottom: 120px;
  }
  &__img {
    object-fit: contain;
    object-position: top;
    width: 46.52%;
    height: 70.31%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
  }
  &__result {
    font-family: "Montserrat";
    font-size: 32px;
    line-height: 35px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #8e9ad5;
  }
  &__question {
    font-family: "Montserrat";
    font-size: 40px;
    line-height: 44px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #8e9ad5;
    margin-bottom: 20px;
  }
  &__content {
    width: 100%;
    max-width: 600px;
  }
  &__test {
    font-family: "Montserrat";
    font-size: 24px;
    line-height: 29px;
    color: #424242;
  }
}
.percent {
  display: flex;
  gap: 20px;
  padding-bottom: 50px;
  border-bottom: 2px solid #d9d9d9;
  width: 44.27%;
  margin-bottom: 40px;
  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 33.33%;
  }
  &__number {
    font-family: "Montserrat";
    font-size: 48px;
    line-height: 59px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #424242;
  }
  &__name {
    font-family: "Montserrat";
    font-size: 16px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #424242;
  }
}
.wrapper {
  position: relative;
  left: 9%;
  max-width: 91%;
}
</style>
