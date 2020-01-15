<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>New user</h3>
            </slot>
          </div>

          <div class="modal-body">
            <label>
              <h3>username</h3>
            </label>
            <input class="form-control" placeholder="username" v-model="username" />
            <br />
            <label>
              <h3>Password</h3>
            </label>
            <input
              class="form-control"
              placeholder="password"
              v-model="password"
            />
            <br />
            <label>
              <h3>Grad</h3>
            </label>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="cityID"
            >
              <option v-for="c in cities" :key="c.cityId" :value="c.cityId">{{
                c.name
              }}</option>
            </select>
            <label>
              <br />
              <h3>Odeljenje</h3>
            </label>
            <select
              class="custom-select"
              id="inputGroupSelect01"
              v-model="departmentID"
            >
              <option v-for="d in departments" :key="d.departmentId" :value="d.departmentId">{{
                d.name
              }}</option>
            </select>
            <br />
            <br />
            <input type="checkbox" v-model="adminStatus" />
            <label class="ml-2" for="checkbox"><strong>Admin</strong></label>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-danger" @click.prevent="$emit('close')">
                Quit
              </button>
              <button class="btn btn-success" @click.prevent="submit">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios.get("/cities").then(res => {
      this.cities = res.data;
    });

    axios.get("/departments").then(res => {
      this.departments = res.data;
    });
  },
  methods: {
    submit() {
      let data = {
        username: this.username,
        password: this.password,
        isAdmin: this.adminStatus,
        department_id: this.departmentID,
        city_id: this.cityID
      };

      axios.post("/users", data).then(res => {
        this.$emit("added");
        this.$emit("close");
      });
    }
  },
  data() {
    return {
      username: "",
      password: "",
      adminStatus: false,
      cities: [],
      departments: [],
      cityID: -1,
      departmentID: -1
    };
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  text-align: left;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
