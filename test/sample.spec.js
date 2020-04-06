// TODO:
// 完成TodoList自动化测试
// - 渲染所有待办事项（判断待办事项的长度即可）
// - 可以添加新的待办事项
// - 可以完成待办事项

describe('add todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:7001/');
  });

  after (async function () {
    await page.close();
  });

  it('should have correct title', async function() {
      expect(await page.title()).to.eql('Koa • Todo');
  })

  it('should new todo correct', async function() {
    await page.click('#new-todo', {delay: 500});
    await page.type('#new-todo', 'playing basketball', {delay: 50});
    await page.keyboard.press("Enter");
    let todoList = await page.waitFor('#todo-list');
    const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
    expect(expectInputContent).to.eql('playing basketball');
  }) 

  it('should complete a todo', async function(){     
    await page.click('.toggle', {delay:500});
    await page.click('.selected');
    let todoList = await page.$eval('#todo-list', el=> el.innerText);
    expect(todoList).to.eql('playing basketball');
  })

  it('should get every todo', async function(){    
    let todoList = await page.$eval('#todo-list', el=> el.innerText);
    let todoCount = await page.waitFor('#todo-count');
    const count = await page.evaluate(todoCount => todoCount.querySelector('strong').textContent, todoCount);
    expect(0).to.eql(+count);
    expect(todoList).to.eql('playing basketball');
  })

});