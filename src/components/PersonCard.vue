<template>
  <div class="card">
    <img :src="require('@/images/' + person.img)" alt="img" class="card__img" />
    <div class="card__text">
      <h4 class="card__name">{{ person.name }}</h4>
      <p class="card__description">{{ person.description }}</p>
    </div>
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
      required: true,
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
      if (this.print === "Препарат 3") {
        gsap.to(".print", {
          duration: 1,
          rotate: 30,
        });
      } else {
        gsap.to(".print", {
          duration: 0.5,
          rotate: -30,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  position: absolute;
  top: 12.7%;
  left: 22.7%;
  right: 21.6%;
  box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);

  border-radius: 40px;
  &__text {
    margin: 0 60px 80px 60px;
    max-width: 420px;
  }
  &__img {
    border-radius: 40px 40px 0 0;
    margin-bottom: 25px;
    object-fit: contain;
    object-position: center;

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
    color: #ffca01;
  }
}
</style>
