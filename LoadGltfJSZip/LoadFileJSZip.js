function main() {
    // console.log(binMap);
    // draw();
    // console.log(gltfarray);
    draw();
    // console.log(hhhhh);
}



function getJsZipLoadTime() {
    var $result = $("#result");
    $("#file").on("change", function (evt) {
        $result.html("");// 每次清空内容
        $("#result_block").removeClass("hidden").addClass("show");// 设置显示内容

        /*获取数据后进行处理保存的主方法*/
        function handleFile(f) {
            var $title = $("<h4>", {
                text: f.name
            });
            $result.append($title);//添加zip包名字

            var dateBefore = new Date();
            console.time('spend');
            // var jsZip = new JSZip();
            JSZip.loadAsync(f)                                   // 1) read the Blob
                .then(function (zip) {

                    zip.forEach(function (relativePath, zipEntry) {  // 2) print entries

                        if (zipEntry.name.indexOf('.') != -1) {

                            if (getSub(zipEntry.name) == "bin") {

                                const p = zip.file(zipEntry.name).async('arraybuffer').then((e) => {
                                    return new Promise((resolve,reject)=>{
                                        binMap.set(zipEntry.name, e);
                                        resolve();
                                    });
                                    
                                });

                                p_arr.push(p);

                            }
                        }

                    });
                    
                    return Promise.all(p_arr).then(()=>{
                        return zip;
                    });

                }).then((zip) => {
                    // console.log(p_arr);
                    zip.forEach(function (relativePath, zipEntry) {
                        if (getSub(zipEntry.name) == "gltf") {
                            const gltp = zip.file(zipEntry.name).async('string').then((data) => {

                            return new Promise((resolve,reject)=>{
                                gltfloader.load(
                                    data,
                                    zipEntry.name,
                                    function (gltf) {
                                        // gltfarray.push(gltf);
                                        scene.add(gltf.scene);
                                        resolve();
                                    },
                                    // called while loading is progressing
                                    function (xhr) {
                                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                                    },
                                    // called when loading has errors
                                    function (error) {
                                        console.log('An error happened');
                                    }
                                );
                            })
                            
                            });
                            glp_arr.push(gltp);
                        }
                        
                    });

                    return glp_arr;
                   
                }).then((glp_arr)=>{
                    
                   return Promise.all(glp_arr).then(()=>{
                       console.timeEnd('spend');
                   });
                });

                

        }

        var files = evt.target.files;

        for (var i = 0; i < files.length; i++) {
            handleFile(files[i]);
        }

    });
}









// var dateAfter = new Date();

// //    console.log(zip);
// $title.append($("<span>", {
//     "class": "small",
//     text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
// }));

function getSub(obj) {
    let index = obj.lastIndexOf('.');
    obj = obj.substring(index + 1, obj.length)
    return obj
}

/*判断字符串是否可以转换成json对象 */
function istoJson(str) {
    try {
        if (typeof JSON.parse(str) == 'object') {
            return true;
        }
    } catch (e) {
        console.log(e)
        //TODO handle the exception
    }
    return false;
}