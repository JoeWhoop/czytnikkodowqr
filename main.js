// main.js

let scannedCode = '';

// Function to start Quagga and scan for barcodes
function startBarcodeScanner() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: document.querySelector('#scanner'), // Camera feed container
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // Use the rear camera
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "upc_reader"] // Barcode formats to scan
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Barcode scanner initialized.");
        Quagga.start(); // Start the scanner
    });

    // When a barcode is detected
    Quagga.onDetected(function(result) {
        scannedCode = result.codeResult.code; // Get the barcode value
        document.getElementById('scanned-result').value = scannedCode; // Display in the input box
        document.getElementById('submit-btn').disabled = false; // Enable the Submit button

        // Optionally stop the scanner after a successful scan
        Quagga.stop();
    });
}

// Function to handle the Submit button click
document.getElementById('submit-btn').addEventListener('click', function() {
    if (scannedCode) {
        alert('Submitted Barcode: ' + scannedCode);
        // You can add additional functionality here, such as sending the scanned code to a server
    }
});

// Initialize the barcode scanner when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    startBarcodeScanner();
});
