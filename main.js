// main.js

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
        const code = result.codeResult.code; // Get the barcode value
        document.getElementById('output').innerText = `Scanned Result: ${code}`; // Display the result

        // Optionally stop the scanner after a successful scan
        Quagga.stop();
    });
}

// Initialize the barcode scanner when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    startBarcodeScanner();
});
