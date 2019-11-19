function EventEmitter() {
    this._events = Object.create(null);
}
// { '失恋': [dn, fn, ...] };

EventEmitter.prototype.on = function(eventName, callback) {
    if (!this._events) this._events = Object.create(null);
    if (eventName !== 'newListener') {
        let listeners = this._events['newListener'];
        if (listeners) {
            this.emit('newListener', eventName);
        }
    }
    let stack = this._events[eventName] || [];
    stack.push(callback);
    this._events[eventName] = stack;
}
EventEmitter.prototype.emit = function(eventName, ...args) {
    if (this._events[eventName]) {
        this._events[eventName].forEach(fn => fn(...args));
    }
}

module.exports = EventEmitter;