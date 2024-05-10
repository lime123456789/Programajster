const monadicOperations = {
    "-": a => -1 * a,
}

const dyadicOperations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
}

function evalMonadic(op, a) {
    return monadicOperations[op]?.(a)
}

function evalDyadic(op, a, b) {
    return dyadicOperations[op]?.(a, b)
}

export function evaluate(op, ...args) {
    return ({
	1: evalMonadic,
	2: evalDyadic,
    })[args.length]?.(op, ...args)
}
