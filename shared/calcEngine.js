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
	priority: 2,
    },
    "/": {
	function: (a, b) => a / b,
	priority: 2,
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
    })[args.length]?.(op, ...args.map(a => a instanceof Op ? a.eval() : a))
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

class Op {}

class MonadOp extends Op {
    constructor(value, arg) {
	super()
	this.value = value
	this.arg = arg
    }
    eval = () => evaluate(this.value, ...[this.arg].map(a => a instanceof Op ? a.eval() : a))
}

class DyadOp extends Op {
    constructor(value, args) {
	super()
	this.value = value
	this.args = args
    }
    eval = () => evaluate(this.value, ...[...this.args].map(a => a instanceof Op ? a.eval() : a))
}

export async function parser(input, options = {direction: "ltr", priority: true}) {
    const allOp = Object.assign({}, dyadicOperations, monadicOperations)

    // get rid of monadicOps
    const opIslandLengths = input
	  .map(a => Number(Object.keys(allOp).includes(a)))
	  .toReversed()
	  .map((_, i, array) => array.slice(0, i+1).reduce((acc, a) => a ? a + acc : 0))
	  .map((a, i, array) => array[i+1] ?? 0 ? 0 : a)
    	  .toReversed()
    const [woFirstMonad, shorterMask] = opIslandLengths.at(0) == 1
	  && Object.keys(monadicOperations).includes(input.at(0))
	  ? [input.toSpliced(0, 2, new MonadOp(...input.slice(0, 2))), opIslandLengths.slice(1)]
	  : [input, opIslandLengths]
    const woMonads = shorterMask
	  .map(a => a == 1 ? 0 : a)
	  .reduce((acc, a, i) => {
	      let dip
	      if (acc[1]) { dip = acc[1] + 1 }
	      else if (a) { dip = -a }
	      else { dip = a }

	      let res
	      if (a) { res = [...acc[0], woFirstMonad.slice(i, i + a + 1)] }
	      else if (acc[1]) { res = acc[0] }
	      else { res = [...acc[0], woFirstMonad[i]] }

	      return [res, dip]
	  }
		  , [[], 0])
	  .at(0)
	  .map(a => {
	      if (a instanceof Array
		  && Object.keys(dyadicOperations).includes(a.at(0))
		  && typeof(a.at(-1)) == "number"
		  && a.slice(1, -1).every(b => Object.keys(monadicOperations).includes(b))
		 ) {
		  return a.toSpliced(1
				     , a.length
				     , a.slice(1, -1).toReversed().reduce((acc, b) => new MonadOp(b, acc), a.at(-1))
				    )
	      }
	      return a
	  })
	  .flat()

    // const dyadByPriority = Object.groupBy(
    // 	Object.entries(dyadicOperations)
    // 	    .map(a => Object.fromEntries([a]))
    // 	, a => a[Object.keys(a)[0]].priority
    // )

    const dyadOpsInUse = woMonads
	  .filter(a => typeof(a) == "string")

    const dyadByPriority = Object.entries(Object.groupBy(
	Object.entries(dyadicOperations)
	    .filter(a => dyadOpsInUse.includes(a[0]))
	    .map(a => Object.fromEntries([a]))
	, a => a[Object.keys(a)[0]].priority
    ))
	  .toSorted((a, b) => a[0] < b[0] ? 1 : -1)
	  .map(a => a[1].map(b => Object.keys(b)[0]))

    const dyadMask = woMonads
	  .map(a => typeof(a) == "string"
	       && Object.keys(dyadicOperations).includes(a)
	       ? 1
	       : 0
	  )

    const res = dyadByPriority.reduce((acc, ops) => {
	let [dyadMask, woMonads] = acc
	const dyadIslandLengths = dyadMask
	      .map((a, i) => Number(a && ops.includes(woMonads[i])))
	      .map((_, i, self) => [self[i-1], self[i], self[i+1]]
		   .map(a => a ?? 0)
		   .reduce((acc, a) => acc || a)
		  )
	      .toReversed()
	      .map((_, i, array) => array.slice(0, i+1).reduce((acc, a) => a ? a + acc : 0))
	      .map((a, i, array) => array[i+1] ?? 0 ? 0 : a)
    	      .toReversed()

	const stagedWoDyads = dyadIslandLengths.reduce((acc, a, i) => {
	    let dip
	    if (acc[1]) { dip = acc[1] + 1 }
	    else if (a) { dip = -a + 1 }
	    else { dip = a }

	    let res
	    if (a) { res = [...acc[0], woMonads.slice(i, i + a)] }
	    else if (acc[1]) { res = acc[0] }
	    else { res = [...acc[0], woMonads[i]] }

	    return [res, dip]
	}
						       , [[], 0])
	      .at(0)
	      .map((a, _, self) => a instanceof Array
		   ? a.filter(b => typeof(b) == "string")
		   .reduce((acc, _) => {
		       const args = acc.slice(0, 3)
		       return acc.toSpliced(0, 3, new DyadOp(args[1], [args[0], args[2]]))
		   }
			   , a)
		   .at(0)
		   : a
		  )

	const stagedDyadMask = stagedWoDyads
	      .map(a => typeof(a) == "string" ? 1 : 0)

	return [stagedDyadMask, stagedWoDyads]
    }
				      , [dyadMask, woMonads])
	  .at(1).at(0)
    
    return res
}

export async function run(input, radix) {
    return (await parser(await lexer(input, radix))).eval()
}
