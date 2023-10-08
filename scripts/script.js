document.addEventListener('DOMContentLoaded', function () {
    const quoteElement = document.querySelector('.quote');
    const authorElement = document.querySelector('.author');
    const imageElement = document.querySelector('.centered-image');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d'); 


    
    const imageFilenames = [
        "1.jpg",
        "2.jpg",
        "3.jpg",
        "4.jpeg",
        "5.jpg",
        "6.jpeg",
        "7.jpeg",
        "8.jpeg",
        "9.jpeg",
        "10.jpeg",
        // Add more image filenames here
    ];

    // Function to fetch a random quote from the local JSON file
    function fetchRandomQuote() {
        fetch('./res/quotes.json') // Load the local JSON file
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const quoteText = data[randomIndex].q;
                const author = data[randomIndex].a;

                // Update the quote and author elements with the fetched data
                quoteElement.textContent = `"${quoteText}"`;
                authorElement.textContent = `— ${author}`;
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                quoteElement.textContent = 'Failed to fetch a quote.';
                authorElement.textContent = '';
            });
    }

    // Function to analyze the image and change the background color
    function analyzeImageAndChangeBackgroundColor(imageUrl) {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Enable cross-origin access to the image
        img.src = imageUrl;

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            // Analyze the colors in the image (you can customize this part)
            const pixelData = context.getImageData(0, 0, img.width, img.height).data;
            // Calculate the average color or choose a dominant color from the pixel data
            const averageColor = calculateAverageColor(pixelData);

            // Set the background color based on the analyzed color
            document.body.style.backgroundColor = `rgb(${averageColor[0]}, ${averageColor[1]}, ${averageColor[2]})`;
        };
    }

    // Function to calculate the average color from pixel data
    function calculateAverageColor(pixelData) {
        // You can customize this function to calculate the color as needed
        // For simplicity, let's calculate the average color of the entire image
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;

        for (let i = 0; i < pixelData.length; i += 4) {
            sumR += pixelData[i];
            sumG += pixelData[i + 1];
            sumB += pixelData[i + 2];
        }

        const totalPixels = pixelData.length / 4;
        const avgR = Math.round(sumR / totalPixels);
        const avgG = Math.round(sumG / totalPixels);
        const avgB = Math.round(sumB / totalPixels);

        return [avgR, avgG, avgB];
    }

    // Function to load a random image
    function loadRandomImage() {
        const randomIndex = Math.floor(Math.random() * imageFilenames.length);
        const randomImageFilename = imageFilenames[randomIndex];
        const imageUrl = 'images/' + randomImageFilename;
        imageElement.src = imageUrl;

        // Analyze the image and change the background color
        analyzeImageAndChangeBackgroundColor(imageUrl);
    }

    // Call the function to fetch and display a random quote
    fetchRandomQuote();
    // Call the functions to load a random image and fetch and display a random quote
    loadRandomImage();

     // Chain the promises to ensure proper order of execution
     loadRandomImage()
     .then(fetchRandomQuote) // Fetch the quote after the image is loaded and background color is set
     .catch(error => {
         console.error('Error:', error);
     });

});
