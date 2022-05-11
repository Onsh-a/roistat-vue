<template>
  <div class="table__header">
      <div class="table__cell name" @click="sortByName"
           :class="{ ascending: isSortAscending, init: isSortInited }">Имя</div>
      <div class="table__cell">Телефон</div>
  </div>
</template>

<script>
export default {
  name: 'employeeTableHead',
  data() {
    return {
      isSortAscending: false,
      isSortInited: false,
    };
  },
  methods: {
    sortByName() {
      this.isSortInited = true;
      this.isSortAscending = !this.isSortAscending;
      this.$store.commit('sortByName', this.isSortAscending);
    },
  },
};
</script>
