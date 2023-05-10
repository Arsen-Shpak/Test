<template>
  <div class="cover">
    <div class="cover__inside">
      <p class="cover__subtitle">Добро пожаловать в игру</p>
      <h1 class="cover__title">Помоги ФАРМАЦЕВТУ</h1>
      <CoverButton title="Начать" class="cover__button" @coverButton="goNext" />
    </div>
  </div>
</template>
<script>
import Ellipse from "@/images/Ellipse.png";
import CoverButton from "@/components/coverButton.vue";

export default {
  components: {
    CoverButton,
  },

  data() {
    return {
      Ellipse: Ellipse,
    };
  },

  methods: {
    goNext() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>
<style lang="scss" scoped>
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
}

.hero::before {
  content: "";
  background-image: url("https://placekitten.com/1200/800");
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.75;
}

.cover {
  position: relative;
  height: 100vh;
  width: 100%;
  background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
  &__inside {
    padding: 250px 100px 0 180px;
    left: 110px;
    z-index: 2;
    height: 100%;
    width: 100%;
    max-width: 860px;
    max-height: 860px;
    background-position: top;
    position: relative;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(http://localhost:8080/img/Ellipse.2ed1a530.png);
  }
  &__subtitle {
    font-family: "Montserrat";
    font-size: 35px;
    line-height: 41px;
    letter-spacing: 0.02em;
    color: #ffffff;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 29px;
  }
  &__title {
    font-family: "Montserrat";
    font-size: 60px;
    line-height: 66px;
    letter-spacing: 0.02em;
    color: #ffffff;
    margin-bottom: 120px;
  }
  &__button {
    margin-left: 60px;
  }
}
.cover::before {
  content: "";
  background-image: url(../images/mainBackground.jpg);
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  opacity: 0.35;
}
</style>
