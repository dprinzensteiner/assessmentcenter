function parseInstructions(input) {
    const lines = input.trim().split('\n')
    const instructions = lines.map(line => {
        const [direction, distance] = line.split(' ')
        return {
            direction,
            distance: Number.parseInt(distance)
        }
    }).filter(n => n)
    return instructions
}

const part1Commands = {
    forward,
    down,
    up
}

const part2Commands = {
    forward,
    down: aimDown,
    up: aimUp
}

function forward({distance}, position) {
    position.x = position.x + distance
    position.y = position.y + position.aim * distance
}

function down({distance}, position) {
    position.y = position.y + distance
}

function up({distance}, position) {
    position.y = position.y - distance
}

function aimDown({distance}, position) {
    position.aim = position.aim + distance
}

function aimUp({distance}, position) {
    position.aim = position.aim - distance
}

async function run(name, num, givensolution) {
    fetch('assignments/' + name + '.txt').then((result) => {
        return result.text();
    }).then(async (content) => {
        let sol = 0;
        if(num == 1) {
            sol = await solveForFirstStar(content)
        } else {
            sol = await solveForSecondStar(content)
        }
        if(givensolution == sol) {
            alert("Lösung ist korrekt!");
        } else {
            alert("Lösung ist inkorrekt");
        }
    });


}

async function solveForFirstStar(input) {
    const instructions = parseInstructions(input)
    const position = {
        x: 0,
        y: 0,
        aim: 0
    }
    while (instructions.length > 0) {
        const next = instructions.shift()
        const command = part1Commands[next.direction]
        command(next, position)
    }

    return position.x * position.y
}

async function solveForSecondStar(input) {
    const instructions = parseInstructions(input)
    const position = {
        x: 0,
        y: 0,
        aim: 0
    }
    while (instructions.length > 0) {
        const next = instructions.shift()
        const command = part2Commands[next.direction]
        command(next, position)
    }

    return position.x * position.y;
}

function generate() {
    let lines = [];
    let down = 0;
    while (lines.length < 10000) {
        let direction = getRandomValueOfArray(["down", "up", "forward"]);
        let amount = getRandomIntegerInRange(1, 9);
        if (direction == "up" && down - amount < 0) {
            continue;
        }
        if (direction == "down") {
            down += amount;
        }
        lines.push(direction + " " + amount);
    }
    return lines;
}

function getRandomValueOfArray(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function getRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + min);
}

let participants = [
    "benedikt",
    "jungwirth",
    "bello",
    "sultanovic",
    "arzt",
    "hartl"
];

document.querySelector('#angaben')

participants.forEach((surname) => {
    let parent = document.querySelector('#angaben');

    let ele = document.createElement('div')

    let el = `
    <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${surname}" aria-expanded="false" aria-controls="flush-collapse-${surname}">
        assignments/${surname}
      </button>
    </h2>
    <div id="flush-collapse-${surname}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <p>
            <a href="assignments/${surname}.txt" target='_blank' class="d-flex justify-content-between align-items-start">assignments/${surname}.txt <i class="bi bi-box-arrow-up-right"></i></a>
        </p>

        <div class="input-group mb-3">
            <input type="number" class="form-control" id='abgabe-${surname}' placeholder="aufgabe-teil-1-${surname}" aria-label="abgabe" aria-describedby="basic-addon-${surname}">
            <button class="btn btn-outline-secondary button-addon-1" type="button" id="button-addon-${surname}">überprüfen</button>
        </div>

        <div class="input-group mb-3">
            <input type="number" class="form-control" id='abgabe-${surname}' placeholder="aufgabe-teil-2-${surname}" aria-label="abgabe" aria-describedby="basic-addon-${surname}">
            <button class="btn btn-outline-secondary button-addon-2" type="button" id="button-addon-${surname}">überprüfen</button>
        </div>
      </div>
    </div>
  </div>
    `;

    ele.innerHTML = el;

    parent.appendChild(ele);

});

document.querySelectorAll('.button-addon-1').forEach((element) => {
    element.addEventListener('click', (event) => {
        let input = element.previousElementSibling.value;
        run(element.id.split('-')[2], 1, input)
    })
})
document.querySelectorAll('.button-addon-2').forEach((element) => {
    element.addEventListener('click', (event) => {
        let input = element.previousElementSibling.value;
        run(element.id.split('-')[2], 2, input)
    })
})