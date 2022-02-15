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
        assignments/${surname}.txt
      </button>
    </h2>
    <div id="flush-collapse-${surname}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <p>
            <a href="assignments/${surname}.txt" target='_blank' class="d-flex justify-content-between align-items-start">assignments/${surname}.txt <i class="bi bi-box-arrow-up-right"></i></a>
        </p>

        <div class="input-group mb-3">
            <input type="text" class="form-control" id='abgabe-${surname}' placeholder="abgabe-${surname}" aria-label="abgabe" aria-describedby="basic-addon-${surname}">
            <button class="btn btn-outline-secondary button-addon" type="button" id="button-addon-${surname}">überprüfen</button>
        </div>
      </div>
    </div>
  </div>
    `;

    ele.innerHTML = el;

    parent.appendChild(ele);

});

document.querySelectorAll('.button-addon').forEach((element) => {
    element.addEventListener('click', (event) => {
        let input = element.previousElementSibling.value;
        console.log(event, input)
    })
})