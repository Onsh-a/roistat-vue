<template>
  <div class="table__row"
       :class="{'has-subrow': hasSubordinates(employee),
                'open': isOpened}"
       :key="employee.id" @click.stop="toggleOpenState">
    <div class="table__cell">{{ employee.name }}</div>
    <div class="table__cell">{{ employee.phone }}</div>

    <template v-for="subemployee in employee.subordinates">
      <employeeTableRow :key="subemployee.id"
                        :employee="subemployee"/>
    </template>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-self-import
import employeeTableRow from './employeeTableRow.vue';

export default {
  name: 'employeeTableRow',
  components: {
    employeeTableRow,
  },
  data() {
    return {
      isOpened: false,
    };
  },
  props: ['employee'],
  methods: {
    hasSubordinates(employee) {
      // eslint-disable-next-line no-prototype-builtins
      if (!employee.hasOwnProperty('subordinates')) return false;
      return employee.subordinates.length;
    },
    toggleOpenState() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>
