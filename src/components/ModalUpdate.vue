<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Edit</h3>
            </slot>
          </div>

          <div class="modal-body">
            <div class="container col-md-12">
              <div class="row">
                <div class="col-md-6">
                  <label>
                    <h3>UserId</h3>
                  </label>
                  <input class="form-control" readonly="readonly" placeholder="userId" v-model="user.userId" />
                </div>
                <div class="col-md-6"> <label>
                    <h3>Username</h3>
                  </label>
                  <input class="form-control" placeholder="username" v-model="user.username" />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-6">
                  <label>
                    <h3>Name</h3>
                  </label>
                  <input class="form-control" placeholder="name" v-model="user.name" />
                </div>
                <div class="col-md-6">
                  <label>
                    <h3>Last name</h3>
                  </label>
                  <input class="form-control" placeholder="lastname" v-model="user.lastname" />
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-6">
                  <label>
                    <h3>City</h3>
                  </label>
                  <select class="custom-select" id="inputGroupSelect01" v-model="cityID">
                    <option v-for="c in cities" :key="c.CityId" :value="c.CityId">
                      {{
                      c.name
                      }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label>
                    <h3>Department</h3>
                  </label>
                  <select class="custom-select" id="inputGroupSelect01" v-model="departmentID">
                    <option v-for="d in departments" :key="d.departmentId" :value="d.departmentId">
                      {{
                      d.name
                      }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-danger" @click.prevent="$emit('close')">Quit</button>
              <button class="btn btn-success" @click.prevent="submit">Save</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

//  "username": "toma@username.com",
//   "department_id": "2",
//   "city_id": "2"

export default {
  created() {
    axios.get("/cities").then(res => {
      this.cities = res.data;
    });

    axios.get("/departments").then(res => {
      this.departments = res.data;
    });
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    submit() {
      let data = {
        userId: this.user.userId,
        username: this.user.username,
        name: this.user.name,
        lastname: this.user.lastname,
        departmentId: this.departmentID,
        cityId: this.cityID
      };

      axios.put("/users/" + data.userId,  data).then(res => {
        this.$emit("updated");
        this.$emit("close");
      });
    }
  },
  data() {
    return {
      cities: [],
      departments: [],
      cityID: -1,
      departmentID: -1
    };
  }
};
</script>
