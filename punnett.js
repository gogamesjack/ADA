// get parent 1 input
const parent1Input = document.getElementById("parent1");
const parent2Input = document.getElementById("parent2");
const resultTable = document.getElementById("punnettSquare");
const tableP11 = document.getElementById("parent11");
const tableP12 = document.getElementById("parent12");
const tableP21 = document.getElementById("parent21");
const tableP22 = document.getElementById("parent22");

function updateCellColor(cell, genotype) {
    if (genotype === "AA") {
        cell.className = "goodSquare";
    } else if (genotype === "Aa") {
        cell.className = "carrierSquare";
    } else if (genotype === "aa") {
        cell.className = "affectedSquare";
    } else {
        cell.className = "";
    }
}

function normalizeGenotype(firstAllele, secondAllele) {
    if (!firstAllele || !secondAllele) {
        return '';
    }
    return firstAllele === secondAllele ? firstAllele + secondAllele : 'Aa';
}

function updateTable() {
    // split into array of characters
    const p1 = parent1Input.value.split('');
    const p2 = parent2Input.value.split('');

    // update Parents
    tableP11.textContent = p1[0] || '';
    tableP12.textContent = p1[1] || '';
    tableP21.textContent = p2[0] || '';
    tableP22.textContent = p2[1] || '';

    // update Punnett Square
    // Parent 1 labels the column headers; Parent 2 labels the row headers.
    resultTable.rows[1].cells[1].textContent = normalizeGenotype(p2[0], p1[0]);
    resultTable.rows[1].cells[2].textContent = normalizeGenotype(p2[0], p1[1]);
    resultTable.rows[2].cells[1].textContent = normalizeGenotype(p2[1], p1[0]);
    resultTable.rows[2].cells[2].textContent = normalizeGenotype(p2[1], p1[1]);

    updateCellColor(resultTable.rows[1].cells[1], resultTable.rows[1].cells[1].textContent);
    updateCellColor(resultTable.rows[1].cells[2], resultTable.rows[1].cells[2].textContent);
    updateCellColor(resultTable.rows[2].cells[1], resultTable.rows[2].cells[1].textContent);
    updateCellColor(resultTable.rows[2].cells[2], resultTable.rows[2].cells[2].textContent);
}

parent1Input.addEventListener('change', updateTable);
parent2Input.addEventListener('change', updateTable);
updateTable();

const affectedBar = document.getElementById("affectedBar");
function updateAffectedBar() {
    if (!affectedBar) {
        return;
    }

    affectedBar.setAttribute("width", "100%");
    affectedBar.setAttribute("height", "20");
    affectedBar.setAttribute("viewBox", "0 0 100 10");
    affectedBar.setAttribute("preserveAspectRatio", "none");

    const p1 = parent1Input.value.split('');
    const p2 = parent2Input.value.split('');

    const genotypes = [
        normalizeGenotype(p2[0], p1[0]),
        normalizeGenotype(p2[0], p1[1]),
        normalizeGenotype(p2[1], p1[0]),
        normalizeGenotype(p2[1], p1[1])
    ];

    let goodCount = 0;
    let carrierCount = 0;
    let affectedCount = 0;

    genotypes.forEach(genotype => {
        if (genotype === "AA") {
            goodCount++;
        } else if (genotype === "Aa") {
            carrierCount++;
        } else if (genotype === "aa") {
            affectedCount++;
        }
    });

    const parentWidth = 100; // Assuming the parent width is 100%
    const goodWidth = (goodCount / 4) * parentWidth;
    const carrierWidth = (carrierCount / 4) * parentWidth;
    const affectedWidth = (affectedCount / 4) * parentWidth;

    affectedBar.innerHTML = `
        <rect x="0" y="0" width="${goodWidth}%" height="50%" fill="var(--good)" />
        <rect x="${goodWidth}%" y="0" width="${carrierWidth}%" height="50%" fill="var(--carrier)" />
        <rect x="${goodWidth + carrierWidth}%" y="0" width="${affectedWidth}%" height="50%" fill="var(--affected)" />
    `;

}

parent1Input.addEventListener('change', updateAffectedBar);
parent2Input.addEventListener('change', updateAffectedBar);
updateAffectedBar();
