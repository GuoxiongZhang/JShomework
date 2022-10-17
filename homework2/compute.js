var operationPattern = RegExp("[-/+×]", "g");

// 计算结果
function computer(str){
    let strSplit = str.split(operationPattern);
    let stack = new Array();
    let index=0, res=0, tmp=0, oper="";
    for (let i=0; i<strSplit.length; ++i){
        // console.log("sp:"+strSplit[i]);
        if (strSplit[i] === ""){ // 应对最后一个字符是操作符的情况
            break;
        }
        if (stack.length==0){
            stack.push(parseFloat(strSplit[i]));
        }else{
            if (stack[stack.length-1]=="/" || stack[stack.length-1]=="×"){
                oper = stack.pop();
                tmp = stack.pop();
                if (oper=="/"){
                    stack.push(tmp/parseFloat(strSplit[i]));
                }else{
                    stack.push(tmp*parseFloat(strSplit[i]));
                }
            }else{
                stack.push(parseFloat(strSplit[i]));
            }
        }
        index += strSplit[i].length;
        stack.push(str.substring(index, ++index)); //操作符入栈
        // ++index;
        // console.log(stack);
    }
    stack.pop();  // 弹出最后的（操作符或空字符）
    while(stack.length > 1){
        tmp = stack.pop();
        oper = stack.pop();
        if (oper == "-"){
            res -= tmp;
        }else{
            res += tmp;
        }
    }
    res += stack.pop();
    return res;
}
// var operationPattern = /[-+/×]/g;
window.onload = function(){
    let showWindow = document.getElementsByClassName("show-text")[0]; // 显示窗口
    let operationButton = document.getElementsByClassName("operation"); // 操作符按钮
    let numberButton = document.getElementsByClassName("number");  // 数字按钮
    // let oriShowWindow = document.getElementsByClassName("show-text-ori")[0];
    // 数字按钮点击操作
    for(let i=0; i<numberButton.length; ++i){
        numberButton[i].onclick = function(){
            if (showWindow.innerHTML.includes("=")){
                showWindow.innerHTML = "";
            }
            showWindow.innerHTML += numberButton[i].firstElementChild.innerHTML;
        };
    };
    // 清除按钮
    operationButton[0].onclick = function(){
        showWindow.innerHTML="";
    };
    // % 按钮
    operationButton[2].onclick = function(){
        // let operationPattern = /[/-+×]/g;
        let str = showWindow.innerHTML;
        // 最后一个字符是操作符，按此键无效
        if (str.length == 0 || operationPattern.exec(str.charAt(str.length-1)) != null){
            console.log("error")
            return;
        }

        let strSplit = str.split(operationPattern);
        let lastNumberLength = strSplit[strSplit.length-1].length;
        let lastNumber = parseFloat(strSplit[strSplit.length-1]) / 100;
        showWindow.innerHTML = showWindow.innerHTML.substring(0, str.length-lastNumberLength)+lastNumber;
    };

    // 退格键
    operationButton[3].onclick = function(){
        let str = showWindow.innerHTML;
        if (str.length == 0){
            return;
        }
        showWindow.innerHTML = str.substring(0, str.length-1);
    }

    // 除法键
    operationButton[4].onclick = function(){
        let str = showWindow.innerHTML;
        if (str.length == 0){
            return;
        }
        if (operationPattern.exec(str.charAt(str.length-1)) != null){
            showWindow.innerHTML = str.substring(0, str.length-1) + "/";
        }else{
            showWindow.innerHTML += "/";
        }
    }
    // 乘法键
    operationButton[5].onclick = function(){
        let str = showWindow.innerHTML;
        if (str.length == 0){
            return;
        }
        if (operationPattern.exec(str.charAt(str.length-1)) != null){
            showWindow.innerHTML = str.substring(0, str.length-1) + "×";
        }else{
            showWindow.innerHTML += "×";
        }
    }
    // 减法键
    operationButton[6].onclick = function(){
        let str = showWindow.innerHTML;
        if (str.length == 0){
            return;
        }
        if (operationPattern.exec(str.charAt(str.length-1)) != null){
            showWindow.innerHTML = str.substring(0, str.length-1) + "-";
        }else{
            showWindow.innerHTML += "-";
        }
    }
    // 加法键
    operationButton[9].onclick = function(){
        let str = showWindow.innerHTML;
        if (str.length == 0){
            return;
        }
        if (operationPattern.exec(str.charAt(str.length-1)) != null){
            showWindow.innerHTML = str.substring(0, str.length-1) + "+";
        }else{
            showWindow.innerHTML += "+";
        }
    }
    // 小数点
    operationButton[7].onclick = function(){
        let str = showWindow.innerHTML;
        if (str.length == 0 || operationPattern.exec(str.charAt(str.length-1)) != null){
            showWindow.innerHTML += "0.";
            return;
        }
        let strSplit = str.split(operationPattern);
        if (strSplit[strSplit.length-1].includes(".")){
            return;
        }else{
            showWindow.innerHTML += ".";
        }
    }
    // 等号
    operationButton[8].onclick = function(){
        let res = computer(showWindow.innerHTML);
        showWindow.innerHTML += "<br>="+res;
        // oriShowWindow.innerHTML = showWindow.innerHTML;
    }
}