<template>
  <button class="ui-button" @click="handler">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: ['text', 'handler'],
};
</script>

<style scoped lang="scss">

.ui-button {
  font-family: Source Sans Pro, Arial, sans-serif;
  background: #2589FF;
  border-radius: 6px;
  min-height: 36px;
  font-size: 14px;
  padding: 0 10px;
  line-height: 18px;
  text-align: center;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  transition: .2s;

  &:hover {
    background: #2175D9;
  }
}
</style>
