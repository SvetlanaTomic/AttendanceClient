<template>
  <div class="admin-view">
    <div class="entries">
      <h1>Attendances</h1>
      <div class="row">
        <div class="col col-sm-auto" >
          <v-client-table  
            class="table--mod"
            :data="tableData1"
            :columns="columns1"
            :options="options2"
          ></v-client-table>
        </div>
        <div class="col col-lg-3" style="padding-top:70px">
          <GChart type="PieChart" :data="chartData" :options="chartOptions" />
        </div>
        <div class="col col-lg-3" style="padding-top:70px">
          <GChart type="ColumnChart" :data="chartDataByUser" :options="chartOptionsByUser" />
        </div>
      </div>
    </div>

    <div class="users">
      <h1>Users</h1>
      <button
        type="button"
        class="btn btn-primary"
        id="btn--add"
        @click="modalShow2 = true"
      >Add user</button>
      <transition enter-active-class="animated shake">
        <p id="error" v-if="errorOccured" v-text="errorText"></p>
      </transition>
      <v-client-table class="table--mod" :data="tableData2" :columns="columns2" :options="options2">
        <a slot="Action" slot-scope="props" target="_blank">
          <div class="btn-wrapper">
            <button class="btn btn-info btn--mod" @click="editUser(props.row)">Edit User</button>
            <button class="btn btn-danger btn--mod" @click="deleteUser(props.row)">Delete</button>
          </div>
        </a>
      </v-client-table>
      <modal v-if="modalShow" :user="userEdit" @close="modalShow = false" @updated="updateTable2"></modal>
      <modal2 v-if="modalShow2" @close="modalShow2 = false" @added="updateTable2"></modal2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import tz from "moment-timezone";
import modal from "@/components/ModalUpdate.vue";
import modal2 from "@/components/ModalNewUser.vue";
import { GChart } from "vue-google-charts";
var _ = require("underscore");
export default {
  created() {
    this.updateTable1();
    this.updateTable2();
    this.errorOccured = false;
    this.errorText = "";
    this.getDataByUser();
  },
  components: {
    modal,
    modal2,
    GChart
  },
  data() {
    return {
      userEdit: null,
      modalShow: false,
      modalShow2: false,
      columns1: ["userId", "checkIn"],
      tableData1: [],
      columns2: [
        "userId",
        "username",
        "name",
        "lastname",
        "city",
        "department",
        "Action"
      ],
      tableData2: [],
      options2: {
        perPage: 4,
        texts: {
          count: "",
          filter: "",
          noResults: "Nothing found",
          filterPlaceholder: "Searching.."
        },
        sortable: [
        "userId",
        "username",
        "name",
        "lastname",
        "city",
        "department",
        "Action"
      ],
      },
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [["Month", "Attendences"]],
      chartDataByUser: [["Username", "Attendences"]],
      chartOptions: {
        title: "Attendance by month",
        width: 350,
        height: 300
      },
      chartOptionsByUser: {
        title: "Attendance by user",
        width: 350,
        height: 300,
        legend: { position: "none" }
      }
    };
  },
  methods: {
    editUser(e) {
      this.userEdit = e.data;
      this.modalShow = true;
    },
    deleteUser(e) {
      this.errorOccured = false;
      axios
        .delete("users/" + e.data.userId)
        .then(res => {
          if (res.data == "") {
            this.errorOccured = true;
            this.errorText =
              "User " +
              e.data.userId +
              " has saved Attendaces, therefore it cannot be deleted";
          }
          this.updateTable2();
        })
        .catch(e => {
          this.errorOccured = true;
        });
    },
    updateTable1() {
      axios.get("/attendances").then(res => {
        let months = {
          January: 0,
          Fabruary: 0,
          March: 0,
          April: 0,
          May: 0,
          June: 0,
          July: 0,
          August: 0,
          September: 0,
          October: 0,
          November: 0,
          December: 0
        };
        this.tableData1 = res.data.map(e => {
          let d = moment(e.checkIn)
            .tz("Europe/Belgrade")
            .format("DD.MM.YYYY HH:mm");
          let index = moment(e.checkIn)
            .tz("Europe/Belgrade")
            .format("MMMM");
          months[index] += 1;

          return {
            userId: e.userId,
            checkIn: d
          };
        });
        _.pairs(months).forEach(m => {
          this.chartData.push([m[0], m[1]]);
        });
      });
    },
    updateTable2() {
      axios.get("/cities").then(res => {
        this.cities = res.data;
      

      axios.get("/departments").then(res => {
        this.departments = res.data;
      axios.get("/users").then(res => {
        this.tableData2 = res.data.map(e => {
          return {
            userId: e.userId,
            username: e.username,
            name: e.name,
            lastname: e.lastname,
            city: _.first(_.where(this.cities, { cityId: e.cityId })).name,
            department: _.first(
              _.where(this.departments, { departmentId: e.departmentId })
            ).name,
            data: e
          };
        });
        this.getDataByUser();
      });
      });
      });
    },
    getDataByUser() {
      this.chartDataByUser = [["Username", "Attendences"]];
      axios.get("/attendances/user").then(res => {
        _.pairs(res.data).forEach(m => {
          this.chartDataByUser.push([m[0], m[1]]);
        });
      });
    }
  }
};
</script>

<style lang="scss">
.users {
  position: relative;
}

.btn--mod {
  margin-right: 5px;
}

#btn--add {
  position: absolute;
  top: 3.5em;
  right: 0;
  z-index: 999;
}
.VueTables {
        width: 200x;
        table-layout: fixed;
    }
.table--mod {
  z-index: 1;
  width: 200
}

.admin-view {
  margin: 0 1%;
}

.users {
  margin-top: 25px;
}
.navigation {
  display: inline-flex;
}

.VueTables__limit-field {
  display: none;
}
</style>
