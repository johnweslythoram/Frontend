<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    <div class="sidebar2">
        <table class="table table-bordered text-center">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col" colspan="2">Yet to</th>
                <th scope="col" colspan="2">Transacted</th>
                
                </tr>
                <tr class="table-secondary">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Pay</th>
                <th scope="col">Give</th>
                <th scope="col">Payed</th>
                <th scope="col">Given</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(person, index) in listOfPeople" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ person.name_of_person }}</td>
                    <td>{{ person.lent_total}}</td>
                    <td>{{ person.borrowed_total }}</td>
                    <td>{{ person.lent_paid}}</td>
                    <td>{{ person.borrowed_paid }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- <p>{{ listOfPeople }}</p> -->
</template>
<script>
    import api from '@/plugins/axios';
    export default{
        data(){
            return{
                listOfPeople : [],
                loading : false
            }
        },
        components:{
           
        },
        methods:{
            async peopleList(){
                try{
                    this.loading=true
                    const UserId = this.$store.getters.getUserId;
                    const response = await api.get(`/summary/total/${UserId}`);
                    this.listOfPeople = response.data
                }
                catch(err){

                }
                finally{
                    this.loading =false
                }
            }
            
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

.sidebar2 {
    width: 100%;
    overflow-x:scroll;
    /* background: white; */
    /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2); */
    /* transition: left 0.3s ease-out; */
    /* padding: 16px; */
    /* border-radius: 10px; */
    /* scrollbar-width: none;           Firefox */
  -ms-overflow-style: none;  
}
.sidebar2::-webkit-scrollbar {
  display: none;                   /* Chrome, Safari */
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
