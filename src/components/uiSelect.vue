<template>
  <div class="custom-select" tabindex="2" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected.name }}
    </div>
    <div class="custom-select__items" :class="{ 'hidden': !open }">
      <div class="custom-select__item" v-for="(option) of options"
           :key="option.id"
           @click="handleChoose(option)">
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'default', 'selectChief', 'isActive'],
  data() {
    return {
      selected: this.default,
      open: false,
    };
  },
  methods: {
    handleChoose(option) {
      this.selected = option;
      this.open = false;
      this.selectChief(option.id);
    },
  },
  watch: {
    isActive(val) {
      if (val === false) [this.selected] = this.options;
    },
  },
};

</script>

<style scoped lang="scss">

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  line-height: 47px;
  margin-bottom: 20px;

  .selected {
    border-radius: 6px;
    font-size: 16px;
    line-height: 21px;
    border: 1px solid #CED1D9;
    color: #000000;
    padding: 10px;
    cursor: pointer;
    user-select: none;

    &::after {
      position: absolute;
      content: "";
      top: 22px;
      right: 1em;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #000000 transparent transparent transparent;
    }

    &.open {
      border-radius: 6px 6px 0 0;
    }
  }

  &__items {
    color: #000000;
    border-radius: 0 0 6px 6px;
    overflow: scroll;
    max-height: 150px;
    border-right: 1px solid #CED1D9;
    border-left: 1px solid #CED1D9;
    border-bottom: 1px solid #CED1D9;
    background-color: #FFFFFF;
    left: 0;
    right: 0;
    z-index: 1;

    &.hidden {
      display: none;
    }
  }

  &__item {
    padding-left: 10px;
    cursor: pointer;
    user-select: none;
    transition: .2s;

    &:hover {
      background-color: #2589FF;
      color: #FFFFFF;
    }
  }
}

</style>
