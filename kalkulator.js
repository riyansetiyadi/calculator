const containerTombol = document.querySelector(".container-tombol");
const layar = document.querySelector("#layar");

let isErrorState = false;

function hitungHasil() {
	if (!layar.value) return;
	try {
		// Validasi karakter yang diizinkan (angka, operator, titik)
		if (/[^0-9+\-*/.]/.test(layar.value)) {
			throw new Error("Input tidak valid");
		}
		// Evaluasi aman tanpa eval global
		const hasil = new Function(`'use strict'; return (${layar.value})`)();
		if (hasil === Infinity || hasil === -Infinity || Number.isNaN(hasil)) {
			layar.value = "Error";
			isErrorState = true;
		} else {
			layar.value = String(hasil);
			isErrorState = false;
		}
	} catch (err) {
		layar.value = "Error";
		isErrorState = true;
	}
}

function handleInput(nilai) {
	if (isErrorState) {
		layar.value = "";
		isErrorState = false;
	}

	if (nilai === "C") {
		layar.value = "";
	} else if (nilai === "<") {
		layar.value = layar.value.slice(0, -1);
	} else if (nilai === "=") {
		hitungHasil();
	} else {
		layar.value += nilai;
	}
}

// Handler klik tombol di layar
containerTombol.addEventListener("click", function(e) {
	const tombolClick = e.target;
	if (!tombolClick.classList.contains("tombol")) return;

	const nilaiTombol = tombolClick.innerText.trim();
	handleInput(nilaiTombol);
});

// Handler input dari keyboard fisik
document.addEventListener("keydown", function(e) {
	if ((e.key >= "0" && e.key <= "9") || ["+", "-", "*", "/", "."].includes(e.key)) {
		handleInput(e.key);
	} else if (e.key === "Enter" || e.key === "=") {
		e.preventDefault();
		handleInput("=");
	} else if (e.key === "Backspace") {
		handleInput("<");
	} else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
		handleInput("C");
	}
});