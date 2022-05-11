<template>
  <div class="table">
    <employeeTableHead />
    <template v-for="employee in employees">
      <employeeTableRow :key="employee.id" :employee="employee"/>
    </template>
    <div v-if="employees.length < 1" class="table__row empty">
      Список сотрудников пуст
    </div>
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
  border: 1px solid #474766;
  border-bottom: none;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 6px 6px 0 0;

  &__header {
    display: flex;
    border-radius: 6px 6px 0 0;
    background: #EFF4FB;

    .table__cell {
      user-select: none;
      cursor: pointer;
      position: relative;

      &.name.init::after {
        content: '';
        position: absolute;
        right: 10px;
        top: 50%;
        width: 15px;
        height: 15px;
        transform: translateY(-50%);
        background-image: url(/src/assets/icons/down-arrow.svg);
        background-repeat: no-repeat;
        background-color: transparent;
        transition: .2s;
      }

      &.name.ascending::after {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    &.empty {
      width: 100%;
      border-bottom: 1px solid #000000;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &.has-subrow {
      & > .table__cell:first-child {
        position: relative;
        cursor: pointer;

        &::before {
          content: '+';
          width: 20px;
          height: 20px;
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);

          @media(max-width: 600px) {
            left: 2px;
          }
        }
      }

      &.open > .table__cell:first-child::before {
        content: '-';
        font-size: 22px;
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
    font-size: 16px;
    line-height: 20px;
    padding: 10px 20px;
    border-bottom: 1px solid #474766;

    @media(max-width: 600px) {
      padding: 12px 10px;
    }

    &:first-child {
      border-right: 1px solid #474766;
    }
  }
}
</style>
