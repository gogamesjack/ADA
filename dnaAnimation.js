var phase = 0;
var aphase = 0;

const amplitude = 30;
const frequency = 0.035;
const speed = 0.02;

function generateDNA() {
    let svg = document.getElementById("animatedDNA");

    let wave1 = [];
    let wave2 = [];
    let lines = "";


    phase += speed;
    aphase += speed / 5.0;

    // Generate the two waves
    for (let x = 0; x <= 300; x++) {
        let y1 = 70 + amplitude * Math.sin(x * frequency + phase);
        let y2 = 70 - amplitude * Math.sin(x * frequency + phase);

        wave1.push(`${x + 20},${y1}`);
        wave2.push(`${x + 20},${y2}`);
    }

    // Calculate the gray bar offset
    let offset = ((-(phase - aphase) / frequency) % 300 + 300) % 300;

    // Generate the gray bars separately
    for (let i = 0; i < 30; i++) {
        let x = (i * 10 + offset) % 300;

        let y1 = 70 + amplitude * Math.sin(x * frequency + phase);
        let y2 = 70 - amplitude * Math.sin(x * frequency + phase);

        let color = i === 0 ? "red" : "gray";
        let thickness = i === 0 ? 3 : 1;

        lines += `
        <line
            x1="${x + 20}" y1="${y1}"
            x2="${x + 20}" y2="${y2}"
            stroke="${color}"
            stroke-width="${thickness}"
            opacity="0.5"
        />
    `;
    }

    svg.innerHTML = lines + `
        <polyline
            points="${wave1.join(" ")}"
            stroke="#18334C"
            stroke-width="3"
            fill="none"
        />
        <polyline
            points="${wave2.join(" ")}"
            stroke="#1769AA"
            stroke-width="3"
            fill="none"
        />
    `;
}

setInterval(generateDNA, 25);