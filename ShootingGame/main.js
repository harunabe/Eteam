// 砲台
var batteryHeight = 12;
var batteryWidth = 40;
var batteryHeight2 = 20;
var batteryWidth2 = 20;
var batteryX = 0;
var batteryX2 = 0;
var batterySpeed = 5;

// タイマーと得点
var timeup1 = 30;
var timer1;
var stopflg = false;            // 終り
var point = 0;

//ランキングの表示
var i = Number(sessionStorage.getItem("ivalue"));           //iの値を"ivalue"で呼び出す
var array = new Array(i);                                   //新しくサイズiの配列を作成する
for (i = 0; i < array.length; i++) {
    array[i] = Number(sessionStorage.getItem(i));           //配列に値を入れる
    console.log(array[i]);
}

array.sort(function(a,b){
    if(a>b) return -1;
    if(a<b) return 1;
    return 0;
});                                   //配列の数値を降順にソートする
document.getElementById("rank").innerHTML = "第1位:" + array[0] + "<br>第2位:" + array[1] + "<br>第3位:" + array[2] + "<br>"
var topscore = array[0];


// キー入力状態
var rightPressed = false;		// →キー
var leftPressed = false;		// ←キー
var spacePressed = false;		// Spaceキー

// 玉
var tamaRadius = 10;
var tamaX = 0;
var tamaY = 0;
var tamadx = 2;
var tamady = -2;
var tamaMoving = false;
var tamaSpeed = 10;



// 的
var matoRadius = 30;
var matoX = 60;
var matoY = 60;

//TimeやScoreの画像
//var img = document.getElementById("imase_place");
//img.src = "images/emoi.jpg";



if (sessionStorage.getItem("lastScore") != null) {
    document.getElementById("score").innerHTML = "前回の得点は" + sessionStorage.getItem("lastScore") + "点です。"
}
else {
    document.getElementById("score").innerHTML = "今回が初めての挑戦です"
}



document.addEventListener('keydown', keyDown, true);                //キー押下時処理を登録
document.addEventListener('keyup', keyUp, true);                     //キー押下終了時処理を登録

function keyDown(e) {
    if (e.keyCode == 39) {                              //右矢印のkeyCodeが39
        rightPressed = true;
    }
    else if (e.keyCode == 37) {                         //左矢印のkeyCodeが37
        leftPressed = true;
    }
    else if (e.keyCode == 32) {                         //spaceキーのkeyCodeが32
        spacePressed = true;
    }
}

function keyUp(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}


//起動時処理：起動時にのみ実行される
function easy() {                                                      //難易度:普通を選択時起動(draw2)
    document.getElementById("es").disabled = "disabled";
    document.getElementById("nm").disabled = "disabled";
    document.getElementById("df").disabled = "disabled";
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');                                     //コンテントを得る
    batteryX = (cvs.width - batteryWidth) / 2;
    batteryX2 = (cvs.width - batteryWidth2) / 2;
    draw1();                                 //画面を描く
    timeup1 = 30;                           //秒数
    point = 0;                              //得点
    timer1 = setInterval(countdwn, 1000);   //1秒ごとにcountdown関数を実行
}

function normal() {                                                      //難易度:普通を選択時起動(draw2)
    document.getElementById("es").disabled = "disabled";
    document.getElementById("nm").disabled = "disabled";
    document.getElementById("df").disabled = "disabled";
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');                                     //コンテントを得る
    batteryX = (cvs.width - batteryWidth) / 2;
    batteryX2 = (cvs.width - batteryWidth2) / 2;
    draw2();                                 //画面を描く
    timeup1 = 30;                           //秒数
    point = 0;                              //得点
    timer1 = setInterval(countdwn, 1000);   //1秒ごとにcountdown関数を実行
}



function difficult() {                                                      //難易度:普通を選択時起動(draw2)
    document.getElementById("es").disabled = "disabled";
    document.getElementById("nm").disabled = "disabled";
    document.getElementById("df").disabled = "disabled";
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');                                     //コンテントを得る
    batteryX = (cvs.width - batteryWidth) / 2;
    batteryX2 = (cvs.width - batteryWidth2) / 2;
    draw3();                                 //画面を描く
    timeup1 = 30;                           //秒数
    point = 0;                              //得点
    timer1 = setInterval(countdwn, 1000);   //1秒ごとにcountdown関数を実行
}



