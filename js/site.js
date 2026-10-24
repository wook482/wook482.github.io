(function () {
  var clock = document.getElementById("clock");
  var kind = document.querySelector(".slate-kind");
  var title = document.querySelector(".slate-title");
  var count = document.getElementById("slate-count");
  var slates = [
    { kind: "Documentary", title: "Kalshi" },
    { kind: "Funding film", title: "fal" },
    { kind: "Partnership", title: "a16z" },
    { kind: "Documentary", title: "Altos" }
  ];
  var index = 0;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function renderClock() {
    var seconds = Math.floor(performance.now() / 1000);
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = seconds % 60;
    clock.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
  }

  function renderSlate() {
    var item = slates[index];
    kind.textContent = item.kind;
    title.textContent = item.title;
    count.textContent = pad(index + 1) + " / " + pad(slates.length);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function step(direction) {
    stop();
    index = (index + direction + slates.length) % slates.length;
    renderSlate();
  }

  renderClock();
  renderSlate();

  if (!reduced) {
    setInterval(renderClock, 1000);
    timer = setInterval(function () {
      index = (index + 1) % slates.length;
      renderSlate();
    }, 4200);
  }

  document.getElementById("slate-prev").addEventListener("click", function () {
    step(-1);
  });
  document.getElementById("slate-next").addEventListener("click", function () {
    step(1);
  });

  var finder = document.querySelector(".finder");
  finder.addEventListener("mouseenter", stop);
  finder.addEventListener("focusin", stop);
})();
