// JavaScript: calculate age from day, month, year
function calculateAge(day, month, year) {
    day = Number(day); month = Number(month); year = Number(year);
    if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
        return { error: "Inputs must be integers" };
    }

    // JS months are 0-based
    const birth = new Date(year, month - 1, day);
    if (birth.getFullYear() !== year || birth.getMonth() !== month - 1 || birth.getDate() !== day) {
        return { error: "Invalid date" };
    }

    const now = new Date();
    if (birth > now) return { error: "Birth date is in the future" };

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
        // borrow days from previous month
        const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months -= 1;
    }

    if (months < 0) {
        months += 12;
        years -= 1;
    }

    return { years, months, days };
}

// Example usage:
console.log(calculateAge(15, 10, 1990)); // { years: ..., months: ..., days: ... }

// Prompt user for birth date in the terminal and show result
import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function question(promptText) {
    return new Promise(resolve => rl.question(promptText, answer => resolve(answer)));
}

(async () => {
    try {
        const day = (await question('Enter day (1-31): ')).trim();
        const month = (await question('Enter month (1-12): ')).trim();
        const year = (await question('Enter year (e.g. 1990): ')).trim();

        const result = calculateAge(day, month, year);

        if (result && result.error) {
            console.error('Error:', result.error);
        } else {
            console.log(`Age: ${result.years} years, ${result.months} months, ${result.days} days`);
        }
    } finally {
        rl.close();
    }
})();