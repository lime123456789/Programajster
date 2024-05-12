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

/* lists out specified types of operators
 * example:
 * listOperations("monadicOperations") // will list only monadicOperations
 * listOperations("dyadicOperations", "monadicOperations") // will list both
 */
export function listOperations(...types) {
    return [...new Set(
	types
	    .map(a => ({
		monadicOperations: Object.keys(monadicOperations),
		dyadicOperations: Object.keys(dyadicOperations),
	    })[a])
	    .flat()
    )]
}

function evalMonadic(op, a) {
    return monadicOperations[op]?.function(a)
}

function evalDyadic(op, a, b) {
    return dyadicOperations[op]?.function(a, b)
}

export function evaluate(op, ...args) {
    return ({
	1: evalMonadic,
	2: evalDyadic,
    })[args.length]?.(op, ...args)
}

const radixMapping = {
    2: "0b",
    8: "0o",
    10: "",
    16: "0x",
}

export async function lexer(input, radix = 10) {
    return await Promise.all(
	input.split(/\s+/)
	    .map(a => listOperations("monadicOperations", "dyadicOperations")
		 .includes(a)
		 ? { value: a }
		 : Number(`${radixMapping[radix]}${a}`)
		 ? { value: Number(`${radixMapping[radix]}${a}`) }
		 : { error: "not a known token" }
		)
	    .map(a => new Promise((res, rej) => a?.error === undefined
				  ? res(a?.value)
				  : rej(a?.error)
				 )
		)
    ).catch(_=>_)
}
