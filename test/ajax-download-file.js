// js 下载文件
function downloadFile(url) {
  if (typeof(downloadFile.iframe) == 'undefined') {
    downloadFile.iframe  = document.createElement('iframe');
    document.body.appendChild(downloadFile.iframe);
  }
  downloadFile.iframe.src = url;
  downloadFile.iframe.style.display = 'none';
}