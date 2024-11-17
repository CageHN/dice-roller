document.getElementById('diceForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const numDice = parseInt(document.getElementById('numDice').value);
    const numRolls = parseInt(document.getElementById('numRolls').value);
    const diceSound = document.getElementById('diceSound');
    const resultsTable = document.getElementById('resultsTable');
    const resultsTableHead = resultsTable.querySelector('thead');
    const resultsTableBody = resultsTable.querySelector('tbody');

    // Clear previous results
    resultsTableHead.innerHTML = '';
    resultsTableBody.innerHTML = '';

    // Play dice roll sound
    diceSound.currentTime = 0;
    diceSound.play();

    // Generate table headers
    const headerRow = document.createElement('tr');
    headerRow.appendChild(createCell('Roll #', 'th')); // Roll number column
    for (let i = 1; i <= numDice; i++) {
        headerRow.appendChild(createCell(`Die ${i}`, 'th')); // Columns for each die
    }
    if (numDice > 1) {
        headerRow.appendChild(createCell('Sum', 'th')); // Sum column only if rolling 2+ dice
    }
    resultsTableHead.appendChild(headerRow);

    // Generate rolls and populate rows
    for (let roll = 1; roll <= numRolls; roll++) {
        const row = document.createElement('tr');
        const results = [];
        let sum = 0;

        // Add Roll # column
        row.appendChild(createCell(roll));

        // Generate dice results and sum them
        for (let dice = 1; dice <= numDice; dice++) {
            const result = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
            results.push(result);
            sum += result;
            row.appendChild(createCell(result)); // Add each die result to the row
        }

        // Add Sum column only if rolling 2+ dice
        if (numDice > 1) {
            row.appendChild(createCell(sum));
        }

        resultsTableBody.appendChild(row);
    }
});

/**
 * Utility function to create a table cell
 * @param {string|number} content - The content of the cell
 * @param {string} type - 'td' or 'th' for cell type
 * @returns {HTMLElement} - The created cell element
 */
function createCell(content, type = 'td') {
    const cell = document.createElement(type);
    cell.textContent = content;
    return cell;
}
