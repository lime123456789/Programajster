const monadicOperations = {
    "-": {
	function: a => -1 * a,
	priority: 1,
    },
}

const dyadicOperations = {
    "+": {
	function: (a, b) => a + b,
	priority: 1,
    },
    "-": {
	function: (a, b) => a - b,
	priority: 1,
    },
    "*": {
	function: (a, b) => a * b,
	priority: 1,
    },
    "/": {
	function: (a, b) => a / b,
	priority: 1,
    },
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
