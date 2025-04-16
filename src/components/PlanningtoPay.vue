<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    <div class="card p-3"
    :class="{'mt-3':planningToPay.length >0}"
    v-for="(trans , index) in planningToPay"
    :key="index">
        <div class="d-flex justify-content-between align-items-center flex-column flex-md-row">
            <h5 class="fw-bolder">{{ trans.category }}</h5>
            <p><span>Expected date : </span>{{ formatDate(trans.due_date) }}</p>
        </div>
        <div class="d-flex justify-content-between">
            <h5>{{ trans.status }}</h5>
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
            <div class="d-flex">
                <div class="ms-3" style="color: green;" @click="TransComp(trans)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                </div>
            </div>
        </div>
        
        <div class="card p-2 bg-light bg-gradient" v-if="activeCards.includes(index)">
            <p class="m-0">{{ trans.description ? trans.description : 'No Description' }}</p>
        </div>
    </div>
    <p>{{ this.$store.totalAmount }}</p> 
</template>
<script>
    import emitter from '@/event-bus';
    import api from '@/plugins/axios';
    import swal from '@/swal';
    export default{
        data(){
            return{
                Active : false,
                planningToPay : [],
                activeCards: [],
                loading : false,
            }
        },
        mounted() {
            emitter.on('transaction-updated', this.getTransacDetails);
            emitter.on('planning-updated', this.getTransacDetails);
        },
        
        beforeUnmount() {
            emitter.off('transaction-updated', this.getTransacDetails);
            emitter.off('planning-updated', this.getTransacDetails);
        },
        methods:{
            async TransComp(trans){
                if(trans.amount > this.$store.getters.gettotalAmount){
                    swal("Don't have enough money to pay",'info')
                    return
                }
                const params = {
                  user_id :  trans.user_id,
                  type : 'debit',
                  amount : trans.amount,
                  category : trans.category,
                  description : trans.desc
                }
                try{
                    this.loading = true
                    const response = await api.post(`planning/delete/${trans.id}`)
                    if(response.data.message === 'Moved to Transactions'){
                        try{
                            const res = await api.post('/transactions/add',params)
                            emitter.emit('transaction-updated');
                        }
                        catch(err){

                        }
                        finally{
                            swal('Transacted Successfully','success')
                        }
                    }
                }
                catch(err){

                }
                finally{
                    const params = {
                        userId: this.$store.getters.getUserId,
                        amount: trans.amount,
                    };
                    this.$store.dispatch('updateSavings',params)
                    emitter.emit('planning-updated');
                    this.loading = false
                }
            },
            async getTransacDetails(){
                try{
                    this.loading = true;
                    const UserId = this.$store.getters.getUserId;
                    const response = await api.get(`/planning/all/${UserId}`)
                     this.planningToPay = response.data
                }
                catch(err){

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
