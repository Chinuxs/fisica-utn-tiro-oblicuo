const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const v0Slider = document.getElementById("v0");
const thetaSlider = document.getElementById("theta");
const timeSlider = document.getElementById("time");

const v0Val = document.getElementById("v0Val");
const thetaVal = document.getElementById("thetaVal");
const tVal = document.getElementById("tVal");
const values = document.getElementById("values");

const conceptButtons = document.querySelectorAll("[data-concept]");
const conceptTitle = document.getElementById("concept-title");
const conceptDefinition = document.getElementById("concept-definition");

const g = 9.8;
const margin = 64;

const concepts = {
  position: {
    title: "Vector posicion",
    definition:
      "Es la flecha que va desde el origen hasta la particula. Muestra donde esta el objeto en ese instante.",
  },
  velocity: {
    title: "Vector velocidad",
    definition:
      "Es la flecha que indica hacia donde se mueve la particula y con que rapidez. Siempre apunta tangente a la trayectoria.",
  },
  acceleration: {
    title: "Aceleracion",
    definition:
      "Es el cambio de la velocidad. En este caso apunta hacia abajo y representa la accion de la gravedad.",
  },
  trajectory: {
    title: "Trayectoria",
    definition:
      "Es el camino que sigue la particula mientras vuela. En el tiro oblicuo ideal tiene forma de parabola.",
  },
};

let activeConcept = "position";

const colors = {
  axes: "#d9e2f2",
  text: "#edf4ff",
  muted: "rgba(237, 244, 255, 0.55)",
  trajectory: "#9cd0ff",
  position: "#4da3ff",
  velocity: "#ff9f43",
  acceleration: "#ff6b6b",
  grid: "rgba(237, 244, 255, 0.08)",
};

function degToRad(deg) {
  return deg * Math.PI / 180;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pointAtTime(v0, theta, t) {
  const vx = v0 * Math.cos(theta);
  const vy0 = v0 * Math.sin(theta);

  return {
    x: vx * t,
    y: vy0 * t - 0.5 * g * t * t,
    vx,
    vy: vy0 - g * t,
  };
}

function drawArrow(x1, y1, x2, y2, options = {}) {
  const {
    color = colors.text,
    width = 3,
    alpha = 1,
    label = "",
    labelOffsetX = 8,
    labelOffsetY = -8,
    dashed = false,
    glow = false,
    fillColor = color,
  } = options;

  const headLength = 12;
  const angle = Math.atan2(y2 - y1, x2 - x1);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (dashed) {
    ctx.setLineDash([10, 7]);
  }

  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
  }

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headLength * Math.cos(angle - Math.PI / 6),
    y2 - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - headLength * Math.cos(angle + Math.PI / 6),
    y2 - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();

  if (label) {
    ctx.shadowBlur = 0;
    ctx.font = "600 14px Trebuchet MS, Segoe UI, sans-serif";
    ctx.fillStyle = colors.text;
    ctx.fillText(label, x2 + labelOffsetX, y2 + labelOffsetY);
  }

  ctx.restore();
}

function drawGrid(originX, originY, scale, maxX, maxY) {
  ctx.save();
  ctx.strokeStyle = colors.grid;
  ctx.fillStyle = colors.muted;
  ctx.lineWidth = 1;
  ctx.font = "12px Trebuchet MS, Segoe UI, sans-serif";
  ctx.globalAlpha = 0.35;

  const maxAxisX = Math.max(maxX, 1);
  const maxAxisY = Math.max(maxY, 1);
  const stepX = maxAxisX / 5;
  const stepY = maxAxisY / 5;

  for (let i = 1; i <= 5; i += 1) {
    const gx = originX + stepX * i * scale;
    ctx.beginPath();
    ctx.moveTo(gx, originY);
    ctx.lineTo(gx, 32);
    ctx.stroke();
    ctx.fillText((stepX * i).toFixed(0) + " m", gx - 18, originY + 18);
  }

  for (let i = 1; i <= 4; i += 1) {
    const gy = originY - stepY * i * scale;
    ctx.beginPath();
    ctx.moveTo(originX, gy);
    ctx.lineTo(canvas.width - 24, gy);
    ctx.stroke();
    ctx.fillText((stepY * i).toFixed(0) + " m", 10, gy + 4);
  }

  ctx.restore();
}

function pathLength(v0, theta, currentTime) {
  const steps = 260;
  let total = 0;
  let previous = pointAtTime(v0, theta, 0);

  for (let i = 1; i <= steps; i += 1) {
    const sampleTime = currentTime * i / steps;
    const current = pointAtTime(v0, theta, sampleTime);
    const dx = current.x - previous.x;
    const dy = current.y - previous.y;
    total += Math.hypot(dx, dy);
    previous = current;
  }

  return total;
}

