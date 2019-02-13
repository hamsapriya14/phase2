var request;
var result;
  var open;
  var tx;
  var store;
  var indexedDB=window.indexedDB || window.webkitIndexedDB || window.msIndexedDB;
  request=indexedDB.open("mydatabase",1);
  request.onerror=function(e){
    console.log("error");
  }
  request.onupgradeneeded=function(e){
    result=e.target.result;
    store=createObjectStore("resume",{keyPath:"name"});
    }
    request.onsuccess=function(e){
      result=e.target.result;

      function getdata(callback){
        tx=result.transaction("resume",IDBTransaction.READ_ONLY);
        store=tx.objectStore("resume");
        data=[];
        tx.oncomplete=function(e){
          callback(result);
          console.log(result);
        }
          var cursor=store.openCursor();
          cursor.onerror=function(e){
            console.log("error" +e);
          }
          cursor.onsuccess=function(e){
            var d=e.target.result;
            if(d)
            {
              data.push(d.value);
              d.continue();
            }
          }
            }
            var parent=document.querySelector(".parent");
            getdata(function(d)
            {
              console.log(d);
              for(var i in data)
              {
                var child=document.createElement("div");
                child.classList.add("child");
                parent.appendChild(child);

                var img=document.createElement("img");
                img.src="1.jpeg";
                img.alt=data[i].name;
                child.appendChild(img);

                var name=document.createElement("h2");
                name.textContent=data[i].name;
                child.appendChild(name);

                var email=document.createElement("h2");
                email.textContent=data[i].email;
                child.appendChild(email);

                var button=document.createElement("a");
                button.textContent="view profile";
                button.href="1.html?name="+data[i].name;
                child.appendChild(button);
              }
            })

      }
