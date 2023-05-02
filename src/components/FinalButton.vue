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
  background: linear-gradient(90deg, #d9d9d9 0%, #a1a1a1 100%);
  border-radius: 100px;
  border: none;
  font-family: "Montserrat";
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  position: absolute;
  bottom: 80px;
  left: 9%;
  &:hover {
    cursor: pointer;
    background-color: #a378ff;
  }
}
</style>
