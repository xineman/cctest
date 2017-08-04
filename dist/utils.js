"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajax = ajax;
function ajax(url, method, data) {
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    if (data) xhttp.send(JSON.stringify(data));else xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) resolve(this.responseText);else reject({ error: "Request failed", url: url });
      }
    };
  });
}