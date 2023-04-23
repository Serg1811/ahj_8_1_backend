const subscriptions = {
  data: [],
  listeners: [],
  sendObj: {},
  
  add(item) {
    this.data.push(item);
    this.sendObj.nickname = item.nickname;
    this.sendObj.req = 'add'

    this.listeners.forEach(handler => handler(this.sendObj));
  },

  remove(item) {
    this.data = this.data.filter(sub => {return sub.nickname !== item});
    this.sendObj.nickname = item;
    this.sendObj.req = 'remove';

    this.listeners.forEach(handler => handler(this.sendObj));
  },
  
  listen(handler) {
    this.listeners.push(handler);
  },
}

module.exports = subscriptions;
