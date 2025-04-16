<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />

  <Modal></Modal>
  <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
  <div
    class="menu-btn"
    v-if="!isMedium && !sideBar"
    @click="sideBar = !sideBar"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-list"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      />
    </svg>
  </div>
  <div class="container-fluid">
    <div :class="{ 'row m-3': isMedium, 'row mt-3': !isMedium }">
      <div
        class="col-3 border p-3 shadow d-none d-lg-block pageHeight"
        style="border-radius: 12px"
      >
        <h3 class="text-center">{{ this.$store.getters.getname }}</h3>
        <h5 class="text-center">{{ EnterAmountYouHave }}</h5>
        <div class="border shadow mt-3" style="border-radius: 12px">
          <p class="text-center m-0">This month</p>
          <div class="d-flex p-2">
            <div
              class="alert-danger w-100 text-center"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Credit:</p>
              <p class="p-0 m-0 pb-1">₹{{ monthlyCredit }}</p>
            </div>
            <div
              class="w-100 alert-success text-center ms-3"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Debit:</p>
              <p class="p-0 m-0 pb-1">₹{{ monthlyDebit }}</p>
            </div>
          </div>
          <p class="text-center m-0">Yet to</p>
          <div class="shadow" style="border-radius: 12px">
            <div class="d-flex p-2">
              <div
                class="alert-danger w-100 text-center"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Credit:</p>
                <p class="p-0 m-0 pb-1">₹{{ monthlyLent }}</p>
              </div>
              <div
                class="w-100 alert-success text-center ms-3"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Debit:</p>
                <p class="p-0 m-0 pb-1">₹{{ monthlyBorrwed }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="border shadow mt-3" style="border-radius: 12px">
          <p class="text-center m-0">Overall</p>
          <div class="d-flex p-2">
            <div
              class="alert-danger w-100 text-center"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Credit:</p>
              <p class="p-0 m-0 pb-1">₹{{ totalCredit }}</p>
            </div>
            <div
              class="w-100 alert-success text-center ms-3"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Debit:</p>
              <p class="p-0 m-0 pb-1">₹{{ totalDebit }}</p>
            </div>
          </div>
          <p class="text-center m-0">Yet to</p>
          <div class="shadow" style="border-radius: 12px">
            <div class="d-flex p-2">
              <div
                class="alert-danger w-100 text-center"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Credit:</p>
                <p class="p-0 m-0 pb-1">₹{{ totalLent }}</p>
              </div>
              <div
                class="w-100 alert-success text-center ms-3"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Debit:</p>
                <p class="p-0 m-0 pb-1">₹{{ totalBorrwed  }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-3 border-0 shadow"
          style="border-radius: 12px; cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#addsavings"
        >
          <p class="text-center p-3 m-0">Add Savings +</p>
        </div>
        <div
          class="mt-3 border-0 shadow"
          style="border-radius: 12px; cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          <p class="text-center p-3 m-0">Add Transaction +</p>
        </div>
        <div
          v-for="(btn, index) in buttons"
          :key="index"
          @click="goTo(btn.label)"
          class="mt-3 border-0 shadow"
          :class="{ 'bg-primary text-white': $route.params.page === btn.label }"
          style="border-radius: 12px; cursor: pointer"
        >
          <p class="text-center p-3 m-0">{{ btn.label }}</p>
        </div>
        <div
          class="mt-3 border-0 shadow"
          style="border-radius: 12px; cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          v-show="!isMedium"
        >
          <p class="text-center p-3 m-0">Add Transaction +</p>
        </div>
        <div
          class="mt-3 shadow"
          style="
            border: 1px solid #cd1c18;
            border-radius: 12px;
            cursor: pointer;
          "
        >
          <div class="d-flex p-3 justify-content-center" @click="logout()">
            <div class="me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </div>
            <p class="m-0 p-0">LogOut</p>
          </div>
        </div>
        <Modal></Modal>
      </div>
      <div
        :class="{
          'col-9 pageHeight': isMedium,
          'col-12 pageHeight': !isMedium,
        }"
      >
        <div
          style="border-radius: 12px"
          :class="{
            'col-12 border shadow p-3 ms-2': isMedium,
            'border shadow p-3': !isMedium,
          }"
        >
          <div class="d-flex justify-content-between">
            <h3 class="mb-3">
              {{
                $route.params.page
                  ? $route.params.page
                  : "Completed Transactions"
              }}
            </h3>
            <div
              class="me-2"
              v-if="
                getComponent() != 'AllTransactions' &&
                getComponent() != 'PeopleComp'
              "
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"
                />
              </svg>
            </div>
            <div
              class="me-2"
              v-if="getComponent() === 'PeopleComp'"
              data-bs-toggle="modal"
              data-bs-target="#Addperson"
            >
              <p class="btn btn-outline-danger">Add Person</p>
            </div>
            <div
              class="btn-group mb-3"
              v-if="getComponent() === 'AllTransactions'"
            >
              <button
                class="btn btn-secondary btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Transaction Type
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="setType('CompletedTransactions')"
                    >Completed Transactions</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="setType('PlanningtoPay')"
                    >Planning Transactions</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="setType('PeopleComp')"
                    >People</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="#"
                    @click="setType('BorrowedOrLent')"
                    >Borrowed Or Lent</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <component :is="getComponent()"></component>
          <div v-if="getComponent() === 'AllTransactions'" class="card p-3">
            <h5 class="text-success">{{ getSelectedType(selectedType) }}</h5>
            <component
              :is="selectedType"
              v-if="getComponent() === 'AllTransactions'"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="sidebar" v-if="!isMedium" :class="{ 'sidebar show': sideBar }">
    <div class="row bg-white">
      <div class="col-12 border p-3 shadow" style="border-radius: 12px">
        <h3 class="text-center">{{ this.$store.getters.getname }}</h3>
        <div class="menu-btn1" v-if="sideBar" @click="sideBar = !sideBar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </div>
        <h5 class="text-center">{{ EnterAmountYouHave }}</h5>
        <div class="border shadow mt-3" style="border-radius: 12px">
          <p class="text-center m-0">This month</p>
          <div class="d-flex p-2">
            <div
              class="alert-danger w-100 text-center"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Credit:</p>
              <p class="p-0 m-0 pb-1">₹{{ monthlyCredit }}</p>
            </div>
            <div
              class="w-100 alert-success text-center ms-3"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Debit:</p>
              <p class="p-0 m-0 pb-1">₹{{ monthlyDebit }}</p>
            </div>
          </div>
          <p class="text-center m-0">Yet to</p>
          <div class="shadow" style="border-radius: 12px">
            <div class="d-flex p-2">
              <div
                class="alert-danger w-100 text-center"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Credit:</p>
                <p class="p-0 m-0 pb-1">₹{{ monthlyLent }}</p>
              </div>
              <div
                class="w-100 alert-success text-center ms-3"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Debit:</p>
                <p class="p-0 m-0 pb-1">₹{{ monthlyBorrwed }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="border shadow mt-3" style="border-radius: 12px">
          <p class="text-center m-0">Overall</p>
          <div class="d-flex p-2">
            <div
              class="alert-danger w-100 text-center"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Credit:</p>
              <p class="p-0 m-0 pb-1">₹{{ totalCredit }}</p>
            </div>
            <div
              class="w-100 alert-success text-center ms-3"
              style="border-radius: 12px"
            >
              <p class="p-0 m-0 pt-1">Debit:</p>
              <p class="p-0 m-0 pb-1">₹{{ totalDebit }}</p>
            </div>
          </div>
          <p class="text-center m-0">Yet to</p>
          <div class="shadow" style="border-radius: 12px">
            <div class="d-flex p-2">
              <div
                class="alert-danger w-100 text-center"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Credit:</p>
                <p class="p-0 m-0 pb-1">₹{{ totalLent }}</p>
              </div>
              <div
                class="w-100 alert-success text-center ms-3"
                style="border-radius: 12px"
              >
                <p class="p-0 m-0 pt-1">Debit:</p>
                <p class="p-0 m-0 pb-1">₹{{  totalBorrwed }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-3 border-0 shadow"
          style="border-radius: 12px; cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#addsavings"
           @click="sideBar = !sideBar"
        >
          <p class="text-center p-3 m-0">Add Savings +</p>
        </div>
        <div
          v-for="(btn, index) in buttons"
          :key="index"
          @click="goTo(btn.label), sideBar = !sideBar"
          class="mt-3 border-0 shadow"
          :class="{ 'bg-primary text-white': $route.params.page === btn.label }"
          style="border-radius: 12px; cursor: pointer"
        >
          <p class="text-center p-3 m-0">{{ btn.label }}</p>
        </div>
        <div
          class="mt-3 border-0 shadow"
          style="border-radius: 12px; cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          @click="sideBar = !sideBar"
        >
          <p class="text-center p-3 m-0">Add Transaction +</p>
        </div>
        <div
          class="mt-3 shadow"
          style="
            border: 1px solid #cd1c18;
            border-radius: 12px;
            cursor: pointer;
          "
        >
          <div class="d-flex p-3 justify-content-center" @click="logout()">
            <div class="me-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
            </div>
            <p class="m-0 p-0">LogOut</p>
          </div>
        </div>
        <Modal></Modal>
      </div>
    </div>
  </div>
  <div class="modal fade" id="Addperson" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="p-1 d-flex justify-content-end">
          <button
            type="button"
            class="btn-close me-2 mt-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="A">
            <div class="form-floating mb-3 mt-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="Person Name"
                v-model = "personName"
              />
              <label for="floatingInput">Person Name</label>
            </div>
            <div class="w-100">
              <button type="submit" class="btn btn-success w-100">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="addsavings" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Enter Savings</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="addsavings">
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingInput"
                v-model="EnterSavings"
                placeholder="Enter Amount"
              />
              <label for="floatingInput">Enter Amount</label>
            </div>
            <div class="w-100">
              <button type="submit" class="btn btn-success w-100">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/plugins/axios";
import Swal from "sweetalert2";
import CompletedTransactions from "./CompletedTransactions.vue";
import PeopleComp from "./PeopleComp.vue";
import PlanningtoPay from "./PlanningtoPay.vue";
import Modal from "./AddtransactionModal.vue";
import BorrowedOrLent from "./BorrowedOrLent.vue";
import AllTransactions from "./AllTransactions.vue";
import PendingTrans from "./PendingTrans.vue";
import EnterSavings from "./EnterSavings.vue";
import emitter from '@/event-bus';
import swal from "@/swal";
import { loadRouteLocation } from "vue-router";
export default {
  props: {
    page: {
    type: String,
    default: 'Completed Transactions'
  }
  },
  data() {
    return {
      personName : '',
      loading :false,
      buttons: [
        { label: "Completed Transactions", value: "CompletedTransactions" },
        { label: "Planning Transactions", value: "PlanningTransactions" },
        { label: "People", value: "People" },
        { label: "Borrowed Or Lent", value: "BorrowedOrLent" },
        { label: "All Transactions", value: "AllTransactions" },
        { label: "Pending Transactions", value: "PendingTransactions" },
      ],
      isMedium: false,
      mediaQuery: null,
      sideBar: false,
      EnterAmountYouHave: 0,
      selectedType: "CompletedTransactions",
      monthlyDebit: 0,
      totalDebit: 0,
      monthlyCredit: 0,
      totalCredit: 0,
      monthlyBorrwed: 0,
      monthlyLent: 0,
      totalBorrwed: 0,
      totalLent: 0,
      EnterSavings: "",
    };
  },
  computed: {
    gettotalAmount(){
        return this.$store.getters.gettotalAmount;
    }
  },
  components: {
    CompletedTransactions,
    PlanningtoPay,
    PeopleComp,
    BorrowedOrLent,
    AllTransactions,
    PendingTrans,
    Modal,
  },
  methods: {
    async A(){
      this.loading = true
      const UserId = this.$store.getters.getUserId;
        const params ={
                        user_id: UserId,
                        people_names: this.personName
                        }
        try{
          const response = await api.post("/people/add",params)
        }
        catch(err){

        }
        finally{
          this.personName = ''
           this.closeModalperson()
           emitter.emit('transaction-updated');
           swal('Person Added Successfully','success')
           this.loading = false
        }
    },
    logout(){
      sessionStorage.removeItem("userSession");
      this.$router.push('/');
    },
    getSelectedType(name) {
      if (name === "CompletedTransactions") {
        return "Completed Transactions";
      }
      if (name === "PlanningtoPay") {
        return "Planning Transactions";
      }
      if (name === "PeopleComp") {
        return "People";
      }
      if (name === "BorrowedOrLent") {
        return "Borrowed Or Lent";
      }
      if (name === "PendingTrans") {
        return "Pending Transactions";
      }
    },
    getComponent() {
      switch (this.$route.params.page) {
        case "Completed Transactions":
          return "CompletedTransactions";
        case "Planning Transactions":
          return "PlanningtoPay";
        case "People":
          return "PeopleComp";
        case "Borrowed Or Lent":
          return "BorrowedOrLent";
        case "All Transactions":
          return "AllTransactions";
        case "Pending Transactions":
          return "PendingTrans";
        default:
          return "CompletedTransactions"; // fallback
      }
    },
    goTo(label) {
      this.$router.push(`/dashboard/${label}`);
    },
    setType(type) {
      this.selectedType = type; // Update value
    },
    async getWalletAmount() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/wallet/${UserId}`
        );
        this.EnterAmountYouHave = (response.data.balance  );
      } catch (err) {
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      }
      finally{
        this.$store.commit('settotalAmount',this.EnterAmountYouHave)
      }
    },
    async getmonthlyDebitorCredit() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/transactions/monthly/${UserId}`
        );

        const r = response.data;
        r.forEach((element) => {
          this.monthlyCredit = element.total_credit;
          this.monthlyDebit = element.total_debit;
        });
      } catch (err) {}
    },
    async gettotalDebitorCredit() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/transactions/total/${UserId}`
        );

        const r = response.data;
        
        r.forEach((element) => {
          this.totalCredit = element.total_credit;
          this.totalDebit = element.total_debit;
        });
      } catch (err) {}
    },
    async getBorrwedAmount() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/borrowed/total/${UserId}`
        );

        const r = response.data;
        if(r.length === 0){
          this.totalBorrwed = 0
          return
        }
        r.forEach((element) => {
          this.totalBorrwed  = element.total_borrowed;
        });
      } catch (err) {}
    },
    async getLentAmount() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/lent/total/${UserId}`
        );

        const r = response.data;
        if(r.length === 0){
          this.totalLent = 0
          return
        }
        r.forEach((element) => {
          this.totalLent = element.total_lent;
        });
      } catch (err) {}
    },
    async getmonthlyBorrowed() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/borrowed/monthly/${UserId}`
        );

        const r = response.data;
        if(r.length === 0){
          this.monthlyBorrwed = 0
          return
        }

        r.forEach((element) => {
          this.monthlyBorrwed = element.total_borrowed;
        });
      } catch (err) {}
    },
    async getmonthlyLent() {
      try {
        const UserId = this.$store.getters.getUserId;
        const response = await api.get(
          `/lent/monthly/${UserId}`
        );

        const r = response.data;
        
        if(r.length === 0){
          this.monthlyLent = 0
          return
        }

        r.forEach((element) => {
          this.monthlyLent = element.total_lent;
        });
      } catch (err) {}
    },
    checkMediaQuery() {
      this.isMedium = this.mediaQuery.matches;
    },
    async Amount() {
      if (this.EnterAmountYouHave == 0) {
        const { value: Amount } = await Swal.fire({
          title: "Input email address",
          input: "text",
          inputLabel: "Your email address",
          inputPlaceholder: "Enter your email address",
        });
       
        if (Amount) {
          this.EnterAmountYouHave = Amount;
        }
      }
    },
    async addsavings() {
      
      const params = {
        userId: this.$store.getters.getUserId,
        amount: this.EnterSavings,
      };
      this.$store.dispatch('addSavings',params)
      swal('Amount Addedd Successfully','success')
      this.EnterSavings = '';
      this.closeModal()
    },
    closeModal() {
        let modal = document.getElementById("addsavings");
        let bootstrapModal = bootstrap.Modal.getInstance(modal);
        this.EnterSavings = ''
        bootstrapModal.hide();
      },
    closeModalperson() {
        let modal = document.getElementById("Addperson");
        let bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      },
  },
    mounted() {
      emitter.on('transaction-modal', this.getLentAmount);
      emitter.on('transaction-modal', this.getmonthlyDebitorCredit);
      emitter.on('transaction-modal', this.gettotalDebitorCredit);
      emitter.on('transaction-modal', this.getLentAmount);
      emitter.on('transaction-modal', this.getBorrwedAmount);
      emitter.on('transaction-modal', this.getmonthlyLent);
      emitter.on('transaction-modal', this.getmonthlyBorrowed);
      emitter.on('savings-updated', this.getWalletAmount);
},

  beforeUnmount() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.checkMediaQuery);
    }
    emitter.off('transaction-modal');
    emitter.off('savings-updated'); 
        },
  created() {
 
    const storedUser = JSON.parse(sessionStorage.getItem("userSession"));
    this.$store.commit('setUserName',storedUser.name)
    this.$store.commit('setUserId',storedUser.userId)
    this.gettotalDebitorCredit();
    this.getLentAmount();
    this.getmonthlyBorrowed();
    this.getmonthlyLent();
    this.getBorrwedAmount();
    this.getmonthlyDebitorCredit();
    this.getWalletAmount();
    this.mediaQuery = window.matchMedia("(min-width: 992px)");
    this.checkMediaQuery();
    this.mediaQuery.addEventListener("change", this.checkMediaQuery);
  },
};
</script>
<style>
    .loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* Low opacity background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050; /* higher than modals etc. */
}
.sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 320px;
  height: 100%;
  overflow-y: scroll;
  /* background: white; */
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); */
  transition: left 0.3s ease-out;
  padding: 16px;
  border-radius: 10px;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
}
.sidebar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
.sidebar.show {
  left: 0;
}
.menu-btn {
  position: fixed;
  top: 60px;
  left: -5px;
  width: 30px; /* Set width and height to make it a square */
  height: 20px;
  background-color: #cd1c18;
  /* background-color: rgb(56, 56, 150); Optional background */
  /* Makes it a circle */
  border-radius: 0 60% 60% 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}
.menu-btn1 {
  position: absolute;
  top: 60px;
  left: 285px;
  width: 30px; /* Set width and height to make it a square */
  height: 20px;
  background-color: #cd1c18;
  /* background-color: rgb(56, 56, 150); Optional background */
  /* Makes it a circle */
  border-radius: 60% 0 0 60%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* transition: background-color 0.3s; */
  /* transition: right 0.3s ease-out; */
}
.pageHeight {
  max-height: 95vh;
  overflow-y: scroll;
}
.pageHeight::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
