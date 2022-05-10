<template>
  <div id="app">
    <uiPopup :employees="getEmployees" />
    <div class="container">
      <employeeTable :employees="getEmployees" />
      <uiButton text="Добавить сотрудника" :handler="openAddPopup"/>
    </div>
  </div>
</template>

<script>
import employeeTable from './components/employeeTable.vue';
import uiButton from './components/uiButton.vue';
import uiPopup from './components/uiPopup.vue';

export default {
  name: 'App',
  components: {
    employeeTable,
    uiPopup,
    uiButton,
  },
  computed: {
    getEmployees() {
      return this.$store.state.staff;
    },
  },
  methods: {
    openAddPopup() {
      this.$store.commit('setPopupActivity', true);
    },
  },
  async created() {
    const url = '/mock.json';
    let response = await fetch(url);
    if (!response.ok) return false;
    response = await response.json();
    return this.$store.commit('setMockData', response);
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

@font-face {
  font-family: 'Source Sans Pro';
  src:  url('assets/fonts/SourceSansPro-Regular.ttf') format('truetype');
  font-weight: 400;
}

@font-face {
  font-family: 'Source Sans Pro';
  src:  url('assets/fonts/SourceSansPro-Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: 'Source Sans Pro';
  src:  url('assets/fonts/SourceSansPro-SemiBold.ttf') format('truetype');
  font-weight: 600;
}

#app {
  font-family: Source Sans Pro, Arial, sans-serif;
}

.container {
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
}

</style>
