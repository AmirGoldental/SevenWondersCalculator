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

function Calculate() {
    var text = "";
    var form_inputs = document.getElementsByClassName("form-control");
    var total_points = 0;
    var min_science = 9999;
    for (my_input_field of form_inputs) {
        if (my_input_field.id == "Science") {
            min_science = Math.min(min_science, Number(my_input_field.value));
            total_points = total_points + Math.pow(Number(my_input_field.value), 2);
            text += "\n" + my_input_field.id + ": " + my_input_field.value + "^2";
        } else {
            total_points = total_points + Number(my_input_field.value);
            if (text == "") {
                text += my_input_field.id + ": " + my_input_field.value;
            } else {
                text += "\n" + my_input_field.id + ": " + my_input_field.value;
            }
        }
    }
    total_points = total_points + min_science * 7;
    text += "\nScience combo:" + min_science + "*7";
    text += "\nYou have: " + total_points + " points!"
    alert(text)

    if (navigator.canShare) {
        navigator.share({
            files: [],
            title: 'My Points',
            text: text,
        })
            .then(() => console.log('Share was successful.'))
            .catch((error) => console.log('Sharing failed', error));
    } else {
        console.log(`Your system doesn't support sharing files.`);
    }
    return false;
}