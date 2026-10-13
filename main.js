function getAPI(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'json'
	
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) { resolve(xhr.response) }
	  else { reject(new Error(`Request failed with status ${xhr.status}`)) }
    }

    xhr.onerror = function() { reject(new Error('Network error')) }
    xhr.send()
  })
}

function copy(txt) {
  var d = document.createElement('textarea')
  d.textContent = txt
  document.body.append(d)
  d.select()
  document.execCommand('copy')
  d.remove()
}

function padnum(x, n) {
  // x: 숫자(문자열), n: 자릿수
  return String(x).padStart(n, '0')
}

var theme = ''

window.onload = async function() {
  var box = document.querySelector('#box')
  var res = await getAPI('https://namu.wiki/app-api/ranking')
  var s = 1

  for (var i of res['keywords']) {
    i = i['keyword']
    box.innerHTML += `
    <div>
     ${s}. <a href="#" class='a' onClick="window.open('https://namu.wiki/w/${i}')">${i}</a>  <span><i class="bi bi-copy mini" onClick="copy('${i}')"></i></span>
    </div>`
    s += 1
  }
  
  var now = new Date()
  var txt = `${now.getFullYear()}년 ${padnum(now.getMonth()+1, 2)}월  ${padnum(now.getDate(), 2)}일 ${padnum(now.getHours(), 2)}시 ${padnum(now.getMinutes(), 2)}분 ${padnum(now.getSeconds(), 2)}초 기준`
  
  document.querySelector('#uptime').innerHTML = txt
  
  var prefer = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  
  theme = prefer ? 'dark' : 'light'
  if (prefer) {
    document.querySelector('#toggle').innerHTML = '☑ 다크모드'
  }
}

function toggle(e) {
  var ele =  document.querySelector('html')
  var b = ''
  if (theme == 'dark') {
    ele.setAttribute('data-theme', 'light')
    theme = 'light'
    b = '☐'
  } else {
   ele.setAttribute('data-theme', 'dark')
    theme = 'dark'
    b = '☑'
  }
  e.innerHTML = b + ' 다크모드'
}
