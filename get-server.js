const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('art-template');
const server = http.createServer();
server.listen(8080, '172.20.10.2', () => {
    console.log('服务器已启动，可通过 http://172.20.10.2:8080 访问')
})
server.on('request', (req, res) => {
    console.log('请求进来了');
    // 静态资源
    if (req.url.startsWith('/assets')) {
        if (req.url.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css')
        }
        fs.readFile('.' + req.url, (err, data) => {
            if (err) console.log(err);
            res.end(data);
        })
    }
    // 动态资源
    else {
        let result = url.parse(req.url, true);
        if (req.url === '/views/index.html') {
            fs.readFile(_dirname + '/data/getAllheros.json', 'utf-8', (err, data) => {
                let arr = JSON.parse(data);
                let html = template(_dirname + '/views/index.html', {
                    arr
                });
                res.end(html);
            })
        } else {
            if (req.url === '/views/add.html') {
                fs.readFile(__dirname + '/views/add.html', (err, data) => {
                    if (err) console.log(err);
                    res.end(data);
                })
            }
        }
        // 以get方式
        if (result.pathname === '/addHero' && result.methods === 'GET') {
            // 把旧数据读取出来
            fs.readFile('./data/getAllheros.json', (err, data) => {
                if (err) console.log(err);
                let arr = JSON.parse(data);
                // 把id添加
                let id = 0;
                arr.forEach(e => {
                    if (e.id > id) {
                        id = e.id;
                    }
                });
                //  result.query  获取数据
                result.query.id = id + 1;
                // 再把这个ID添加到旧数据里面
                arr.push(result.query)
                // 最后把数据放进数组里后，要转格式
                let jsonStr = JSON.stringify(arr);
                //    最后的最后要把这些添加的数据写出来；
                fs.writeFile('/data/getAllheros.json', 'utf-8', (err, data) => {
                    if (err) console.log(err);
                    res.end(JSON.stringify({
                        code: 200,
                        msg: '操作成功'
                    }));
                })


            })
        }
    }
})