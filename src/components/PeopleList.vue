<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    <div>
        <table class="table table-bordered text-center">
            <thead class="table-secondary">
                <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(person, index) in listOfPeople" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ person.people_names }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <p>{{ listOfPeople }}</p> -->
</template>
<script>
    import emitter from '@/event-bus';
    import api from '@/plugins/axios';
    export default{
        data(){
            return{
                listOfPeople : [],
                loading : false,
            }
        },
        components:{
           
        },
        methods:{
            async peopleList(){
                try{
                    this.loading = true;
                    const UserId = this.$store.getters.getUserId;
                    const response = await api.get(`/people/${UserId}`);
                    this.listOfPeople = response.data
                }
                catch(err){

                }
                finally{
                    this.loading = false
                }
            }
            
        },
        mounted() {
            emitter.on('transaction-updated', this.peopleList);
        },

        beforeUnmount() {
            emitter.off('transaction-updated', this.peopleList);
        },
        created(){
            this.peopleList()
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
