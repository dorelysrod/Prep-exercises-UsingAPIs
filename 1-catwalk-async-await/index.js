'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

const img = document.querySelector('img');
const ORIGINAL_CAT_URL = img.src;

function walk(img, startPos, stopPos, centerPos) {
  return new Promise(resolve => {
    let position = startPos;
    const interval = setInterval(() => {
      position += STEP_SIZE_PX;
      img.style.transform = `translateX(${position}px)`;

      if (position >= centerPos && position < centerPos + STEP_SIZE_PX) {
        clearInterval(interval);
        resolve('center');
      }

      if (position >= stopPos) {
        clearInterval(interval);
        resolve('stop');
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise(resolve => {
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = ORIGINAL_CAT_URL;
      resolve();
    }, DANCE_TIME_MS);
  });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  while (true) {
    const result = await walk(img, startPos, stopPos, centerPos);

    if (result === 'center') {
      await dance(img);
      await walk(img, centerPos, stopPos);
    }

    // Reset position back to start
    img.style.transform = `translateX(${startPos}px)`;
  }
}

window.addEventListener('load', catWalk);
