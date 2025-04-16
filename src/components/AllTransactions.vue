<template>
    
    <!-- <p>{{ this.planningToPay }}</p>  -->
</template>
<script>
    import api from '@/plugins/axios';
    export default{
        data(){
            return{
                Active : false,
                planningToPay : [],
                activeCards: [],
                loading : false,
            }
        },
        methods:{
            async getTransacDetails(){
                try{
                    this.loading = true;
                    const UserId = this.$store.getters.getUserId;
                    const response = await api.get(`/transactions/all_whole/${UserId}`)
                     this.planningToPay = response.data
                }
                catch(err){

                }
                finally{
                    this.loading = false;
                }
            },
            setType(type) {
                this.selectedType = type; // Update value
            },
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
