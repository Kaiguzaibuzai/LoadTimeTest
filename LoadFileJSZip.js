let U8array = [];//存放图片数据的Uint8Array

let resultJson = [];//存放json对象的结果数组

function main(){
    getJsZipLoadTime();//获取JsZip方法获得数据的时间
    console.log(U8array);
    console.log(resultJson);
}

function getJsZipLoadTime(){
    var $result = $("#result");
    $("#file").on("change", function(evt) {
    $result.html("");// 每次清空内容
        
    $("#result_block").removeClass("hidden").addClass("show");// 设置显示内容
    
        /*获取数据后进行处理保存的主方法*/
        function handleFile(f) {    
            var $title = $("<h4>", {
                text : f.name
            });
            $result.append($title);//添加zip包名字
            
            var dateBefore = new Date();
            // var jsZip = new JSZip();
            JSZip.loadAsync(f)                                   // 1) read the Blob
            .then(function(zip) {
               
                let i = 0;//用来从第二次开始(第一次要打开zip包)
                zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                   //i++ && 表达式  (写法)  i++ && 表达式
                   if(i){
                        if(getSub(zipEntry.name) == "json"){
                            zip.file(zipEntry.name).async('String').then((e)=>{
                            resultJson.push( JSON.parse(e));
                            }); 
                        }else{
                            zip.file(zipEntry.name).async('uint8array').then((e)=>{
                                U8array.push(e);
                            }); 
                        }
                    }
                   i++;
                   
                    // i++ && zip.file(zipEntry.name).async('uint8array').then((e)=>{
                    //     console.log(e);
                    // }); // a promise of "Hello World\n"
                });


                var dateAfter = new Date();
                //    console.log(zip);
                $title.append($("<span>", {
                    "class": "small",
                    text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
                }));

            }, function (e) {
                $result.append($("<div>", {
                    "class" : "small",
                    text : "Error reading " + f.name + ": " + e.message
                }));
            });

        }
    
        var files = evt.target.files;
        console.time('xx');
        for (var i = 0; i < files.length; i++) {
            handleFile(files[i]);
        }
        console.timeEnd('xx');
    });
}

function getSub (obj){
    let index = obj.lastIndexOf('.');
    obj = obj.substring(index+1, obj.length)
    return obj
}

/*判断字符串是否可以转换成json对象 */
function istoJson(str) {
    try{
        if (typeof JSON.parse(str) == 'object') {
            return true;
        }
    }catch(e){
        console.log(e)
            //TODO handle the exception
    }
    return false;
}
