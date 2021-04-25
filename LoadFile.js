// import $ from 'jquery';  //必须引入jquery

let pageData = [];//用来存放Json数据
let url;    //url
let arrayBuffer;//存放图片Data的arraybuffer
let byteArray;//存放图片的Uint8Array
let resultByteArray = [];//存放图片Uint8数组的结果数组
 

//获取图片数据的方法
function getImageData(filename){  
    var request;
    url = "http://10.100.41.40:9966/LoadTimeTest//loadfile/"+filename
    if(window.XMLHttpRequest){  
        request = new XMLHttpRequest();  
    }else if(window.ActiveXObject){   //iE浏览器用
        request = new window.ActiveXObject();  
    }else{  
        alert("请升级至最新版本的浏览器");  
    }  
    if(request !=null){  
        request.open("GET",url,true);  
        request.send(null);  
        request.responseType = "arraybuffer";       //接受的类型为arraybuffer
        request.onreadystatechange=function(){  
            if(request.readyState==4&&request.status==200){ 

                arrayBuffer =request.response;//接受图片的arraybuffer

                if (arrayBuffer) {
                    byteArray = new Uint8Array(arrayBuffer);//将arraybuffer转化成Uint8数组
                    resultByteArray.push(byteArray);
            }  


            //获取返回blob类型的对象数据   将blob对象创建url 显示在html中
        //     var blob = request.response;
        //     console.log(blob);
        //     var image = new Image(); 
        //     image.addEventListener("load", function (evt) {
        //         URL.revokeObjectURL(evt.target.src);
        //         document.body.appendChild(image);
        //     });
        //     image.src = URL.createObjectURL(blob);        

            }  
        };  
    }  
}  

//获取json数据的方法
function JQGetJsonData(filename){
    
$.ajax({
    url: "http://10.100.41.40:9966/LoadTimeTest//loadfile/"+filename,//json文件位置，文件名
    type: "GET",//请求方式为get
    dataType: "text", //返回数据格式为json
    success: function(data) {//请求成功完成后要执行的方法 
       //给info赋值给定义好的变量
       pageData.push(data);
    }
})

}



//获取加载所有文件的时间
function getLoadTime(){
    var $result = $("#result");//html用来展示打开的所有文件名称

    const file = document.getElementById('file');//获得文档dom元素
    file.addEventListener('change', function() {
        $result.html("");// 清空其中的内容
        $("#result_block").removeClass("hidden").addClass("show"); // 显示其中内容

        let t_files = this.files; //选择的文件
        /*
            存放文件名称 和文件名后缀的map对象 同时将文件名显示在html中
        */
        var MyMap = new Map();
        for(var i = 0, len = t_files.length; i < len; i++) {
            MyMap.set(t_files[i].name,getSub(t_files[i].name));
            var $title = $("<h4>", {//存放文件名称的h4
                text : t_files[i].name
            });
            $result.append($title);//result添加tittle元素
        };

        // for(var key in MyMap){
        // }

        var filenameArray = Array.from(MyMap);//存放文件名称和格式的二维数组

        console.time('xx');//记录开始时间
        var dateBefore = new Date();

        for(let i=0;i<filenameArray.length;i++){
            if(filenameArray[i][1]=="json"){
                JQGetJsonData(filenameArray[i][0]); //获取json对象
            }else{
                getImageData(filenameArray[i][0]);  //获取图片arraybuffer转成类型化数组
            }  
        }

        //记录结束时间
        var dateAfter = new Date();
        var $time = $("#time");             //将时间显示
            $time.append($("<span>", {
                "class": "small",
                text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
            }));
        console.timeEnd('xx');
    
    }, false);

}

//获取字符串后的内容
function getSub (obj){
    let index = obj.lastIndexOf('.');
    obj = obj.substring(index+1, obj.length)
    return obj
}


function main(){
    getLoadTime();      //执行获取时间方法
    console.log(pageData);  //打印json对象数组
    console.log(resultByteArray);   /*打印图片类型化数组 */
}