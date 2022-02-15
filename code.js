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

/* participants.forEach((surname) => {
    let lines = generate();
    fs.writeFile('assignments/'+surname+'.txt', lines.join('\n'), { flag: 'w+' }, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
    
}) */

//console.log(lines, lines.join('\n'));

document.querySelector('#angaben')

participants.forEach((surname) => {
    let parent = document.querySelector('#angaben');

    let ele = document.createElement('div')

    let el = `
    <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        assignments/${surname}.txt
      </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">
        <a href="assignments/${surname}.txt" target='_blank'>assignments/${surname}.txt</a>

        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon-${surname}">@</span>
            <input type="text" class="form-control" id='abgabe-${surname}' placeholder="abgabe" aria-label="abgabe" aria-describedby="basic-addon-${surname}">
        </div>
      </div>
    </div>
  </div>
    `;

    ele.innerHTML = el;

    parent.appendChild(ele);

});