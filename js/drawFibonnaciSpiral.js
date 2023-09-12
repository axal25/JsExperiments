let width = 5000;
let height = 5000;
let radius = 20;
let step = radius + 5;
let midX = width / 2;
let midY = height / 2;

function setup() {
  createCanvas(width, height);
}

let was_drawn_already = false;
function draw() {
  fill(255, 0, 0);
  stroke(0, 255, 0);

  circle(0, 0, radius); // left, top
  circle(0, height, radius); // left, bottom
  circle(width, 0, radius); // right, top
  circle(width, height, radius); // right, bottom

  if (!was_drawn_already) {
    drawLoop({
      x: midX,
      y: midY,
      number: 1,
      direction: "right",
      spaces: { used: 1, left: 1, max: 2, next_max: 2 },
    });
  }
  was_drawn_already = true;
}

function drawLoop(point) {
  while (isPointValid(point)) {
    drawPoint(point);
    let next = findNext(point);
    if (isPointValid(next)) {
      drawDirection(point, next);
    }
    point = next;
  }
}

function isPointValid(point) {
  return (
    point.x > 0 &&
    point.x < width - radius &&
    point.y > 0 &&
    point.y < height - radius
  );
}

function drawPoint(point) {
  if (isFibonacci(point.number)) {
    stroke(0);
    fill(0, 255, 0);
  } else {
    stroke(0);
    fill(100, 100, 100);
  }
  circle(point.x, point.y, radius);

  textSize(8);
  fill(0, 0, 255);
  text(point.number, point.x - radius / 4, point.y + radius / 7);
}

// fibsCache.length - 1 <=> fibonacci biggest key
// fibsCache[length - 1] <=> fibonacci biggest value
let fibsCache = [0, 1];
function isFibonacci(possible_fib_value) {
  appendFibsCacheUntilMaxValueLEThan(possible_fib_value);
  if (fibsCache.includes(possible_fib_value)) {
    return true;
  }
  return false;
}

// append fibsCache until it contains larger or equal fibonacci value than possible_fib_value
function appendFibsCacheUntilMaxValueLEThan(possible_fib_value) {
  while (fibsCache[fibsCache.length - 1] < possible_fib_value) {
    getFibonacci(fibsCache.length);
  }
}

function getFibonacci(fib_key) {
  if (fibsCache.length - 1 >= fib_key) {
    return fibsCache[fib_key];
  }
  let n_1 = getFibonacci(fib_key - 1);
  let n_2 = getFibonacci(fib_key - 2);
  let n = n_1 + n_2;
  fibsCache.push(n);
  return n;
}

function drawDirection(prev, next) {
  stroke(255);
  fill(255);
  line(prev.x, prev.y, next.x, next.y);
}

function findNext(point) {
  let next = { spaces: {} };

  next.number = point.number + 1;

  if (point.spaces.left > 1) {
    next.direction = point.direction;
  } else {
    next.direction = findNextDirection(point.direction);
  }

  next.x =
    point.direction === "right"
      ? point.x + step
      : point.direction === "left"
      ? point.x - step
      : point.x;
  next.y =
    point.direction === "up"
      ? point.y - step
      : point.direction === "down"
      ? point.y + step
      : point.y;

  if (point.spaces.left > 1) {
    next.spaces.used = point.spaces.used + 1;
    next.spaces.max = point.spaces.max;
    next.spaces.next_max = point.spaces.next_max;
    next.spaces.left = next.spaces.max - next.spaces.used;
  } else {
    next.spaces.used = 1;
    next.spaces.max = point.spaces.next_max;
    next.spaces.next_max =
      point.spaces.max === point.spaces.next_max
        ? point.spaces.next_max + 1
        : point.spaces.next_max;
    next.spaces.left = next.spaces.max - next.spaces.used;
  }

  return next;
}

function findNextDirection(direction) {
  switch (direction) {
    case "right":
      return "up";
    case "up":
      return "left";
    case "left":
      return "down";
    case "down":
      return "right";
    default:
      return "UNDEFINED";
  }
}
