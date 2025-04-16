<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div class="mb-3 mt-2">
        <div class="row">
            <div class="col-6">
                <button 
                class="btn w-100"
                :class="{'btn-color':BorrowedOrLent === 'Borrowed',
                    'btn-color-primary': BorrowedOrLent === 'Lent'
                }"
                @click="BorrowedOrLent = 'Borrowed'">Borrowed</button>
            </div>
            <div class="col-6">
                <button class="btn w-100" @click="BorrowedOrLent = 'Lent'"
                :class="{'btn-color':BorrowedOrLent === 'Lent',
                    'btn-color-primary': BorrowedOrLent === 'Borrowed'
                }">Lent</button>
            </div>
        </div>
    </div>
    <div>
        <component :is="BorrowedOrLent"></component>
    </div>
</template>
<script>
    import api from '@/plugins/axios';
    import BorrowedComp from './BorrowedComp.vue';
    import LentComp from './LentComp.vue';
    export default{
        data(){
            return{
                BorrowedOrLent : "Borrowed",
                Active : false,
                planningToPay : [],
                activeCards: [],
                loading : false,
            }
        },
        components:{
            'Borrowed' : BorrowedComp,
            'Lent' : LentComp
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
