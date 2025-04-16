<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue';
// import TheWelcome from './components/WelcomeItem.vue'
import CompletedTransactions from './components/CompletedTransactions.vue'
import PlanningtoPay from './components/PlanningtoPay.vue'
import MainComp from './components/MainComp.vue'
import Modal from './components/AddtransactionModal.vue'
  export default{
    components:{
      TheWelcome,
      CompletedTransactions,
      PlanningtoPay,
      MainComp,
      Modal,
      HelloWorld
    },
    data(){
      return{
      isMedium: false,
      mediaQuery: null,
      }
    },
    methods:{
            checkMediaQuery() {
                this.isMedium = this.mediaQuery.matches;
            }   
        },
        created() {
            this.mediaQuery = window.matchMedia('(min-width: 992px)');
            this.checkMediaQuery();

            // Add listener for when it changes
            this.mediaQuery.addEventListener('change', this.checkMediaQuery);
        },
        beforeUnmount() {
            // Clean up the event listener
            if (this.mediaQuery) {
            this.mediaQuery.removeEventListener('change', this.checkMediaQuery);
            }
        }
  }
</script>

<template>
 <div>
    <!-- <HelloWorld></HelloWorld> -->
    <!-- <button id="menuButton" class="menu-btn"> -->
      <!-- <TheWelcome></TheWelcome> -->
    <!-- </button> -->
      <!-- <MainComp></MainComp> -->  
       <RouterView></RouterView>

      <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <div class="container mt-5">
    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
      Open Login Modal
    </button>
   <Modal></Modal>
  </div> -->
 </div>
</template>
<style >

</style>

<!-- <template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <div
    v-for="(btn, index) in buttons"
    :key="index"
    @click="Comp = btn.value"
    class="mt-3 border-0 shadow"
    :class="{ 'bg-primary text-white': Comp === btn.value }"
    style="border-radius: 12px; cursor: pointer;"
  >
    <p class="text-center p-3 m-0">{{ btn.label }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Comp: '', // This tracks which button is currently selected
      buttons: [
        { label: 'Completed Transactions', value: 'CompletedTransactions' },
        { label: 'Pending Transactions', value: 'PendingTransactions' },
        { label: 'Refunded Transactions', value: 'RefundedTransactions' },
        { label: 'Cancelled Transactions', value: 'CancelledTransactions' },
        { label: 'All Transactions', value: 'AllTransactions' }
      ]
    };
  }
};
</script> -->
