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
        <img
          :src="btnRetry"
          alt="btnRetry"
          class="main__btnRetry"
          @click="goRetry"
        />
      </div>
      <div class="main__down">
        <div class="main__center">
          <h3 class="main__params">Параметри:</h3>
          <div class="main__cure">
            <div class="medicine">
              <img :src="sadIcon" alt="icon" class="medicine__img"/>
              <p class="medicine__count">{{ SAD.length }}</p>
            </div>
            <div class="medicine">
              <img :src="happyIcon" alt="icon" class="medicine__img"/>
              <p class="medicine__count">{{ SMILE.length }}</p>
            </div>
            <div class="medicine">
              <img :src="heartIcon" alt="icon" class="medicine__img-last"/>
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
    
    <!-- <div class="main__counter">
      <p class="main__subtitile">Осталось в очереди:</p>
      <h3 class="main__number"><span style="font-weight: bold">14</span>/15</h3>
    </div> -->
    <main class="main__right">
      <vue-swing
        @throwout="onThrowout"
        :config="config"
        ref="vueswing"
        @throwoutleft="left"
        @throwoutright="right"
        @throwoutup="up"
        @dragmove="drag"

      >
        <PersonCard 
        :person="Card" 
        :print="print" 
        class="personCard" 
        v-for="card in this.CARDS"
        :key="card.id"
        />
      </vue-swing>

      <!-- <Swing></Swing> -->

      <!-- <Swipeable
        class="swiper"
        v-for="card in this.CARDS"
        :key="card.id"
        v-on:swipe="onSwipe"

      >
        <PersonCard 
        :person="Card" 
        :print="print" 
        class="personCard" 
        
        />
      </Swipeable> -->
      <div class="main__remedy remedy">
        <button
          class="remedy__name"
          style="
            background: linear-gradient(266.19deg, #8049c7 0%, #ca57fd 100%);
          "
          @click="firstRemedy"
        >
          Препарат1
        </button>
        <button
          class="remedy__name"
          style="
            background: linear-gradient(266.19deg, #169ae4 0%, #0cc4fa 100%);
          "
          @click="secondRemedy"
        >
          Препарат2
        </button>
        <button
          class="remedy__name"
          style="
            background: linear-gradient(90deg, #FFD748 0.02%, rgba(195, 199, 11, 0.96) 99.97%, #CAC6AB 99.98%, #D3E9E1 99.99%);"
          @click="thirdRemedy"
        >
          Препарат3
        </button>
      </div>
      <!-- <div class="print">
        <p >{{print}}</p>
      </div> -->
    </main>
  </div>
</template>
<script>
// import btnHome from "@/images/btn_home.png";
import btnHome from "@/images/btn_home.svg";
import btnRetry from "@/images/btn_retry.png";
import happyIcon from "@/images/Happy_icon.svg";
import sadIcon from "@/images/Sad_icon.svg";
import heartIcon from "@/images/heart_icon.svg";
import PersonCard from "@/components/PersonCard.vue";
// import Swing from "@/components/Swing.vue";
import { Swipeable } from "vue-swipy";
// import { VueSwing } from 'vue-swing';
import VueSwing from 'vue-swing'
// import { mapActions, mapMutations } from "vuex";
// import 1Person from "@/images/1Person.svg";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { gsap } from "gsap";

export default {
  components: {
    PersonCard,
    Swipeable,
    VueSwing,
    // Swing,
  },
  data() {
    return {
      btnHome: btnHome,
      btnRetry: btnRetry,
      happyIcon: happyIcon,
      sadIcon: sadIcon,
      heartIcon: heartIcon,
      currentInd: 1,
      print:"",
      config: {
        allowedDirections: [
          VueSwing.Direction.UP,
          VueSwing.Direction.DOWN,
          VueSwing.Direction.LEFT,
          VueSwing.Direction.RIGHT
        ],
        minThrowOutDistance: 250,
        maxThrowOutDistance: 300
      },
      // cureList: [
      //   {
      //     img: sadIcon,
      //     count: 1,
      //   },
      //   {
      //     img: happyIcon,
      //     count: 1,
      //   },
      //   {
      //     img: heartIcon,
      //     count: 1,
      //   },
      // ],
      // person: {
      //   id: 1,
      //   img: "Person1.jpg",
      //   name: "Марія, 19 років",
      //   description:
      //     "Бабуся приймає брендовий препарат від болю в суглобах, він допомагає, але занадто дорогий. У Вас є якісний аналог з нижчою ціною? Якщо ні — давайте бренд.",
      // },
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
      // const ind = this.CARDS.indexOf(this.CURRENT_CARD);
      // console.log(ind) ;
      // return this.CARDS.slice(ind, ind + 2);
    },
  },
  mounted() {
    this.GET_CARDS_FROM_API();
    this.GET_CURRENT_CARD(this.currentInd);
    console.log(this.Card);
  },
  updated() {
    this.GET_CURRENT_CARD(this.currentInd);
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
      this.ADD_SAD_PARAMS(this.CURRENT_CARD);
      // this.ADD_SAD_PARAMS(this.Card);
      this.print = "Препарат 1"
      // this.currentInd++
      this.animation("left");
    },
    secondRemedy() {
      this.ADD_SMILE_PARAMS(this.CURRENT_CARD);
      // this.ADD_SAD_PARAMS(this.Card);
      this.print = "Препарат 2"

      // this.currentInd++
      this.animation("up");
    },
    thirdRemedy() {
      this.ADD_HEART_PARAMS(this.CURRENT_CARD);
      // this.ADD_SAD_PARAMS(this.Card);
      this.print = "Препарат 3"

      // this.currentInd++
      this.animation("right");
    },
    animation(turn) {
      const ind = gsap.timeline();
      switch (turn) {
        case "left":

          ind.to(".personCard", {
            x: -388,
            duration: 0.5,
            rotate: -15,
            onComplete: () => {
              this.currentInd++;
              // ind.progress(0)
              ind.revert();
              this.print = ""
            },
          });
          // gsap.to(".print", {
          //   x: -388,
          //   duration: 0.5,
          //   rotate: -30,
          //   onComlete: () => {
          //     this.print = ""
          //   }
          // })
          break;
        case "right":
          ind.to(".personCard", {
            x: 860,
            duration: 0.5,
            rotate: 15,
            onComplete: () => {
              this.currentInd++;
              ind.revert();
              this.print = ""
            },
          });
          // gsap.to(".print", {
          //   x: 860,
          //   duration: 0.5,
          //   rotate: 30,
          //   onComlete: () => {
          //     this.print = ""
          //   }
          // })
          break;
        case "up":
          ind.to(".personCard", {
            y: -328,
            duration: 0.5,
            rotate: -15,
            onComplete: () => {
              this.currentInd++;
              ind.revert();
              this.print = ""

            },
          });
          // gsap.to(".print", {
          //   y: -328,
          //   duration: 0.5,
          //   rotate: -15,
          //   onComlete: () => {
          //     this.print = ""
          //   }
          // })
          break;
      }
      if (this.currentInd === this.CARDS.length) {
        // this.goRetry();
        this.$router.push({name:"Final"})
      }

      // this.resetWithMove();
    },
     onSwipe(direction) {
      // console.log(direction);
      // if (this.currentInd === this.CARDS.length) {
      //   this.goRetry();
      //   this.$router.push({name:"Final"})
      // }
      // this.resetWithMove()

      switch (direction) {
        case "swipe-top":
          // this.thirdRemedy();
          this.ADD_SMILE_PARAMS(this.CURRENT_CARD);
          // this.print = "Препарат 2"

          break;
        case "swipe-left":
          // this.firstRemedy();
          this.ADD_SAD_PARAMS(this.CURRENT_CARD);
          // this.print = "Препарат 1"

          break;
        case "swipe-right":
          // this.secondRemedy();
          this.ADD_HEART_PARAMS(this.CURRENT_CARD);
          // this.print = "Препарат 3"
          break;
      }
     setTimeout(() => {
        this.CARDS.pop();

        // this.CARDS.unshift({
        //   id: Math.random(),
        //   color: getRandomColor(),
        // });
        // this.CARDS.unshift({
        //   id: Math.random(),
        //   img: "Person4.jpg",
        //   name: "Arsen",
        //   description:"oniniln"
        // })
        // this.currentInd++

        this.CARDS.shift();
        this.currentInd++;

        console.log(this.CARDS);
      }, 300);

      if (this.currentInd === this.CARDS.length) {
        // this.goRetry();
        this.$router.push({name:"Final"})
      }
      // this.resetWithMove();


      // this.currentInd++

      // console.log(this.CARDS)
      //   this.CARDS.shift()
    },
    // onDrag(event) {
    //   console.log("drag",event)
    // }
    onThrowout ({ target, throwDirection }) {
      console.log( throwDirection )
      // this.swing()
      setTimeout(() => {
        this.CARDS.pop()
        this.CARDS.shift();
        this.currentInd++;
      }, 100);
      if (this.currentInd === this.CARDS.length) {
        // this.goRetry();
        this.$router.push({name:"Final"})
      }
    },
    left() {
      console.log("left")
      this.ADD_SAD_PARAMS(this.CURRENT_CARD);
      // this.currentInd++;

    },
    right() {
      this.ADD_HEART_PARAMS(this.CURRENT_CARD);
      // this.currentInd++;

    },
    up() {
      this.ADD_SMILE_PARAMS(this.CURRENT_CARD);
      // this.currentInd++;

    },
    drag(event) {
      if(event.offset < 20 || event.offset > -20){
        this.print = ""
      }
       if(event.offset < -50){
        this.print="Препарат 1"
      }
      if(event.offset > 50){
        this.print="Препарат 3"
      }

      // const move = Number(event.offset);
      // console.log(move);
      // switch (move) {
      //   case move < -50:
      //     setTimeOut(()=>{
      //     this.print = "Препарат 1"

      //     })
      //     break
      //   case move > 50:
      //     this.print = "Препарат 3"
      //     break
      // }
    }
  },
};
</script>
<style lang="scss" scoped>
.main {
  display: flex;

  &__left {
    // width: 470px;
    // width: 100%;
    width: 32.64%;
   min-height: 100vh;

    max-width:470px;
    position: relative;
    // height: 100vh;
    display:flex;
    justify-content:space-between;
    flex-direction:column;
  }
  &__left::before {
    content: "";
    background: linear-gradient(63.53deg, #2d8550 16.62%, #5e6ec2 83.38%);
    // background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.7;
    z-index: -1;
    
  }
  &__down {
    display:flex;
    justify-content:space-between;
    flex-direction:column;

  }
  &__center {
    margin-bottom:190px;
  }
  &__btns {
    display: flex;
    justify-content: left;
    gap: 38px;
    align-items: center;
    padding-left: 50px;
    padding-top: 70px;
    // margin-bottom: 290px;
  }
  &__btnHome {
    width: 70px;
    height: 70px;
    object-fit: contain;
    object-position: center;
    // padding: 15px 35px;
    border-radius: 100px;
    background: #ffffff;
    // z-index: 1;
    cursor: pointer;
  }
  &__btnRetry {
    width: 70px;
    height: 70px;
    // padding: 15px 35px;
    object-fit: contain;
    object-position: center;
    border-radius: 100px;
    background: #ffffff;
    // z-index: 1;
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
    // margin-bottom: 190px;
    // margin-bottom: 40.43%;
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
  }
  &__number {
    font-family: "Montserrat";
    font-size: 45px;
    line-height: 55px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
  }
  &__right{
  //  width:970px;
  width: 67.36%;
  //  width:100%;
   max-width:970px;
   position:relative;
   min-height: 100vh;
  }
}
.medicine {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 190px;
  width: calc(50% - 45px);
  // width: calc(100%/2);
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(131, 42, 64, 0.4);
  border-radius: 40px;
  margin-bottom: 40px;
  &__count {
    font-family: "Montserrat";
    font-size: 48px;
    line-height: 59px;
    // display: flex;
    // align-items: center;
    text-align: center;
    color: #424242;
  }
  &__img{
    width: 60px;
    height: 60px;
    object-fit: contain;
    object-position: center;
  }
  &__img-last{
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
  // margin-top: 870px;
  position: absolute;
    top: 89.7%;

  width:100%;
  // position:absolute;
  // bottom:64px;
  // right: 20px;

  &__name {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 280px;
    width:calc(100%/3);
    height: 90px;
    // background: #FFFFFF;
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
// .card {
// position: absolute;
// height: 400px;
// width: 250px;
// border-radius: 8px;
// top:130px;
// right:220px;
// box-shadow: 0px 0px 40px rgba(127, 127, 127, 0.4);
// width: 540px;
// height: 590px;
// border-radius: 40px;
// margin: 130px 210px 150px 220px;
// }
// .swiper{
//   z-index:-2;
//   position:relative;
// }

</style>
