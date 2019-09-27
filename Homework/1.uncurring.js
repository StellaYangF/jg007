/* currying */
const currying = function(fn) {
    let args = Array.from(arguments);
    return function() {
        let newArgs = [...args, ...arguments]
    }
}

obj = {
    say() {
        this
    }
}

say() {
    this
}

obj.say()

say()