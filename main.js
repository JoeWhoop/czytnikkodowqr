// main.js

let scannedCode = '';

// Function to start Quagga and scan for barcodes
function startBarcodeScanner() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: document.querySelector('#scanner'), // Camera feed container
            constraints: {
                width: 480,  // Lower resolution for faster processing
                height: 320,
                facingMode: "environment" // Use the rear camera
            }
        },
        locator: {
            halfSample: true, // Reduces resolution for faster localization
            patchSize: "medium" // Options: "x-small", "small", "medium", "large", "x-large"
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader"] // Only necessary formats for faster decoding
        },
        locate: true,
        frequency: 10 // Process every 10th frame for better performance
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
        document.getElementById('retry-btn').disabled = false; // Enable the Retry button
        Quagga.stop(); // Stop the scanner after a successful scan
    });
}

// Function to handle the Submit button click
document.getElementById('submit-btn').addEventListener('click', function() {
    if (scannedCode) {
        alert('Submitted Barcode: ' + scannedCode);
        // Add additional functionality here, such as sending the scanned code to a server
    }
});

// Function to handle the Retry button click
document.getElementById('retry-btn').addEventListener('click', function() {
    scannedCode = '';
    document.getElementById('scanned-result').value = ''; // Clear the scanned result
    document.getElementById('submit-btn').disabled = true; // Disable the Submit button
    document.getElementById('retry-btn').disabled = true; // Disable the Retry button
    startBarcodeScanner(); // Restart the scanner
});

// Initialize the barcode scanner when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    startBarcodeScanner();
});
