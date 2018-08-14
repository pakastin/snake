const { requestAnimationFrame } = window;

const gamearea = document.createElement('gamearea');
const points = document.createElement('points');

document.body.appendChild(gamearea);
document.body.appendChild(points);

let speed = 200;

const snake = {
  dir: 1,
  body: [
    {
      x: 4,
      y: 5,
      dom: createEl('i', (el) => { el.className = 'snakepart far fa-smile'; })
    }
  ]
};

const apple = {
  x: 4,
  y: 4,
  dom: createEl('i', (el) => { el.className = 'apple fas fa-apple-alt'; })
};

gamearea.appendChild(snake.body[0].dom);
gamearea.appendChild(apple.dom);

const width = 9;
const height = 9;

gamearea.style.width = width + 'rem';
gamearea.style.height = height + 'rem';

const restart = () => {
  for (let i = 2; i < snake.body.length; i++) {
    gamearea.removeChild(snake.body[i].dom);
  }
  speed = 200;
  snake.body.length = 2;
  snake.body[0].x = 4;
  snake.body[0].y = 4;
  snake.body[1].x = 4;
  snake.body[1].y = 5;
  snake.dir = 1;
  points.textContent = 0;
  while (snake.body.filter(part => part.x === apple.x && part.y === apple.y).length) {
    randomize(apple);
  }
};

window.addEventListener('keydown', (e) => {
  const dir = e.which - 37;

  if (snake.dir % 2 !== dir % 2) {
    snake.dir = dir;
  }
});

let onTick;

const tick = () => {
  for (let i = snake.body.length - 1; i; i--) {
    snake.body[i].x = snake.body[i - 1].x;
    snake.body[i].y = snake.body[i - 1].y;
    if (i > 1) {
      snake.body[i].dom.className = snake.body[i - 1].dom.className;
    } else {
      snake.body[1].dom.className = 'snakepart body far fa-circle';
    }
  }

  if (snake.dir === 0) {
    snake.body[0].x--;
  } else if (snake.dir === 1) {
    snake.body[0].y--;
  } else if (snake.dir === 2) {
    snake.body[0].x++;
  } else {
    snake.body[0].y++;
  }

  if (onTick) {
    onTick();
    onTick = null;
  }

  if (snake.body[0].x < 0) {
    snake.body[0].x = width - 1;
  } else if (snake.body[0].x > width - 1) {
    snake.body[0].x = 0;
  }
  if (snake.body[0].y < 0) {
    snake.body[0].y = height - 1;
  } else if (snake.body[0].y > height - 1) {
    snake.body[0].y = 0;
  }

  for (let i = 1; i < snake.body.length; i++) {
    if ((snake.body[i].x === snake.body[0].x) && (snake.body[i].y === snake.body[0].y)) {
      snake.body[0].dom.className = 'snakepart far fa-dizzy';
      speed = 3000;
      onTick = () => {
        restart();
        snake.body[0].dom.className = 'snakepart far fa-smile';
      };
    }
  }

  if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
    points.textContent++;
    if (snake.body.length < width * height) {
      while (snake.body.filter(part => part.x === apple.x && part.y === apple.y).length) {
        randomize(apple);
      }
    }
    const newPart = {
      ...snake.body[snake.body.length - 1],
      dom: createEl('i', (el) => { el.className = 'snakepart body far fa-circle'; })
    };
    snake.body[0].dom.className = 'snakepart far fa-laugh-wink';
    onTick = () => {
      snake.body.push(newPart);
      gamearea.insertBefore(newPart.dom, snake.body[0].dom);
      snake.body[0].dom.className = 'snakepart far fa-smile';
      snake.body[1].dom.className = 'snakepart body ate far fa-circle';
    };
  }

  setTimeout(tick, speed);
};

tick();

const render = () => {
  snake.body.forEach((part) => {
    part.dom.style.left = `${part.x}rem`;
    part.dom.style.top = `${part.y}rem`;
  });
  apple.dom.style.left = `${apple.x}rem`;
  apple.dom.style.top = `${apple.y}rem`;
  requestAnimationFrame(render);
};

requestAnimationFrame(render);

function createEl (tagName, handler) {
  const el = document.createElement(tagName);

  handler(el);

  return el;
}

function randomize (apple) {
  apple.x = Math.random() * width | 0;
  apple.y = Math.random() * height | 0;
}

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign (target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}
