<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    <div class="card p-3"
            :class="{'mt-3':CompletedTransac.length >0}"
        v-for="(trans , index) in CompletedTransac"
        :key="index">
        <div class="d-flex justify-content-between align-items-center flex-column flex-md-row">
            <h5 class="fw-bolder">{{ trans.category }}</h5>
            <p>{{ formatDate(trans.transaction_date) }}</p>
        </div>
        <div class="d-flex justify-content-between">
            <h5>Completed[{{ trans.type }}]</h5>
            <p class="fw-bolder">₹{{ trans.amount }}</p>
        </div>
        <div class="d-flex justify-content-between">
            <div class="d-flex justify-content-center">
                <p style="color: #CD1C18;;">Show Details</p>
                <div class="ms-1" @click="toggleActive(index)" v-if="!activeCards.includes(index)" style="color: #CD1C18;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
                <div class="ms-1" @click="toggleActive(index)" v-if="activeCards.includes(index)" style="color: #CD1C18;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="card p-2 bg-light bg-gradient" v-if="activeCards.includes(index)">
            <p class="m-0">{{ trans.description ? trans.description : 'No Description' }}</p>
        </div>
    </div>
    <!-- <p class="m-0">{{ CompletedTransac }}</p> -->
</template>
<script>
import api from '@/plugins/axios';
import emitter from '@/event-bus';
    export default{
        data(){
            return{
                activeCards: [],
                CompletedTransac : [],
                loading :false
            }
        },
        mounted() {
            emitter.on('transaction-updated', this.getTransacDetails);
        },

        beforeUnmount() {
            emitter.off('transaction-updated', this.getTransacDetails);
        },
        methods:{
            async getTransacDetails(){
                try{
                    this.loading = true;
                    const UserId = this.$store.getters.getUserId;
                    const response = await api.get(`/transactions/all/${UserId}`)
                     this.CompletedTransac = response.data
                }
                catch(err){
                    if(err){
                        swal('Server Error!','info')
                      }
                }
                finally{
                    this.loading = false;
                }
            },
            formatDate(dateString) {
                const date = new Date(dateString);

                const options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                };

                return new Intl.DateTimeFormat('en-GB', options).format(date);
            },
            toggleActive(index) {
                const i = this.activeCards.indexOf(index);
                if (i > -1) {
                    this.activeCards.splice(i, 1); // remove if already active
                } else {
                    this.activeCards.push(index); // add to active list
                }
            }
        },
        created(){
            this.getTransacDetails()
        }
    }
</script>
<style scoped>
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
</style>