const proteinCards = document.querySelectorAll('.proteinCard');
const proteinCardStates = Array(proteinCards.length).fill(false);

function toggleProteinCard(cardIndex) {
    proteinCardStates[cardIndex] = !proteinCardStates[cardIndex];
    const card = proteinCards[cardIndex];
    const content = card.querySelector('p');
    const arrow = card.querySelector('button');

    if (proteinCardStates[cardIndex]) {
        content.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';
    } else {
        content.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Add event listeners to the buttons
proteinCards.forEach((card, index) => {
    const button = card.querySelector('button');
    const content = card.querySelector('p');
    content.style.display = 'none';
    button.addEventListener('click', () => toggleProteinCard(index));
});