function countdwn() {
    timeup1 -= 1;
    if (timeup1 < 0) {                      //0秒になったら
        clearInterval(timer1);              //setIntervalを解除する
        stopflg = true;
        sessionStorage.setItem("lastScore", point);
        //pointによる評価の表示
        if (point > 0 && point < 15) {
            window.alert("まだまだだね。。。")
        } else if (point >= 15 && point < 30) {
            window.alert("その調子！！！")
        } else if (point >= 30) {
            window.alert("すばらしい！！！！！！！！！！")
        }
        //ハイスコアと表示
        if(point>topscore){
            console.log(array[0]);
            window.alert("New Recode");
        }
        //iの値の管理
        sessionStorage.setItem(i, point);           //得点の記録
        i++;
        sessionStorage.setItem("ivalue", i);        //iの値の記録
    }
}

// 的に玉が当たった？
function cheack() {

    if (tamaY <= matoRadius) {
        if (tamaX >= matoX - matoRadius && tamaX <= matoX + matoRadius) {           //tamaXがmatoの範囲に入っているか
            point += 1;
            matoX = matoRadius;                                                     //的を初期位置へ移動
        }
    }

}

function draw1() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');   //コンテントを得る
    ctx.clearRect(0, 0, cvs.width, cvs.height);             //canvas内を透明で塗りつぶす
    drawbattery();
    drawMato();

    if (stopflg) {                                         //時間切れで処理が終わる
        return;
    } else {
        document.getElementById("time").innerHTML = timeup1;      //得点・時間欄をHTMLへ記述
        document.getElementById("score1").innerHTML = point + "<br>";
    }

    if (tamaMoving) {
        cheack();
    }

    if (rightPressed && batteryX < cvs.width - batteryWidth) {
        batteryX += batterySpeed;                   //右矢印を押すと+5する(右に行く)
        batteryX2 += batterySpeed;                  //砲台上下どっちも
    }
    else if (leftPressed && batteryX > 0) {
        batteryX -= batterySpeed;                   //左矢印押すと-5する(左に行く)
        batteryX2 -= batterySpeed;                  //砲台上下どっちも
    }

    if (matoX + matoRadius > cvs.width) {
        matoX = matoRadius;                         //的が端っこに来たら的の位置を初期化                     
    } else {
        matoX += getRandomInt(10);                  //的がランダムの距離、移動している
    }

    // 玉の移動
    if (tamaMoving) {           //球が動いているなら
        tamaY -= tamaSpeed;
        drawball();
        if (tamaY < 0) {            //画面恥に到達した
            tamaMoving = false;     //球が動いていない
        }
        if (spacePressed) {
            spacePressed = false;
        }
    } else {
        if (spacePressed) {
            tamaX = batteryX2 + tamaRadius;
            tamaY = cvs.height - batteryHeight2 - tamaRadius;
            drawball();
            tamaMoving = true;              
            spacePressed = false;
        }
    }


    requestAnimationFrame(draw1);                    //drawが終わったらまたdrawを呼び出す(ループ処理の代わり)


}


function draw2() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');   //コンテントを得る
    ctx.clearRect(0, 0, cvs.width, cvs.height);             //canvas内を透明で塗りつぶす
    drawbattery();
    drawMato();

    if (stopflg) {                                         //時間切れで処理が終わる
        return;
    } else {
        document.getElementById("time").innerHTML =timeup1;      //得点・時間欄をHTMLへ記述
        document.getElementById("score1").innerHTML =point + "<br>";
    }

    if (tamaMoving) {
        cheack();
    }

    if (rightPressed && batteryX < cvs.width - batteryWidth) {
        batteryX += batterySpeed;                   //右矢印を押すと+5する(右に行く)
        batteryX2 += batterySpeed;                  //砲台上下どっちも
    }
    else if (leftPressed && batteryX > 0) {
        batteryX -= batterySpeed;                   //左矢印押すと-5する(左に行く)
        batteryX2 -= batterySpeed;                  //砲台上下どっちも
    }

    if (matoX + matoRadius > cvs.width) {
        matoX = matoRadius;                         //的が端っこに来たら的の位置を初期化                     
    } else {
        matoX += getRandomInt(20);                  //的がランダムの距離、移動している
    }

    // 玉の移動
    if (tamaMoving) {
        tamaY -= tamaSpeed;
        drawball();
        if (tamaY < 0) {
            tamaMoving = false;
        }
        if (spacePressed) {
            spacePressed = false;
        }
    } else {
        if (spacePressed) {
            tamaX = batteryX2 + tamaRadius;
            tamaY = cvs.height - batteryHeight2 - tamaRadius;
            drawball();
            tamaMoving = true;
            spacePressed = false;
        }
    }


    requestAnimationFrame(draw2);                    //drawが終わったらまたdrawを呼び出す(ループ処理の代わり)


}

