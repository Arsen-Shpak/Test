<template>
  <button class="final-button" @click="handler">
    {{ title }}
  </button>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  methods: {
    handler() {
      this.$emit("finalButton");
    },
  },
};
</script>
<style lang="scss" scoped>
.final-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 60px;
  background: linear-gradient(90deg, #D9D9D9 0%, #A1A1A1 100%);;
  border-radius: 100px;
  border: none;
  font-family: 'Montserrat';
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  position: absolute;
  bottom: 80px;
  left: 9%;
  &:hover {
    cursor: pointer;
    background-color: #a378ff;
  }
}
</style>