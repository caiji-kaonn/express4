// 封装form key=value&key=value&key=value
function serialize() {
    let arr = [];
    let form = document.querySelector(formSelector);
    let eles = form.querySelectorAll('[name]');
    eles.forEach(e => {
        if (e.type === 'raido' && e.checked) {
            let key = e.name;
            let value = e.value;
            arr.push(key + '=' + value);
        }
        if (e.type !== 'radio') {
            let key = e.name;
            let value = e.value;
            arr.push(key + '=' + value);

        }
    });
    return arr.join('&');
}

// 注册添加点击运动
let btn = document.querySelector('#sub');
btn.onclick = function () {
    let data = serialize('#myform');
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://127.0.0.1:8080/addHero?' + data);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let res = JSON.parse(xhr.responseText);
            if (res.code === 200) {
                alert(res.msg)
            }
        }
    }
}