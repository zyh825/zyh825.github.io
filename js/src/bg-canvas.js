(function () {
  const canvas = document.getElementById('bg-canvas');
  canvas.height = document.body.offsetHeight;
  canvas.width = document.body.offsetWidth;
  const ctx = canvas.getContext('2d');
  const ch = canvas.height;
  const cw = canvas.width;
  const circlesInstance = [];

  function Circle(x, y) {
    this.r = Math.random() * 10 + 1;
    this.x = x;
    this.y = y;
    this.stepx = Math.random() * 2 - 1;
    this.stepy = Math.random() * 2 - 1;
  }

  Circle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 360);
    ctx.closePath();
    ctx.fillStyle = 'rgba(204, 204, 204, 0.2)';
    ctx.fill();
  }

  Circle.prototype.link = function (targetCircle) {
    const dx = this.x - targetCircle.x;
    const dy = this.y - targetCircle.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 150) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y); //起始点
      ctx.lineTo(targetCircle.x, targetCircle.y); //终点
      ctx.closePath();
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.1)';
      ctx.stroke();
    }
  }

  Circle.prototype.move = function (w, h) {
    this.stepx = (this.x < w && this.x > 0) ? this.stepx : (- this.stepx);
    this.stepy = (this.y < h && this.y > 0) ? this.stepy : (- this.stepy);
    this.x += this.stepx / 2;
    this.y += this.stepy / 2;
  }

  //insert 
  for (let i = 0; i < 100; i++) {
    circlesInstance.push(new Circle(Math.random() * cw, Math.random() * ch));
  }

  // draw
  let draw = function () {
    ctx.clearRect(0, 0, cw, ch);
    for (let i = 0; i < circlesInstance.length; i++) {
      circlesInstance[i].move(cw, ch);
      circlesInstance[i].draw();
      for (j = i + 1; j < circlesInstance.length; j++) {
        circlesInstance[i].link(circlesInstance[j])
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();