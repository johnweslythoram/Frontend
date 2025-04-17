<template>
    <!-- Bootstrap Modal -->    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div class="modal fade" id="loginModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="p-1 d-flex justify-content-end">
            <button type="button" class="btn-close me-2 mt-1" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <div class="modal-body">
            <div class="row no-gutters">
                <div class="col-md-8 col-12">
                    <h4>{{ selectedType }}</h4>
                </div>
                    <div v-if="loading" class="loader-overlay">
    <div class="spinner-border" role="status" style="width: 3rem; height: 3rem;">
      <span class="visually-hidden">Loading...</span>
    </div>
    </div>
                <div class="col-12 col-md-4 d-flex justify-content-md-end">
                    <div class="btn-group">
                        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Transaction Type
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#"  @click="setType('Borrowed from Others')">Borrowed</a></li>
                            <li><a class="dropdown-item" href="#"  @click="setType('Lent to Others')">Lent</a></li>
                            <li><a class="dropdown-item" href="#"  @click="setType('Planning to Pay')">Planning</a></li>
                            <li><a class="dropdown-item" href="#"  @click="setType('Transacted')">Transacted</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <form @submit.prevent="OnAdd">
                <div class="form-floating mb-3 mt-3">
                    <input v-model="Trans_details.Trans_Amount" type="number" class="form-control" id="floatingInput" required>
                    <label for="floatingInput">Enter Amount</label>
                </div>
                <div class="row" v-if="selectedType === 'Transacted'">
                    <div class="col-12 col-md-6 mb-2 mb-md-0">
                        <p class="m-0 pb-2 fw-bolder">Detibed or Credited</p>
                    <div class="d-flex">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="creditordebit" id="debit"
                        v-model="Trans_details.Trans_debitOrCredit" value="debit">
                        <label class="form-check-label" for="debit1">
                            Debit
                        </label>
                    </div>
                    <div class="form-check ms-2">
                        <input v-model="Trans_details.Trans_debitOrCredit" value="credit" class="form-check-input" type="radio" name="creditordebit" id="credit">
                        <label class="form-check-label" for="credit">
                            Credit
                        </label>
                    </div>
                    </div> 
                    </div>
                    <div class="col-12 col-md-6" v-if="Trans_details.Trans_debitOrCredit === 'debit'">
                        <p class="m-0 pb-2 fw-bolder">Status Of Transaction</p>
                    <div class="d-flex" >
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="status" id="completed"
                        v-model="Trans_details.status" value="completed">
                        <label class="form-check-label" for="completed">
                            Completed
                        </label>
                    </div>
                    <div class="form-check ms-2">
                        <input v-model="Trans_details.status" value="pending" class="form-check-input" type="radio" name="status" id="pending">
                        <label class="form-check-label" for="pending">
                            Pending
                        </label>
                    </div>
                    </div>
                    </div>
                </div>
                <div class="d-flex" v-if="selectedType === 'Borrowed from Others' || selectedType === 'Lent to Others'">
                    <select v-model="Trans_details.selectedPerson" class="form-select overflow-auto" aria-label=" select example">
                      <option disabled value="">-- Select Person --</option>
                        <option v-for="(person,index) in listOfPeople" :key="index+1" :value="person.people_names">
                          {{ person.people_names }}
                        </option>
                    </select>
                    <div class="px-3" @click="PersonAdd = !PersonAdd">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                      </svg>
                    </div>
                </div>
                <div class="d-flex mt-2" v-if="PersonAdd">
                  <input type="text" class="form-control" v-model="personName" placeholder="Person name">
                  <div class="px-3 pe-0">
                    <button class="btn px-2 btn-success" @click="add_person">Add</button>
                  </div>
                </div>
              <div class="mb-3 mt-3">
                <input  type="text" class="form-control mb-2" v-model="Trans_details.Trans_Title" required placeholder="Transaction Title"/>
                <input type="text" class="form-control mb-2" v-model="Trans_details.Trans_Desc" placeholder="Description"/>
                <input v-if="selectedType === 'Planning to Pay'" type="date" class="form-control" v-model="Trans_details.Trans_date" placeholder="Expected Date" required
                :min="todayDate">
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
  import emitter from '@/event-bus';
  import api from '@/plugins/axios';
