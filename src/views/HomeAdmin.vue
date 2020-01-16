<template>
  <div class="admin-view">
    <div class="entries">
      <h1>Attendances</h1>
      <v-client-table class="table--mod" :data="tableData1" :columns="columns1" :options="options2"></v-client-table>
    </div>
     <GChart
    type="PieChart"
    :data="chartData"
    :options="chartOptions"
  />
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
import { GChart } from 'vue-google-charts';
export default {
  created() {
    this.updateTable1();
    this.updateTable2();
    this.errorOccured = false;
    this.errorText = "";
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
      columns2: ["userId", "username", "name", "lastname", "Action"],
      tableData2: [],
      options2: {
        perPage: 4,
        texts: {
          count: "",
          filter: "",
          noResults: "Nothing found",
          filterPlaceholder: "Searching.."
        }
      }, 
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Month', 'Attendences']
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
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
            this.errorText = "User "+ e.data.userId+ " has saved Attendaces, therefore it cannot be deleted";
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
          "Janary":0, "Fabruary":0, "March":0, "April":0, "May":0, "June":0, "July":0, "August":0, "September":0, "October":0, "November":0, "December":0          
        }
        this.tableData1 = res.data.map(e => {
          let d = moment(e.checkIn)
            .tz("Europe/Belgrade")
            .format("DD.MM.YYYY HH:mm");
            let index = moment(e.checkIn).tz("Europe/Belgrade").format("MMMM");
          months[index]+=1;

          return {
            userId: e.userId,
            checkIn: d
          };
        });
        Object.entries(months).forEach(m=>{
          this.chartData.push(m);
        });

        console.log(this.chartData);
      });
    },
    updateTable2() {
      axios.get("/users").then(res => {
        this.tableData2 = res.data.map(e => {
          return {
            userId: e.userId,
            username: e.username,
            name: e.name,
            lastname: e.lastname,
            city: "grad",
            odeljenje: "odeljenje",
            data: e
          };
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

.table--mod {
  z-index: 1;
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
