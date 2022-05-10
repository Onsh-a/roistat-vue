<template>
  <div class="table">
    <employeeTableHead />
    <template v-for="employee in employees">
      <employeeTableRow :key="employee.id" :employee="employee"/>
    </template>
  </div>
</template>

<script>
import employeeTableHead from './employeeTableHead.vue';
import employeeTableRow from './employeeTableRow.vue';

export default {
  name: 'employeeTable',
  components: {
    employeeTableHead,
    employeeTableRow,
  },
  props: ['employees'],
};
</script>

<style lang='scss'>

.table {
  border: 1px solid #000000;
  border-bottom: none;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;

  &__row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    &.has-subrow {
      position: relative;
      cursor: pointer;

      &::before {
        content: '+';
        width: 20px;
        height: 20px;
        position: absolute;
        left: 5px;
        top: 32px;
        transform: translateY(-50%);
      }

      &.open::before {
        content: '-';
      }

      .table__row {
        display: none;
      }

      &.open > .table__row {
        display: flex;
      }
    }
  }

  &__cell {
    width: 50%;
    padding: 20px;
    border-bottom: 1px solid #000000;

    &:first-child {
      border-right: 1px solid #000000;
    }
  }
}
</style>
