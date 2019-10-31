const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const category = require('./category.json');
// const slidies = require("./slides.json");

const router = new Router();
const app = new Koa();
app.use(cors());

router.get('/api/category', async (ctx) => {
  const categories = category.map(({ name: text, id: value }) => ({
    text,
    value,
  }));
  ctx.body = {
    code: 0,
    data: categories,
  };
});
router.get('/api/lessonList/:id', async (ctx) => {
  const { id } = ctx.params;
  let { size, offset } = ctx.query;
  size = parseInt(size, 10);
  offset = offset > 0 ? parseInt(offset, 10) : 1;
  const start = (offset - 1) * size;
  let item = category.find(c => c.id == id);
  let result;
  if (!item) {
    item = category.reduce((memo, current) => memo.concat(current.children), []); // 获取所有列表
    result = item.slice(start, start + size);
  } else {
    result = item.children.slice(start, start + size);
  }
  console.log("start: ", start, "size: ", size, "item.length", item.length);
  ctx.body = {
    code: 0,
    data: {
      result,
      hasMore: item.length > start + size,
    },
  };
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
