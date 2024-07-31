
// Calculate:
function updateTotal() {
    var form_inputs = document.getElementsByClassName("form-control");
    var total_points = 0;
    var min_science = 9999;
    var science_points = 0;

    for (var my_input_field of form_inputs) {
        if (my_input_field.id === "TotalPoints") continue;
        var value = Number(my_input_field.value) || 0;

        if (my_input_field.parentElement.parentElement.id == "Science") {
            min_science = Math.min(min_science, value);
            science_points += Math.pow(value, 2);
        } else if (my_input_field.id == "Coins") {
            total_points += Math.floor(value / 3);
        } else {
            total_points += value;
        }
    }

    // Add science points
    total_points += science_points + (min_science * 7);

    document.getElementById("TotalPoints").value = total_points;
}

// Call updateTotal when the page loads
window.addEventListener('load', updateTotal);

// Add event listeners to all input fields
window.addEventListener('load', function() {
    var form_inputs = document.getElementsByClassName("form-control");
    for (var input of form_inputs) {
        if (input.id !== "TotalPoints") {
            input.addEventListener('input', updateTotal);
        }
    }
});

function ResetForm() {
    var form_inputs = document.getElementsByClassName("form-control");
    for (var input of form_inputs) {
        input.value = 0;
    }
    updateTotal();
}

function Calculate() {
    var text = "";
    var form_inputs = document.getElementsByClassName("form-control");
    var total_points = 0;
    var min_science = 9999;
    for (my_input_field of form_inputs) {
        if (my_input_field.id === "TotalPoints") continue;

        if (my_input_field.parentElement.parentElement.id == "Science") {
            min_science = Math.min(min_science, Number(my_input_field.value));
            total_points = total_points + Math.pow(Number(my_input_field.value), 2);
            text += "\nScience: " + my_input_field.value + "^2";
        }  else if (my_input_field.id == "Coins") {
          total_points += Math.floor(Number(my_input_field.value) / 3);
          text += "Points from coins: " +  String(Math.floor(Number(my_input_field.value) / 3));
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
    text += "\nScience combo: " + min_science + "*7";
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

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  const installButtonDiv = document.querySelector('[name="install_button_div"]');
  if (installButtonDiv) {
    installButtonDiv.style.display = 'block';
  }
}

function InstallClick() {
  if (!deferredPrompt) {
    console.log('Can\'t install the app, no prompt available');
    return;
  }

  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
    hideInstallButton();
  });
}

function hideInstallButton() {
  const installButtonDiv = document.querySelector('[name="install_button_div"]');
  if (installButtonDiv) {
    installButtonDiv.style.display = 'none';
  }
}

window.addEventListener('load', function () {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('app runs in standalone mode');
    hideInstallButton();
  } else {
    console.log('app runs in browser');
    if (deferredPrompt) {
      showInstallButton();
    }
  }
});


