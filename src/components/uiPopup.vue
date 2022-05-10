<template>
  <div class="modal" @keydown.esc="handleClose" :class="{ active: popupData.isActive }">
    <div class="modal__container">
      <h3 class="modal__title"> Добавить сотрудника </h3>
      <div class="modal__edit-wrapper">
        <label class="modal__edit-label" for="name">Имя</label>
        <input class="modal__edit-input" id="name" type="text"
               autocomplete="off" v-model="name.name" placeholder="Иван Иванов"/>
        <div v-show='name.error' class="modal-error">{{ name.error }}</div>
      </div>
      <div class="modal__edit-wrapper">
        <label class="modal__edit-label" for="phone">Телефон</label>
        <input class="modal__edit-input" id="phone" type="text"
               autocomplete="off" v-model="phone.phone" placeholder="8 (499) 433-06-98"/>
        <div v-show='phone.error' class="modal-error">{{ phone.error }}</div>
      </div>
      <div>
        <div class="modal__edit-label">Руководитель</div>
        <uiSelect
            :options="flatEmployees"
            :default="flatEmployees[0]"
            :selectChief="selectChief"
            class="select"
        />
      </div>
      <uiButton text="Сохранить" :handler="handleAddNewEmployee"/>
      <button @click='handleClose' class="modal__close">Закрыть</button>
    </div>
  </div>
</template>

<script>
import uiSelect from './uiSelect.vue';
import uiButton from './uiButton.vue';

export default {
  components: {
    uiButton,
    uiSelect,
  },
  data() {
    return {
      name: {
        name: '',
        error: '',
      },
      phone: {
        phone: '',
        error: '',
      },
      chief: '',
    };
  },
  props: ['employees'],
  computed: {
    popupData() {
      return {
        isActive: this.$store.state.popup.isActive,
      };
    },
    flatEmployees() {
      const flatted = [];
      flatted.push({
        name: 'Нет руководителя',
        id: '',
      });
      if (this.employees.length < 1) return flatted;

      const rec = (data) => {
        data.forEach((item) => {
          if (item.subordinates.length > 0) {
            flatted.push({
              name: item.name,
              id: item.id,
            });
            rec(item.subordinates);
          } else {
            flatted.push({
              name: item.name,
              id: item.id,
            });
          }
        });
      };

      rec(this.employees);
      return flatted;
    },
  },
  methods: {
    handleClose() {
      this.name.error = '';
      this.phone.error = '';
      this.$store.state.popup.isActive = false;
    },
    generateId() {
      return `id_${(new Date()).getTime()}`;
    },
    selectChief(chiefId) {
      console.log(chiefId);
      this.chief = chiefId;
    },
    validatePhone(phone) {
      const pattern = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
      return pattern.test(phone);
    },
    // eslint-disable-next-line consistent-return
    handleAddNewEmployee() {
      if (this.name.name.length < 2) {
        this.name.error = 'Имя должно состоять минимум из 2 символов';
        return false;
      }
      this.name.error = '';
      if (!this.validatePhone(this.phone.phone)) {
        this.phone.error = 'Неверный формат телефона';
        return false;
      }
      this.phone.error = '';
      const newEmployee = {
        id: this.generateId(),
        name: this.name.name,
        phone: this.phone.phone,
        subordinates: [],
      };

      this.$store.commit('handleAddingNewEmployee', newEmployee);
    },
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: .2s;

  &.active {
    opacity: 1;
    visibility: visible;
  }

  &__title {
    margin: 0 0 30px 0;
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    font-size: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &__close::before,
  &__close::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -7px;
    width: 14px;
    height: 2px;
    background: #9f9f9f;
  }

  &__close::before {
    transform: rotate(45deg);
  }

  &__close::after {
    transform: rotate(-45deg);
  }

  &__container {
    position: relative;
    overflow: hidden;
    min-width: 350px;
    padding: 30px 20px 30px;
    border-radius: 20px;
    margin: 0 auto;
    background-color: #FFFFFF;
  }

  &__edit {
    display: flex;
    flex-direction: column;
  }

  &__edit-label {
    display: block;
    text-align: left;
    margin-bottom: 10px;
  }

  &__edit-input {
    font-family: 'Source Sans Pro', Arial, sans-serif;
    display: block;
    padding: 10px;
    font-size: 16px;
    line-height: 21px;
    color: #2c3e50;
    border: 1px solid #CED1D9;
    border-radius: 6px;
    width: 100%;

    &::placeholder {
      font-family: 'Source Sans Pro', Arial, sans-serif;
      font-weight: 300;
      color: lightgray;
    }
  }

  &__save {
    display: block;
    margin: 10px auto 0;
    background: #415a77;
    border: none;
    color: #FFFFFF;
    padding: 8px 15px;
    cursor: pointer;
  }

  .modal__edit-wrapper {
    position: relative;
    padding-bottom: 35px;
  }
}

.modal-error {
  color: #943734;
  text-align: left;
  position:absolute;
  bottom: 10px;
  font-size: 14px;
}

</style>
