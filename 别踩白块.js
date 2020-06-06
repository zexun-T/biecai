var go = document.getElementById('go');
var main = document.getElementById('main');

var colorsArr = ['blue', 'yellow', 'green', 'red']
var speed = 5,
    num = 0,
    timer;
flag = true;

function clickStart() {
    go.addEventListener('click', function() {
        go.style.display = 'none';
        move();
    })
}
clickStart();

function move() {
    clearInterval(timer);
    timer = setInterval(function() {
        var step = parseInt(main.offsetTop) + speed;
        main.style.top = step + 'px';
        if (parseInt(main.offsetTop) >= 0) {
            main.style.top = '-150px';
            CreatDiv();
        }
        var len = main.childNodes.length;
        if (len == 6) {
            for (i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].childNodes[i].classList.contains('i')) {
                    alert('300分有美女图哦！加油！你的得分为：' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            main.removeChild(main.childNodes[len - 1]);

        }
    }, 20);
    knock();
}
//先创建行，再创建列，从每一行中插入4个div当作列
function CreatDiv() {
    oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4);
    oDiv.setAttribute('class', 'row'); //创建每一行
    for (j = 0; j < 4; j++) {
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    var clickDiv = main.childNodes[0].childNodes[index]; //在第一行中随机创建一个颜色块
    clickDiv.setAttribute('class', 'i');
    clickDiv.style.backgroundColor = colorsArr[index];


}

function knock() {
    main.addEventListener('mousedown', function(e) {
        if (flag) {
            var tar = e.target;
            if (tar.className == 'i') {
                tar.style.backgroundColor = '#bbb';
                tar.classList.remove('i'); //获取事件源对象，如果事件源对象的className的值是i的话，就改变此背景颜色，并且移除掉标记i
                num++
                document.getElementsByClassName('num')[0].innerHTML = '你的得分：' + num;
            } else {
                alert('300分有美女图哦！加油！你的得分为：' + num);
                clearInterval(timer);
                flag = false;
            }
            if (num % 10 == 0) {
                speed++;

            }

        }
    })

}