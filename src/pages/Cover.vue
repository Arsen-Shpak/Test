<template>
  <div class="cover">
    <!-- <img :src="Ellipse" alt="Ellipse" class="cover__ellipse"> -->
    <!-- <div class="cover__inside">
      <h3 class="cover__subtitle">Добро пожаловать в игру</h3>
      <h1 class="cover__title">Помоги ФАРМАЦЕВТУ</h1>
      <CoverButton title="Начать" class="cover__button" @coverButton="goNext"/>
    </div> -->
    <div class="cover__inside">
      <h3 class="cover__subtitle">Добро пожаловать в игру</h3>
      <h1 class="cover__title">Помоги ФАРМАЦЕВТУ</h1>
      <CoverButton title="Начать" class="cover__button" @coverButton="goNext"/>
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
      Ellipse:Ellipse,
    }
  },

  methods: {
    goNext() {
      this.$router.push({ name: "main" });
    }
  }
}
</script>
<style lang="scss" scoped>
.hero {
    position: relative; 
    height: 100vh;
    width: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
}

.hero::before {    
      content: "";
      background-image: url('https://placekitten.com/1200/800');
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
    background: linear-gradient(63.53deg, #2D8550 16.62%, #5E6EC2 83.38%);
    // display: flex;
    // align-items: center;
    // justify-content: center;
  // background-image: url(../images/mainBackground.jpg);
  // width: 1445px;
  // height: 1024px;
  // background-size: contain;
  // // opacity: 0.35;
  // position:relative;

  // &__ellipse{
  //   object-fit: contain;
  //   object-position: top;
  //   width: 860px;
  //   // width:calc(100% - 580px);
  //   max-height: 860px;
  //   margin-left: 110px;
  //   position: absolute;
  //   z-index: 1;
  // }

  &__inside{
    // position:absolute;
    // top:250px;
    // left:296px;
    // z-index: 2;
    // background-image: url(../images/Ellipse.png);

    padding: 250px 100px 0 180px;
    left: 110px;
    z-index: 2;
    height: 100%;
    width: 100%;
    max-width: 860px;
    max-height: 860px;
    background-position: top;
    /* z-index: 1; */
    position: relative;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(http://localhost:8080/img/Ellipse.2ed1a530.png);
// }
  }
  &__subtitle{
    font-family: 'Montserrat';
    font-size: 35px;
    line-height: 41px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 29px;
    // width:444px;
  }
  &__title {
    font-family: 'Montserrat';
    font-size: 60px;
    line-height: 66px;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    margin-bottom: 120px;
    // width:580px;
  }
  &__button {
    // position: absolute;
    // left:60px;
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
