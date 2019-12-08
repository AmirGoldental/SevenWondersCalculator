if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}

function ResetForm() {
    window.location.reload(false);
    //var form_inputs = document.getElementsByClassName("form-control");
    //for (my_input_field of form_inputs) {
    //    my_input_field.value = 0;
    //}

}