function updateConceptPanel() {
  const concept = concepts[activeConcept];
  conceptTitle.textContent = concept.title;
  conceptDefinition.textContent = concept.definition;

  conceptButtons.forEach((button) => {
    const isActive = button.dataset.concept === activeConcept;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateValues(items) {
  values.innerHTML = items
    .map(
      ({ label, value }) => `
        <div class="values__item">
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>`
    )
    .join("");
}

function alphaFor(concept, strong = 1, weak = 0.18) {
  return activeConcept === concept ? strong : weak;
}

function draw() {
  const v0 = Number(v0Slider.value);
  const thetaDeg = Number(thetaSlider.value);
  const theta = degToRad(thetaDeg);

  const flightTime = (2 * v0 * Math.sin(theta)) / g;
  timeSlider.max = flightTime.toFixed(2);

  let t = Number(timeSlider.value);
  t = clamp(t, 0, flightTime);
  timeSlider.value = t.toFixed(2);

  const current = pointAtTime(v0, theta, t);
  const trajectoryEnd = pointAtTime(v0, theta, flightTime);
  const range = trajectoryEnd.x;
  const maxHeight = Math.pow(v0 * Math.sin(theta), 2) / (2 * g);
  const displacement = Math.hypot(current.x, current.y);
  const speed = Math.hypot(current.vx, current.vy);
  const camino = pathLength(v0, theta, t);

  const scaleX = (canvas.width - 2 * margin) / Math.max(range, 1);
  const scaleY = (canvas.height - 2 * margin) / Math.max(maxHeight * 1.3, 1);
  const scale = Math.min(scaleX, scaleY);
  const originX = margin;
  const originY = canvas.height - margin;

  const sx = (xm) => originX + xm * scale;
  const sy = (ym) => originY - ym * scale;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(originX, originY, scale, range, maxHeight);

  drawArrow(originX, originY, canvas.width - 28, originY, {
    color: colors.axes,
    width: 2,
    alpha: 0.28,
    label: "x",
    labelOffsetX: 4,
    labelOffsetY: -10,
  });
  drawArrow(originX, originY, originX, 34, {
    color: colors.axes,
    width: 2,
    alpha: 0.28,
    label: "y",
    labelOffsetX: 8,
    labelOffsetY: -6,
  });

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = colors.axes;
  ctx.font = "600 13px Trebuchet MS, Segoe UI, sans-serif";
  ctx.fillText("Origen", originX - 20, originY + 22);
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = activeConcept === "trajectory" ? 4 : 2;
  ctx.strokeStyle = colors.trajectory;
  ctx.globalAlpha = alphaFor("trajectory", 1, 0.14);
  for (let i = 0; i <= 220; i += 1) {
    const sampleTime = flightTime * i / 220;
    const sample = pointAtTime(v0, theta, sampleTime);
    if (i === 0) {
      ctx.moveTo(sx(sample.x), sy(sample.y));
    } else {
      ctx.lineTo(sx(sample.x), sy(sample.y));
    }
  }
  ctx.stroke();
  ctx.restore();

  const px = sx(current.x);
  const py = sy(current.y);
  const pointAlpha = activeConcept === "position" ? 1 : 0.22;

  if (activeConcept === "position") {
    drawArrow(originX, originY, px, py, {
      color: colors.position,
      width: 4,
      alpha: 1,
      label: "r(t)",
      glow: true,
    });
  } else {
    drawArrow(originX, originY, px, py, {
      color: colors.position,
      width: 2,
      alpha: 0.18,
    });
  }

  const velocityScale = 0.55 * scale;
  if (activeConcept === "velocity") {
    drawArrow(px, py, px + current.vx * velocityScale, py - current.vy * velocityScale, {
      color: colors.velocity,
      width: 4,
      alpha: 1,
      label: "v(t)",
      glow: true,
    });
  } else {
    drawArrow(px, py, px + current.vx * velocityScale, py - current.vy * velocityScale, {
      color: colors.velocity,
      width: 2,
      alpha: 0.18,
    });
  }

  if (activeConcept === "acceleration") {
    drawArrow(px, py, px, py + 64, {
      color: colors.acceleration,
      width: 4,
      alpha: 1,
      label: "a = g",
      labelOffsetX: 10,
      labelOffsetY: 16,
      glow: true,
    });
  } else {
    drawArrow(px, py, px, py + 64, {
      color: colors.acceleration,
      width: 2,
      alpha: 0.18,
    });
  }

  ctx.save();
  ctx.globalAlpha = pointAlpha;
  ctx.fillStyle = "#08111d";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(px, py, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  if (activeConcept === "position") {
    ctx.fillStyle = colors.text;
    ctx.font = "600 13px Trebuchet MS, Segoe UI, sans-serif";
    ctx.fillText("P(t)", px + 10, py - 10);
  }
  if (activeConcept === "trajectory") {
    ctx.fillStyle = colors.text;
    ctx.font = "600 13px Trebuchet MS, Segoe UI, sans-serif";
    ctx.fillText("Trayectoria parabolica", sx(range * 0.43), sy(maxHeight * 0.92));
  }
  ctx.restore();

  v0Val.textContent = v0.toFixed(0);
  thetaVal.textContent = thetaDeg.toFixed(0);
  tVal.textContent = t.toFixed(2);

  updateValues([
    { label: "Tiempo de vuelo", value: `${flightTime.toFixed(2)} s` },
    { label: "Posicion x(t)", value: `${current.x.toFixed(2)} m` },
    { label: "Posicion y(t)", value: `${current.y.toFixed(2)} m` },
    { label: "Modulo de r(t)", value: `${displacement.toFixed(2)} m` },
    { label: "Camino recorrido", value: `${camino.toFixed(2)} m` },
    { label: "vx(t)", value: `${current.vx.toFixed(2)} m/s` },
    { label: "vy(t)", value: `${current.vy.toFixed(2)} m/s` },
    { label: "|v(t)|", value: `${speed.toFixed(2)} m/s` },
    { label: "ax, ay", value: `0 , -${g.toFixed(1)} m/s2` },
    { label: "Alcance", value: `${range.toFixed(2)} m` },
    { label: "Altura maxima", value: `${maxHeight.toFixed(2)} m` },
  ]);
}

function setActiveConcept(concept) {
  activeConcept = concept;
  updateConceptPanel();
  draw();
}

conceptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveConcept(button.dataset.concept);
  });
});

[v0Slider, thetaSlider, timeSlider].forEach((control) => {
  control.addEventListener("input", draw);
});

updateConceptPanel();
draw();
