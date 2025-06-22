const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const segments = ["₦5,000", "₦10,000", "₦50,000", "₦100,000", "500,000", "Your choice"];
const colors = ["#e5c6f4", "#f8bbd0", "#d1c4e9", "#b2ebf2", "#ffe082", "#c8e6c9"];

const numSegments = segments.length;
const angleStep = (2 * Math.PI) / numSegments;

let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < numSegments; i++) {
    const start = angleStep * i;
    const end = start + angleStep;

    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 240, start, end);
    ctx.fillStyle = colors[i];
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(start + angleStep / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(segments[i], 130, 10);
    ctx.restore();
  }
}

function rotateWheel() {
  if (isSpinning) return;
  isSpinning = true;

  const rotation = Math.random() * 360 + 720; // At least 2 full spins
  let totalRotation = 0;
  const duration = 5000;
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic

    totalRotation = rotation * ease;

    ctx.clearRect(0, 0, 500, 500);
    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate((totalRotation * Math.PI) / 180);
    ctx.translate(-250, -250);
    drawWheel();
    ctx.restore();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning = false;
      const finalAngle = totalRotation % 360;
      const normalizedAngle = (270 - finalAngle + 360) % 360;
      const segmentAngle = 360 / numSegments;
      const selected = Math.floor(normalizedAngle / segmentAngle) % numSegments;
      alert("you spinned : ), now you send the birthday girl: " + segments[selected] + " Account number : 9154454366, bank : Opay, Name: Marion Elechor");
    }
  }

  requestAnimationFrame(animate);
}

drawWheel();

document.getElementById("spin").addEventListener("click", rotateWheel);

