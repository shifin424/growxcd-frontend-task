import Swal from 'sweetalert2';

const useSwal = () => {
  const showError = (message) => {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal2-button',
        cancelButton: 'swal2-button',
      },
    });
  };

  const showSuccess = (message) => {
    return Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal2-button',
        cancelButton: 'swal2-button',
      },
    });
  };

  const showInfo = (message) => {
    return Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'swal2-button',
        cancelButton: 'swal2-button',
      },
    });
  };

  return {
    showError,
    showSuccess,
    showInfo,
  };
};

export default useSwal;