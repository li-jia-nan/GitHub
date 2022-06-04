// import Redis, { RedisKey } from 'ioredis';
const Redis = require('ioredis');

const getRedisSessionId = sid => {
  return `ssid:${sid}`;
};

class RedisSessionStore {
  client;
  constructor(client) {
    this.client = client;
  }
  //获取Redis中存储的session数据
  get = async sid => {
    console.log('get session', sid);
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
    }
  };
  // 存储session数据到redis
  set = async (sid, sess, ttl) => {
    console.log('set session', sid);
    const id = getRedisSessionId(sid);
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 从reids当中删除某个session
  destroy = async sid => {
    console.log('destroy session', sid);
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  };
}

module.exports = RedisSessionStore;
// export default RedisSessionStore;
