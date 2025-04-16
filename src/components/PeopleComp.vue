<template>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    <div class="mb-3 mt-2">
        <div class="row">
            <div class="col-6">
                <button 
                class="btn w-100"
                :class="{'btn-color':BorrowedOrLent === 'Transactions',
                    'btn-color-primary': BorrowedOrLent === 'people'
                }"
                @click="BorrowedOrLent = 'Transactions'">Transactions</button>
            </div>
            <div class="col-6">
                <button class="btn w-100" @click="BorrowedOrLent = 'people'"
                :class="{'btn-color':BorrowedOrLent === 'people',
                    'btn-color-primary': BorrowedOrLent === 'Transactions'
                }">People</button>
            </div>
        </div>
    </div>
    <div>
        <component :is="BorrowedOrLent"></component>
    </div>
</template>
<script>
    import api from '@/plugins/axios';
    import PeopleList from './PeopleList.vue';
    import PeopleTransactions from './PeopleTransactions.vue';
    export default{
        data(){
            return{
                BorrowedOrLent : "Transactions",
                Active : false,
                planningToPay : [],
                activeCards: [],
                loading : false,
            }
        },
        components:{
            // 'Borrowed' : BorrowedComp,
            'people' : PeopleList,
            'Transactions' : PeopleTransactions
        },
        methods:{
            
            formatDate(dateString) {
                const date = new Date(dateString);

                const options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
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
            // this.getTransacDetails()
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

    .btn-color{
        background-color: #CD1C18;
        color: #fff;
    }
    .btn-color-primary{
        background-color: #ffa896;
        color: #000;
    }
</style>
