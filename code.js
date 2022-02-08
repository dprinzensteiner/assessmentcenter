function generate() {
    let lines = [];
    let down = 0;
    while (lines.length < 10000) {
        let direction = getRandomValueOfArray(["down", "up", "forward"]);
        let amount = getRandomIntegerInRange(1, 9);
        if (direction == "up" && down - amount < 0) {
            continue;
        } 
        if(direction == "down") {
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

let lines = generate();
console.log(lines, lines.join('\n'));