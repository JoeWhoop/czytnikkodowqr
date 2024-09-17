// main.js

// Function to handle successful scans
function onScanSuccess(qrCodeMessage) {
    // Display the scanned QR code message
    const output = document.getElementById('output');
    output.innerText = `Scanned Result: ${qrCodeMessage}`;

    // Optionally, you can perform additional actions with the scanned data here

    // Stop the scanner after a successful scan
    html5QrCodeScanner.clear().then(_ => {
        console.log("Scanner stopped after successful scan.");
    }).catch(error => {
        console.error("Failed to clear the scanner.", error);
    });
}

// Function to handle scan errors (optional)
function onScanError(errorMessage) {
    // You can log scan errors or display them to the user if desired
    console.warn(`Scan error: ${errorMessage}`);
}

// Initialize the QR code scanner when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const html5QrCodeScanner = new Html5QrcodeScanner(
        "reader", 
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
    );

    // Start scanning and specify the callback functions
    html5QrCodeScanner.render(onScanSuccess, onScanError);
});
