if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}

function ResetForm() {
    window.location.reload(false);
}

// install button:
window.addEventListener('load', function () {
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('app runs in standalone mode');
        document.getElementsByName("install_button_div")[0].style.display = "none";
        document.getElementsByName("install_button")[0].style.display = "none";
    } else {
        console.log('app runs in browser');
        document.getElementsByName("install_button_div")[0].style.display = "block";
        document.getElementsByName("install_button")[0].style.display = "block";
    }
})


let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
});

async function install() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        console.log(deferredPrompt)
        deferredPrompt.userChoice.then(function (choiceResult) {

            if (choiceResult.outcome === 'accepted') {
                console.log('Your PWA has been installed');
            } else {
                console.log('User chose to not install your PWA');
            }

            deferredPrompt = null;

        });


    }
}
