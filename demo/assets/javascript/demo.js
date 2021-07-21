function vh(v) {
    var h : any = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

function vw(v) {
    var w : any = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}


var isMobile : any = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  document.body.innerHTML = "<p>Sorry, this website is best used on desktop, not on mobile.</p>"
}

let times : number = 0
function generate() {
  var spop : any = document.getElementById("S").value
  var ipop : any = document.getElementById("I").value 
  var rn : any = document.getElementById("rn").value 
  var t : any = document.getElementById("time").value
  var u : any = document.getElementById("u").value
  var pop : any = Number(spop)+Number(ipop)
  var a : any = document.getElementById("a").value
  if (times > 0) {
    const chart : any = Chart.getChart("model")
    chart.destroy()
  }
  seir("model", rn, spop, ipop, t, u, 1/a, pop)
  times++
}