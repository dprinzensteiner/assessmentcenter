function parseInstructions (input) {
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

function forward ({ distance }, position) {
    position.x = position.x + distance
    position.y = position.y + position.aim * distance
}

function down ({ distance }, position) {
    position.y = position.y + distance
}

function up ({ distance }, position) {
    position.y = position.y - distance
}

function aimDown ({ distance }, position) {
    position.aim = position.aim + distance
}

function aimUp ({ distance }, position) {
    position.aim = position.aim - distance
}

async function run () {
    const input = (await fetch('input.txt')).trim()

    await solveForFirstStar(input)
    await solveForSecondStar(input)
}

async function solveForFirstStar (input) {
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

    const solution = position.x * position.y
    report('Solution 1:', solution)
}

async function solveForSecondStar (input) {
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

    const solution = position.x * position.y
    report('Solution 2:', solution)
}