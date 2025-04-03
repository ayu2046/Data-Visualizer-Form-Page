document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("questions");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let website = document.getElementById("website").value;
            let mobile = document.getElementById("mobile").value;
            let birthday = document.getElementById("birthday").value;
            let birthtime = document.getElementById("birthtime").value;
            let adulthood = document.querySelector('input[name="adulthood"]:checked').value;
            let country = document.getElementById("country").value;

            // Get selected programming languages
            let languages = [];
            if (document.getElementById("cpp").checked) languages.push("C/C++");
            if (document.getElementById("java").checked) languages.push("Java");
            if (document.getElementById("python").checked) languages.push("Python");

            // Create a user object
            let userData = {
                name, email, website, mobile, birthday, birthtime, adulthood, country, languages
            };

            // Retrieve existing data from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(userData);

            // Save updated data back to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            alert("Form submitted successfully!");
            form.reset();
        });
    }

    // If on dashboard page, generate charts
    if (window.location.pathname.includes("dashboard.html")) {
        generateDashboard();
    }
});

// Function to generate dashboard charts
function generateDashboard() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Count occurrences of programming languages
    let languageCounts = { "C/C++": 0, "Java": 0, "Python": 0 };
    let voteCounts = { Yes: 0, No: 0 };

    users.forEach(user => {
        user.languages.forEach(lang => {
            if (languageCounts[lang] !== undefined) {
                languageCounts[lang]++;
            }
        });
        voteCounts[user.adulthood]++;
    });

    // Chart.js: Programming Languages
    const langCtx = document.getElementById("langChart").getContext("2d");
    new Chart(langCtx, {
        type: "bar",
        data: {
            labels: Object.keys(languageCounts),
            datasets: [{
                label: "Programming Languages",
                data: Object.values(languageCounts),
                backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"]
            }]
        }
    });

    // Chart.js: Voting Eligibility
    const voteCtx = document.getElementById("voteChart").getContext("2d");
    new Chart(voteCtx, {
        type: "pie",
        data: {
            labels: ["Eligible (Yes)", "Not Eligible (No)"],
            datasets: [{
                data: Object.values(voteCounts),
                backgroundColor: ["#28a745", "#dc3545"]
            }]
        }
    });
}
