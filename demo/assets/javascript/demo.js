function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}


var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  document.body.innerHTML = "<p>Sorry, this website is best used on desktop, not on mobile.</p>"
}

let times = 0
function generate() {
  var spop = document.getElementById("S").value
  var ipop = document.getElementById("I").value 
  var rn = document.getElementById("rn").value 
  var t = document.getElementById("time").value
  var u = document.getElementById("u").value
  var pop = Number(spop)+Number(ipop)
  var a = document.getElementById("a").value
  if (times > 0) {
    const chart = Chart.getChart("model")
    chart.destroy()
  }
  seir("model", rn, spop, ipop, t, u, 1/a, pop)
  times++
}