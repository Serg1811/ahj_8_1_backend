const Router = require('koa-router');
const subscriptions = require('../../db/index');

const router = new Router();

router.post('/subscriptions', (ctx) => {

  ctx.response.body = 'subscriptions';

  const { nickname } = ctx.request.body;

  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscriptions.data.some(sub => sub.nickname === nickname)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "subscription exists" };

    return;
  }

  subscriptions.add({ nickname });

  ctx.response.body = { status: "OK" };
});

router.delete('/subscriptions/:nickname', (ctx) => {

  const { nickname } = ctx.params;
  
  ctx.response.set('Access-Control-Allow-Origin', '*');

  if (subscriptions.data.every(sub => sub.nickname !== nickname)) {
    ctx.response.status = 400;
    ctx.response.body = { status: "subscription doesn\'t exists" };

    return;
  }

  subscriptions.remove(nickname);

  ctx.response.body = { status: "OK" };
});

module.exports = router;
