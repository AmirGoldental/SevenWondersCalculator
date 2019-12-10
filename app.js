if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('service worker registered'))
        .catch(err => console.log('service worker not registered', err));
}

function ResetForm() {
    window.location.reload(false);
}




let deferredPrompt = null;

function InatallClick() {
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
