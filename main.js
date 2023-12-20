const calcBestPace = function (e) {
  e.preventDefault();

  const stats = {
    distance: Number(document.getElementById("distance").value),
    hours: Number(document.getElementById("hours").value),
    minutes: Number(document.getElementById("minutes").value),
    seconds: Number(document.getElementById("seconds").value),
    factor: function () {
      switch (this.distance) {
        case 3.1:
          return 2.09;

        case 4:
          return 1.6;

        case 6.2:
          return 1;

        case 9.3:
          return 0.65;

        case 10:
          return 0.6;

        case 13.1:
          return 0.45;

        case 26.2:
          return 0.22;
      }
    },
  };

  stats.totalTime = stats.hours * 3600 + stats.minutes * 60 + stats.seconds;
  stats.best10KTime = stats.factor() * stats.totalTime;
  stats.best10KTimeHours = Math.floor(stats.bestTime / 3600);
  stats.best10KTimeMinutes = Math.floor((stats.bestTime % 3600) / 60);
  stats.best10KTimeSeconds = (stats.bestTime % 3600) % 60;

  stats.bestPace = Math.round(stats.best10KTime / 6.21);
  stats.bestPaceHours = Math.floor(stats.bestPace / 3600);
  stats.bestPaceMinutes = Math.floor((stats.bestPace % 3600) / 60);
  stats.bestPaceSeconds = Math.round((stats.bestPace % 3600) % 60);

  if (!stats.hours && !stats.minutes) {
    alert("Hours or minutes field must be filled.");
    return;
  }

  function corral(bestPace) {
    if (bestPace >= 737) {
      stats.corral = "L";
    } else if (60 * 11 + 3 <= bestPace && bestPace <= 60 * 12 + 16) {
      stats.corral = "K";
    } else if (60 * 10 + 17 <= bestPace && bestPace <= 60 * 11 + 2) {
      stats.corral = "J";
    } else if (60 * 9 + 48 <= bestPace && bestPace <= 60 * 10 + 16) {
      stats.corral = "I";
    } else if (60 * 9 + 18 <= bestPace && bestPace <= 60 * 9 + 47) {
      stats.corral = "H";
    } else if (60 * 8 + 55 <= bestPace && bestPace <= 60 * 9 + 17) {
      stats.corral = "G";
    } else if (60 * 8 + 30 <= bestPace && bestPace <= 60 * 8 + 54) {
      stats.corral = "F";
    } else if (60 * 8 + 5 <= bestPace && bestPace <= 60 * 8 + 29) {
      stats.corral = "E";
    } else if (60 * 7 + 43 <= bestPace && bestPace <= 60 * 8 + 4) {
      stats.corral = "D";
    } else if (60 * 7 + 13 <= bestPace && bestPace <= 60 * 7 + 42) {
      stats.corral = "C";
    } else if (60 * 6 + 30 <= bestPace && bestPace <= 60 * 7 + 12) {
      stats.corral = "B";
    } else if (0 <= bestPace && bestPace <= 60 * 6 + 29) {
      stats.corral = "A";
    }
  }

  corral(stats.bestPace);
  document.getElementById(
    "bestPace"
  ).innerHTML = `<p>Your best pace is <strong>${
    stats.bestPaceHours
  } hour(s) </strong>, <strong>${
    stats.bestPaceMinutes
  } minute(s) </strong>, and <strong> ${
    stats.bestPaceSeconds
  } second(s) </strong>.</p>  
    <p><strong> Best Pace (MM:SS): ${stats.bestPaceMinutes}:${String(
    stats.bestPaceSeconds
  ).padStart(2, "0")} per mile</strong></p>
  <p><strong>Corral: ${stats.corral} </strong></p>`;
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", calcBestPace);
});