function draw3() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');   //コンテントを得る
    ctx.clearRect(0, 0, cvs.width, cvs.height);             //canvas内を透明で塗りつぶす
    drawbattery();
    drawMato();

    if (stopflg) {                                         //時間切れで処理が終わる
        return;
    } else {
        document.getElementById("time").innerHTML = timeup1;      //得点・時間欄をHTMLへ記述
        document.getElementById("score1").innerHTML = point + "<br>"; 
    }

    if (tamaMoving) {
        cheack();
    }

    if (rightPressed && batteryX < cvs.width - batteryWidth) {
        batteryX += batterySpeed;                   //右矢印を押すと+5する(右に行く)
        batteryX2 += batterySpeed;                  //砲台上下どっちも
    }
    else if (leftPressed && batteryX > 0) {
        batteryX -= batterySpeed;                   //左矢印押すと-5する(左に行く)
        batteryX2 -= batterySpeed;                  //砲台上下どっちも
    }

    if (matoX + matoRadius > cvs.width) {
        matoX = matoRadius;                         //的が端っこに来たら的の位置を初期化                     
    } else {
        matoX += getRandomInt(30);                  //的がランダムの距離、移動している
    }

    // 玉の移動
    if (tamaMoving) {
        tamaY -= tamaSpeed;
        drawball();
        if (tamaY < 0) {
            tamaMoving = false;
        }
        if (spacePressed) {
            spacePressed = false;
        }
    } else {
        if (spacePressed) {
            tamaX = batteryX2 + tamaRadius;
            tamaY = cvs.height - batteryHeight2 - tamaRadius;
            drawball();
            tamaMoving = true;
            spacePressed = false;
        }
    }


    requestAnimationFrame(draw3);                    //drawが終わったらまたdrawを呼び出す(ループ処理の代わり)


}

//ここからはcanvas内に描画するプログラムなので、デザイン変更の場合はここいじる。
// 砲台の描写
function drawbattery() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');   //コンテントを得る  
    ctx.beginPath();
    ctx.rect(batteryX, cvs.height - batteryHeight, batteryWidth, batteryHeight);            //.rect(左上のx座標,左上のy座標,幅,高さ)
    ctx.rect(batteryX2, cvs.height - batteryHeight2, batteryWidth2, batteryHeight2);        //長方形の描画
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

// 玉の描画
function drawball() {
    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext('2d');   //コンテントを得る  
    ctx.beginPath();                           // パスの開始
    ctx.arc(tamaX, tamaY, tamaRadius, 0, Math.PI * 2);   // 円      .arc(中心のx座標,中心のy座標,半径,書き始める角度,終わりラジアン)
    ctx.fillStyle = "#0000ff";                 // 描画の塗りつぶしの色
    ctx.fill();                                // 塗りつぶし
    ctx.closePath();                           // パスの終了
}


// 的の描画
function drawMato() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(matoX, 0, matoRadius, 0, Math.PI);
    ctx.fillStyle = "#00ff00";                 // 描画の塗りつぶしの色
    ctx.fill();                                // 塗りつぶし
    ctx.closePath();                           // パスの終了
}
// 的のスピード値の取得
function getRandomInt(m) {
    return Math.floor(Math.random() * Math.floor(m));             //max=10 -> 0~9でランダムな数字が選ばれる
}

var array = [3];