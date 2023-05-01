<template>
  <button class="cover-button" @click="handler">
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
      this.$emit("coverButton");
    },
  },
};
</script>
<style lang="scss" scoped>
.cover-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 381px;
  height: 90px;
  background: #FFFFFF;
  border-radius: 100px;
  border: none;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8E9AD5;

  &:hover {
    cursor: pointer;
    background-color: #a378ff;
  }
}
</style>