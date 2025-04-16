import Swal from 'sweetalert2';

export default function swal(message = '',icon='') {
  Swal.fire({
    icon: icon,
    title: message,
    position : 'top-end',
    timer: 3000,
    showConfirmButton: false,
    toast: true,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
  });
}
