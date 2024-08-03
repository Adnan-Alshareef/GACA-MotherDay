function downloadImg() {
    var img = new Image();
    img.src = "./images/Mom Card No Lines.jpg";
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    img.onload = function () {
        var fileName = `Mother's Day.jpg`;
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        var name = document.getElementById("uName").value;
        var cardTo = document.getElementById("uTo").value;
        var textX = (img.width) / 2 // here we get the width of name and put it at the center depend on width of (Name)
        var textY = (img.height / 2) + 45
        var textz = (img.height / 2) - 45
        var textc = (img.width) / 2  // here we get the width of title and put it at the center depend on width of (title)

        // White Bluish
        //context.fillStyle = "grey";
        context.fillStyle = "#9ca29c";
        context.font = "45px GR";
        context.textAlign = "center";
        context.fillText(name, textX, textz);
        context.fillStyle = "#9ca29c";
        context.font = "45px GR";
        context.textAlign = "center";
        context.fillText(cardTo, textX, textY);

        // Get the message from the editable div
        var message = document.getElementById('Message').textContent;

        // Set font properties for the message text
        var fontSize = 35; // Adjust font size as needed
        context.font = fontSize + "px GR"; 
        context.textAlign = "center";
        context.fillStyle = "#9f2035"; // Text color

        // Break the message into multiple lines based on canvas width
        var words = message.split(' ');
        var lines = [];
        var line = '';
        var lineHeight = fontSize * 1; // Adjust line height as needed
        var y = (canvas.height + lineHeight * 0.5) / 2 + 130; // Initial y position

        for (var i = 0; i < words.length; i++) {
            var testLine = line + words[i] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > canvas.width * 0.9) { // Adjust width threshold as needed
                lines.push(line);
                line = words[i] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        // Draw each line of text onto the canvas
        for (var j = 0; j < lines.length; j++) {
            context.fillText(lines[j], canvas.width / 2, y);
            y += lineHeight;
        }

        // Save or download the canvas image
        var image = canvas.toDataURL("image/jpeg");
        var link = document.createElement('a');
        link.href = image;
        link.download = fileName;
        link.click();
    };
}
