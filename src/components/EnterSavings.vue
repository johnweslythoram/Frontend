<template>
    <!-- Bootstrap Modal -->    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div class="modal fade" id="savingsmodel" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="p-1 d-flex justify-content-end">
            <button type="button" class="btn-close me-2 mt-1" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
  
          <div class="modal-body">
            <h1>fhuhuhfsuh</h1>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
        selectedType: "Transacted",
        debitOrcredit : 'credit',
        status : 'completed',
      };
    },
    methods: {
      login() {
        alert(`Email: ${this.email}, Password: ${this.password}`);
        this.closeModal();
      },
      closeModal() {
        let modal = document.getElementById("savingsmodel");
        let bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      },
      setType(type) {
        this.selectedType = type; // Update value
      }
    }
  };
  </script>
  