import swal from '@/swal';
  export default {
    data() {
      return {
        todayDate: '',
        PersonAdd : false ,
        listOfPeople :[],
        email: "", 
        password: "",
        selectedType: "Transacted",
        Trans_details : {
          Trans_Amount : '',
          Trans_debitOrCredit : 'credit',
          status : 'completed',
          Trans_Title : '',
          Trans_Desc : '',
          selectedPerson: "",
          Trans_date : '',
        },
        loading : false,
      };
    },
    methods: {
      async add_person(){
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
          this.PersonAdd = false
           this.peopleList()
           this.loading = false
        }
      },
      resetForm() {
        
        this.Trans_details = {
                  Trans_Amount: '',
                  Trans_debitOrCredit: "credit",
                  status: "completed",
                  Trans_Title: "",
                  Trans_Desc: "",
                  selectedPerson: "",
                  Trans_date: "",
                };
        },
        async OnAdd() {
          this.loading = true
          const UserId = this.$store.getters.getUserId;
        if(this.selectedType==='Transacted'){
              if(this.Trans_details.Trans_debitOrCredit==='debit'){
                const params = {
                  user_id :  UserId,
                  type : this.Trans_details.Trans_debitOrCredit,
                  amount : this.Trans_details.Trans_Amount,
                  category : this.Trans_details.Trans_Title,
                  description : this.Trans_details.Trans_Desc
                }
                if(this.Trans_details.status === 'pending'){
                  try{
                      const paramsforPending = {
                        user_id :  UserId,
                        amount : this.Trans_details.Trans_Amount,
                        category : this.Trans_details.Trans_Title,
                        description : this.Trans_details.Trans_Desc
                      }
                      const response = await api.post('/pending/add',paramsforPending)

                      emitter.emit('transaction-updated');
                    }catch(err){
                      if(err){
                        swal('Server Error!','info')
                      }
                    }
                    finally{
                      
                 }
                }
                if(this.Trans_details.status === 'completed'){
                  if(params.amount > this.$store.getters.gettotalAmount ){
                    swal("Don't have enough amount to pay","info")
                    this.closeModal();
                    return
                  }
                  try{
                      const response = await api.post('/transactions/add',params)
                      emitter.emit('transaction-updated');
                      emitter.emit('transaction-modal')
                      emitter.emit('savings-updated');
                    }catch(err){
                      if(err){
                        swal('Server Error!','info')
                      }
                    }
                    finally{
                      const params1 = {
                        userId: this.$store.getters.getUserId,
                        amount: params.amount,
                    };
                    this.$store.dispatch('updateSavings',params1)
                 }
                }
              }

              if(this.Trans_details.Trans_debitOrCredit==='credit'){
                const params = {
                  user_id :  UserId,
                  type : this.Trans_details.Trans_debitOrCredit,
                  amount : this.Trans_details.Trans_Amount,
                  category : this.Trans_details.Trans_Title,
                  description : this.Trans_details.Trans_Desc
                }
               
                try{
                  const response = await api.post('/transactions/add',params)
                  
                  emitter.emit('transaction-updated');
                  
                  
                }catch(err){
                  if(err){
                        swal('Server Error!','info')
                      }
                }
                finally{
                  const params1 = {
                        userId: this.$store.getters.getUserId,
                        amount: params.amount,
                    };
                    this.$store.dispatch('addSavings',params1)
                }
              }
        }
        if(this.selectedType === "Borrowed from Others"){
          const params = {
                  user_id :  UserId,
                  amount : this.Trans_details.Trans_Amount,
                  lender_name: this.Trans_details.selectedPerson,
                  reason : this.Trans_details.Trans_Title,
                  description : this.Trans_details.Trans_Desc
                }
                try{
                      const response = await api.post('/borrowed/add',params)
                      
                      emitter.emit('transaction-updated');
                      const params1 = {
                        userId: this.$store.getters.getUserId,
                        amount: params.amount,
                      };
                      this.$store.dispatch('addSavings',params1)

                    }catch(err){
                      if(err){
                        swal('Server Error!','info')
                      }
                    }
                    finally{
                      emitter.emit('transaction-modal');
                 }
        }
        if(this.selectedType === "Lent to Others"){
          const params = {
                  user_id :  UserId,
                  amount : this.Trans_details.Trans_Amount,
                  borrower_name: this.Trans_details.selectedPerson,
                  reason : this.Trans_details.Trans_Title,
                  description : this.Trans_details.Trans_Desc
                }
                if(params.amount > this.$store.getters.gettotalAmount ){
                    swal("Don't have enough amount to Lent","info")
                    this.closeModal();
                    return
                  }
                try{
                      const response = await api.post('/lent/add',params)
                     
                      emitter.emit('transaction-modal');
                      emitter.emit('transaction-updated');
                      emitter.emit('savings-updated')

                    }catch(err){
                      if(err){
                        swal('Server Error!','info')
                      }
                    }
                    finally{
                      const params1 = {
                        userId: this.$store.getters.getUserId,
                        amount: params.amount,
                    };
                    this.$store.dispatch('updateSavings',params1)
                      // emitter.emit('savings-updated');,
                 }
        }
        if(this.selectedType === "Planning to Pay"){
          const date = this.Trans_details.Trans_date; // '2025-04-30'
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const seconds = '00';

          const fullDateTime = `${date}T${hours}:${minutes}:${seconds}`;
          const params = {
                  user_id :  UserId,
                  amount : this.Trans_details.Trans_Amount,
                  due_date: fullDateTime,
                  category : this.Trans_details.Trans_Title,
                  description : this.Trans_details.Trans_Desc
                }

                try{
                      const response = await api.post('/planning/add',params)
                    
                      emitter.emit('transaction-updated');

                    }catch(err){
                      if(err){
                        swal('Server Error!','info')
                      }
                    }
                    finally{
                      
                 }
        }
        this.resetForm()
        this.closeModal();
        emitter.emit('savings-updated')
        this.loading = false
      },
      closeModal() {
        let modal = document.getElementById("loginModal");
        let bootstrapModal = window.bootstrap.Modal.getInstance(modal);
        this.resetForm()
        bootstrapModal.hide();
      },
      setType(type) {
        this.selectedType = type;
        this.resetForm() // Update value
      },
      async peopleList(){
                try{
                    const UserId = this.$store.getters.getUserId;
                    this.loading = true;
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
    created(){
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      this.todayDate = `${yyyy}-${mm}-${dd}`;
      this.peopleList()
    }
  };
  </script>
  <style scoped>
.inputselect {
  max-width: 100% !important;
  overflow-x: hidden;
}
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
