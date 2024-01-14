class PubSub {
  constructor() {
    this.subscribers = [];
  }

  subscribe(event, callback) {
    this.subscribers[event] = this.subscribers[event] || [];
    this.subscribers[event].push(callback);

    return () => this.unsubscribe(event, callback);
  }

  unsubscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(subscriber => subscriber !== callback);
    }
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  }
}

const pubsubModel = new PubSub();

const unSubscribe1 = pubsubModel.subscribe('event1', data => console.log(`Subscriber 1: ${data}`));
const unSubscribe2 = pubsubModel.subscribe('event1', data => console.log(`Subscriber 2: ${data}`));
const unSubscribe3 = pubsubModel.subscribe('event2', data => console.log(`Subscriber 3: ${data}`));

pubsubModel.publish('event1', 'Return for event 1');
pubsubModel.publish('event2', 'Return for event 2');

unSubscribe1();

pubsubModel.publish('event1', 'Return for event 1');
pubsubModel.publish('event2', 'Return for event 2');