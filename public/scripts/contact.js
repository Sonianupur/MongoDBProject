document
    .getElementById("myForm")
    .addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const helpMessage = document.getElementById("helpMessage").value;
        // Get the form data
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            helpMessage: helpMessage,
        };

        // Make a POST request to your API
        fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert data to JSON string
        })
            .then((response) => {
                if (response.ok) {
                    // Reset the form
                    document.getElementById("firstName").value = "";
                    document.getElementById("lastName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("helpMessage").value = "";

                    // Show a success message
                    alert("Form submitted successfully!");
                } else {
                    // Handle errors here
                    alert("Error submitting the form.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while submitting the form.");
            });
    });