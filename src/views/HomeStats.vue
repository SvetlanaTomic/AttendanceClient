<template>
  <div class="stats">
    <div class="table-wrapper">
      <div class="buttons">
        <button type="button" class="btn btn-success btn--mod" @click="checkIn">
          Confirm attendance
          <i class="fas fa-check" style="color:white"></i>
        </button>
        <button type="button" class="btn btn-success btn--mod" @click="downloadPdf">
          Download Table as PDF
          <i class="fas fa-file-download"></i>
        </button>
      </div>

      <v-client-table class="table--mod" :data="tableData" :columns="columns" :options="options"></v-client-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import moment from "moment";
import tz from "moment-timezone";

export default {
  created() {
    this.updateTable();
  },
  data() {
    return {
      columns: ["date"],
      tableData: [],
      options: {
        perPage: 10,
        texts: {
          count: "",
          filter: "",
          noResults: "Nothing found",
          filterPlaceholder: "Searching.."
        }
      }
    };
  },
  methods: {
    ...mapActions(["errorAppeared"]),
    ...mapGetters(["getUser"]),
    checkIn() {
      let attendance = {
        userId: this.getUser().userId,
        checkIn: new Date().toJSON()
      };
      axios.post("/attendances", attendance).then(e => {
        this.updateTable();
      });
      this.errorAppeared("Successfully loged in");
    },
    downloadPdf() {
      let doc = new jsPDF();
      let head = [["CheckIN"]];
      let rows = [];
      let itemNew = this.tableData;

      itemNew.forEach(element => {
        let temp = [];
        temp.push(element.date);
        rows.push(temp);
      });
      doc.setFontSize(40);

      doc.text("Attendance", 15, 20);
      console.log(head);
      doc.autoTable({
        head,
        body: rows,
        startY: 35
      });
      doc.save("Attendance.pdf");
    },
    updateTable() {
      let user = this.getUser().userId;
      axios.get("/attendances/user/" + user).then(res => {
        this.tableData = [];
        let dateData = res.data.forEach(e => {
          let d = moment(e.checkIn)
            .tz("Europe/Belgrade")
            .format("DD.MM.YYYY HH:mm");

          this.tableData.push({
            date: d
          });
        });
        this.tableData = this.tableData.reverse();
      });
    }
  }
};
</script>

<style lang="scss">
.stats {
  .table--mod {
    position: relative;
  }
  .table {
    color: #2c3e50;
  }
  .btn-sucess {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 60px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
  }
  .btn--mod {
    margin: 5px;
  }
  .buttons {
    position: absolute;
    left: 0;
    z-index: 999;
    margin-left: 1%;
    margin-top: -3px;
    font-size: 19px;
    display: inline-flex;
  }
  .table-wrapper {
    margin: 0 1%;
  }
  .form-group {
    float: right;
  }
}
</style>
