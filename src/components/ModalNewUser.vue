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
              <h3>Username</h3>
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
