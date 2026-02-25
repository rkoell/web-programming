function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

function isPrime(currentAge) {
    for (let i = 2, s = Math.sqrt(currentAge); i <= s; i++) {
        if (currentAge % i === 0) return false;
    }
    return currentAge > 1;
}

function checkAgePrime() {
    const input = document.getElementById('birthYear');
    const birthYear = parseInt(input.value);
    if (isNaN(birthYear) || birthYear > new Date().getFullYear()) {
        alert("Enter a valid birth year.");
    }
    const age = calculateAge(birthYear);
    const prime = isPrime(age);
    if (prime) {
        alert(`Your age is ${age}, which is a prime number.`);
    }
    else {
        alert(`Your age is ${age}, which is not a prime number.`)
    }
}