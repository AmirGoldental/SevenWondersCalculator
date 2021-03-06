
// Calculate:
function Calculate() {
    var text = "";
    var form_inputs = document.getElementsByClassName("form-control");
    var total_points = 0;
    var min_science = 9999;
    for (my_input_field of form_inputs) {
        if (my_input_field.parentElement.parentElement.id == "Science") {
            min_science = Math.min(min_science, Number(my_input_field.value));
            total_points = total_points + Math.pow(Number(my_input_field.value), 2);
            text += "\nScience: " + my_input_field.value + "^2";
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

    text += "\n\nCheck out this cool app for 7 wonders!\n" + window.location.href;
    alert(text)
    try {
        navigator.share({
            files: [],
            title: 'My Points',
            text: text,
        }).then(() => console.log('Share was successful.')).catch((error) =>
            console.log('Sharing failed', error));
    }
    catch (error) {
        console.log('Sharing failed', error);
    }
    return false;
}

function ShareApp() {
    var text = "Check out this cool app for 7 wonders!\n" + window.location.href;
    try {
        navigator.share({
            files: [],
            title: 'Share',
            text: text,
        }).then(() => console.log('Share was successful.')).catch((error) =>
            console.log('Sharing failed', error));
    }
    catch (error) {
        console.log('Sharing failed', error);
    }
    return false;
}

// Reset form:
function ResetForm() {
    window.location.reload(false);
}


// SW:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}

// install button:
let deferredPrompt = null;

function InatallClick() {
    try {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });

    } catch (error) {
        console.log(error)
    }

}

window.addEventListener('load', function () {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('app runs in standalone mode');
        document.getElementsByName("install_button_div")[0].style.display = "none";
    } else {
        console.log('app runs in browser');
        document.getElementsByName("install_button_div")[0].style.display = "block";
    }
})

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show install button:
    window.addEventListener('load', function () {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('app runs in standalone mode');
            document.getElementsByName("install_button_div")[0].style.display = "none";
        } else {
            console.log('app runs in browser');
            document.getElementsByName("install_button_div")[0].style.display = "block";
        }
    })
});
