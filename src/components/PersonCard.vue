<template>
  <div class="card">
    <img :src="require('@/images/' + person.img)" alt="img" class="card__img" />
    <div class="card__text">
      <h4 class="card__name">{{ person.name }}</h4>
      <p class="card__description">{{ person.description }}</p>
    </div>
    <!-- <div :class="["print",{"print__one":print==="Препарат 1","print__two":print==="Препарат 2","print_three":print==="Препарат 3"}]">
      <p>{{ print }}</p>
    </div> -->
    <div class="print">
      <p
        :class="[
          { print__one: one },
          { print__two: two },
          { print__three: three },
        ]"
      >
        {{ print }}
      </p>
    </div>
  </div>
</template>
<script>
import { gsap } from "gsap";
export default {
  props: {
    person: {
      type: Object,
      // required: true,
      default() {
        return {};
      },
    },
    print: {
      type: String,
      default() {
        return "";
      },
    },
  },
  // data(){
  //   return {
  //     print:"Препарат 1"
  //   }
  // },
  computed: {
    one() {
      return this.print === "Препарат 1";
    },
    two() {
      return this.print === "Препарат 2";
    },
    three() {
      return this.print === "Препарат 3";
    },
  },
  watch: {
    print: function () {
      gsap.to(".print", {
        // x: -388,
        duration: 0.5,
        rotate: -30,
        // onComlete: () => {
        //   this.print = "";
        // },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  // filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  // box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
  // width: 540px;
  // height: 590px;
  // border-radius: 40px;
  // margin: 130px 210px 150px 220px;
  position: absolute;
  // z-index:-2;
  top: 130px;
  // right: 220px;
  left: 22.7%;
  right: 21.6%;
  box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
  // width: 540px;
  // height: 590px;
  border-radius: 40px;
  &__text {
    // padding: 0 60px 80px;
    margin: 0 auto 80px;
    // width: 420px;
    max-width: 420px;
  }
  &__img {
    margin-bottom: 25px;
    object-fit: contain;
    object-position: center;
    // width: 540px;
    // height: 350px;
    width: 100%;
  }
  &__name {
    font-family: "Montserrat";
    font-size: 32px;
    line-height: 39px;
    color: #8e9ad5;
    margin-bottom: 10px;
  }
  &__description {
    font-family: "Montserrat";
    font-size: 16px;
    line-height: 20px;
    color: #424242;
  }
}
.print {
  font-family: "Montserrat";
  font-size: 52px;
  line-height: 51px;
  // display: flex;
  // align-items: center;
  text-align: center;
  position: absolute;
  top: 300px;
  right: 90px;
  width: 360px;
  &__one {
    border: 8px solid #8049c7;
    color: #8049c7;
  }
  &__two {
    border: 8px solid #169ae4;
    color: #169ae4;
  }
  &__three {
    border: 8px solid #ffca01;
    // border-image-source: linear-gradient(180deg, #FFB903 0%, #FFCA01 100%);
    // color:linear-gradient(180deg, #FFB903 0%, #FFCA01 100%);
    color: #ffca01;
  }
}
</style>
