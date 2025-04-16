/*********************
 * RESPONSIVE WARNING *
 *********************/

// "true" if the site is optimized for responsive design, "false" if not.
const responsiveDesign = false;

/***********************
 * MODE TOGGLE BEHAVIOR *
 ***********************/

// Get elements that change with the mode.
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const body = document.body;

// Function to apply mode.
function applyMode(mode) {
	body.classList.remove("light-mode", "dark-mode");
	body.classList.add(mode);

	if (mode === "dark-mode") {
		// Set dark mode styles.
		toggleModeBtn.style.color = "rgb(245, 245, 245)";
		toggleModeBtn.innerHTML = '<i class="ri-sun-line"></i>';
	} else {
		// Set light mode styles.
		toggleModeBtn.style.color = "rgb(2, 4, 8)";
		toggleModeBtn.innerHTML = '<i class="ri-moon-line"></i>';
	}
}

// Check and apply saved mode on page load
let savedMode = localStorage.getItem("mode");

if (savedMode === null) {
	savedMode = "light-mode"; // Default mode.
}
applyMode(savedMode);

// Toggle mode and save preference.
toggleModeBtn.addEventListener("click", function () {
	let newMode;
	console.log("clicked");
	if (body.classList.contains("light-mode")) {
		newMode = "dark-mode";
	} else {
		newMode = "light-mode";
	}

	applyMode(newMode);

	// Save choice.
	localStorage.setItem("mode", newMode);
});

document.addEventListener("DOMContentLoaded", () => {
	const totalPages = 74;
	const totalSpreads = totalPages / 2;
	const main = document.querySelector("main");
	const pagesContainer = document.getElementById("pages_container");

	// Create checkboxes
	for (let i = 1; i <= totalSpreads; i++) {
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = `page${i}_checkbox`;
		main.insertBefore(checkbox, pagesContainer);
	}

	// Generate page spreads
	for (let i = 1; i <= totalSpreads; i++) {
		const pageDiv = document.createElement("div");
		pageDiv.className = "page";
		pageDiv.id = `page${i}`;

		const frontPage = document.createElement("div");
		frontPage.className = "front_page";
		frontPage.innerHTML = `
			<label for="page${i}_checkbox"></label>
			<img class="edge_shading" src="./assets/images/front_page_edge_shading.webp" alt="Front page edge shading" />
			<img class="front_content" src="./assets/images/pages/page${
				(i - 1) * 2 + 1
			}.webp" alt="Front content" />
		`;

		const backPage = document.createElement("div");
		backPage.className = "back_page";
		backPage.innerHTML = `
			<label for="page${i}_checkbox"></label>
			<img class="edge_shading" src="./assets/images/back_page_edge_shading.webp" alt="Back page edge shading" />
			<img class="back_content" src="./assets/images/pages/page${
				(i - 1) * 2 + 2
			}.webp" alt="Back content" />
		`;

		pageDiv.appendChild(frontPage);
		pageDiv.appendChild(backPage);
		// pagesContainer.appendChild(pageDiv);
	}
});
