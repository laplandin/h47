const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
	console.log('>>')
	setTimeout(() => { 	ctx.body = 'llll' }, 1000)
});

app
	.use(router.routes())
	.use(router.allowedMethods());

app.listen(3200);
