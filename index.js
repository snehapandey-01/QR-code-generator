let imgBox = document.getElementById("imgbox");
let qrImage = document.getElementById("qrimage");
let qrText = document.getElementById("qrtext");
let downloadLink = document.getElementById("downloadLink");

function GenerateQR() {
    if (qrText.value.length > 0) {
        let qrData = encodeURIComponent(qrText.value);
        let qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrData;

        // Update the QR image source
        qrImage.src = qrUrl;
        // Show the image container
        imgBox.classList.add("show-img");
        
        // Update the download link
        qrImage.onload = function() {
            downloadQRCode(qrUrl); // Call downloadQRCode with the generated QR URL
        };
    } else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 1000);
    }
}

function downloadQRCode(url) {
    // Create a canvas element
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;

    // Draw the image on the canvas
    let img = new Image();
    img.crossOrigin = "Anonymous"; // Ensure CORS is handled
    img.onload = function() {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        let imageData = canvas.toDataURL("image/png");

        // Update the download link
        downloadLink.href = imageData;
        downloadLink.style.display = "inline"; // Show the download button
    };
    img.src = url; // Set the image source to the QR code URL
}
