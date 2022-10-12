        // 打印斐波那契数列
        function printFibonacci(n){
            if (typeof n != "number"){
                console.log("input type must be integer that bigger than 0");
                return;
            }
            if (n < 1){
                console.log("input must be bigger than 0");
                return;
            }
            if (n < 2){
                document.write("1");
            }else if (n < 3){
                document.write("1<br>1");
            }else{
                document.write("1<br>1<br>");
                let a=1, b=1, c=0;
                for(let i=2;i<n;++i){
                    c = a+b;
                    a = b;
                    b = c;
                    document.write(c+"<br>")
                }
            }
        }

        printFibonacci(5);

        // 打印金字塔
        function printPyramid(n){
            if (typeof n != "number"){
                console.log("input type must be integer that bigger than 0");
                return;
            }
            if (n < 1){
                console.log("input must be bigger than 0");
                return;
            }
            let space = "&nbsp", cont = "*";
            for (let i=0;i<n;++i){
                document.write(space.repeat(n-i-1)+cont.repeat(2*i+1)+"<br>");
            }
        }

        printPyramid(5);

        // 交换数组中的两个元素
        function swap(arr, i, j){
            if(i === j){
                return;
            }
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }

        // 在原数组中清除重复元素，并未新建数组
        function removeRepeatItemOfArray(arr){
            if (!Array.isArray(arr)){
                console.log("input type must be Array");
            }
            // 分别记录当前位置和有效数据的结束位置
            let cur=1, pre = 0, flag=false;
            while(cur<arr.length){
                flag = false;
                for(let i=0; i<=pre; ++i){
                    if(arr[i] === arr[cur]){
                        flag=true;
                        break;
                    }
                }
                if (!flag){
                    swap(arr, cur, ++pre);
                }
                ++cur;
            }
            arr.length = pre+1;
        }

        let testArr = [1,3,5,5,7,9,5,11];
        removeRepeatItemOfArray(testArr);
        document.write(testArr);