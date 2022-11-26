// interpolation utilities
const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));


const mediaQuery900 = window.matchMedia('(max-height: 900px)');
const mediaQuery850 = window.matchMedia('(max-height: 850px)')
const mediaQuery800 = window.matchMedia('(max-height: 800px)')
const mediaQuery775 = window.matchMedia('(max-height: 775px)')
const mediaQueryMin = window.matchMedia('(min-height: 851px)')

const mediaTablet = window.matchMedia('(max-width: 1000px)');

const mediaMobile = window.matchMedia('(max-width: 500px)');


var skrl = null;
if (!mediaTablet.matches && !mediaMobile.matches) {
  skrl = skrollr.init()
}


const swapTitle = ['200', '300', '5000', '> 1,5 млн']
const swapSubtitle = ['авиаперевозчиков', 'ж/д перевозчиков', 'автобусных перевозчиков', 'билетов в месяц продается через нашу систему']

const fs1CircleTitle = document.querySelector('.fs1__circle-title')
const fs1CircleSubtitle = document.querySelector('.fs1__circle-subtitle')
const fs1CircleTitleMobile = document.querySelector('.fs1__circle-title-mobile')
const fs1CircleSubtitleMobile = document.querySelector('.fs1__circle-subtitle-mobile')

const animateMobile = document.querySelector('#animate-2-mobile')

const CircleInterval = setInterval(() => {
  Swap()
}, 1500)

const CircleIntervalMobile = setInterval(() => {
  SwapMobile()
}, 1500)



var e = 0
var f = 0
function SwapMobile() {
  e = e % swapTitle.length
  f = f % swapSubtitle.length

  fs1CircleTitleMobile.innerHTML  = swapTitle[e++];

  fs1CircleSubtitleMobile.innerHTML  = swapSubtitle[f++];
}

var i = 0
var c = 0
function Swap() {
  i = i % swapTitle.length
  c = c % swapSubtitle.length

  fs1CircleTitle.innerHTML  = swapTitle[i++];

  fs1CircleSubtitle.innerHTML  = swapSubtitle[c++];
}


jQuery(document).ready(function($){
  $("#my-accordion").accordionjs({
    closeAble: true,
  });
});

jQuery(document).ready(function($){
  $("#my-accordion-2").accordionjs({
    closeAble: true,    
  });
});

$('.burger').click(() => {
  $('.menu-items').toggleClass('menu-items-active')
  $('.header__group').toggleClass('activ-menu')
})



const slides = document.getElementById('slides');


if(mediaQueryMin.matches) {
  $('.header-scroll').on('click', function() {
    console.log('click');
    $("html, body").animate({
      scrollTop: window.scrollBy(0, 12500)
    }, {
      duration: 3700,   // по умолчанию «400»
      easing: "linear" // по умолчанию «swing»
    });
  });
}


if(mediaQuery850.matches) {
  slides.setAttribute('data-150p', 'transform:translate(0%, -70%);');
  slides.setAttribute('data-650p', 'transform:translate(-150%, -70%);');
  slides.setAttribute('data-1050p', 'transform:translate(-150%,-155%);');
  slides.setAttribute('data-1250p', 'transform:translate(-200%,-155%);');
  slides.setAttribute('data-1450p', 'transform:translate(-200%,-270%);');
  $('.header-scroll').on('click', function() {
    console.log('click');
    $("html, body").animate({
      scrollTop: window.scrollBy(0, 12500)
    }, {
      duration: 3700,   // по умолчанию «400»
      easing: "linear" // по умолчанию «swing»
    });
    
  });
}
if(mediaQuery800.matches) {
  slides.setAttribute('data-150p', 'transform:translate(0%, -80%);');
  slides.setAttribute('data-650p', 'transform:translate(-150%, -80%);');
  slides.setAttribute('data-1050p', 'transform:translate(-150%,-170%);');
  slides.setAttribute('data-1250p', 'transform:translate(-200%,-170%);');
  slides.setAttribute('data-1450p', 'transform:translate(-200%,-282%);');
}
if(mediaQuery775.matches) {
  slides.setAttribute('data-150p', 'transform:translate(0%, -85%);');
  slides.setAttribute('data-650p', 'transform:translate(-150%, -85%);');
  slides.setAttribute('data-1050p', 'transform:translate(-150%,-175%);');
  slides.setAttribute('data-1250p', 'transform:translate(-200%,-175%);');
  slides.setAttribute('data-1450p', 'transform:translate(-200%,-300%);');
}


function setCursorPosition(pos, e) {
  e.focus();
  if (e.setSelectionRange) e.setSelectionRange(pos, pos);
  else if (e.createTextRange) {
    var range = e.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select()
  }
}

function mask(e) {
  //console.log('mask',e);
  var matrix = this.placeholder,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = this.value.replace(/\D/g, "");

  def.length >= val.length && (val = def);

  matrix = matrix.replace(/[_\d]/g, function(a) {
    return val.charAt(i++) || "_"
  });

  this.value = matrix;
  i = matrix.lastIndexOf(val.substr(-1));
  i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
  setCursorPosition(i, this)
}

window.addEventListener("DOMContentLoaded", function() {
  var input = document.querySelector("#online_phone");
  input.addEventListener("input", mask, false);
  input.focus();
  setCursorPosition(3, input);
});



// SVG ANIMATINOS

const SVGS = {
  STARTOFFSET: 1.1, // `magnetic` effect start
  ENDOFFSET: 1.1, // `magnetic` effect end
  DEFAULTXOFFSET: -13.5,
  DEFAULTYOFFSET: -13.5,

  /*
    this is basically a map of IDs of SVGs(keys) and their configuration(values).

    configuration:
      for desktop and tablet:
        from: px from top of the page where to start animation (range start)
        to: px from top of the page where to end animation (range end)
        endPercent (only for paths): this is a `dead` point of path, where to stop the obj
        xOffset (only for paths): some objects(moving things) need an X offset from the path
        yOffset (only for paths): the same as xOffset but for Y
      for mobile:
        duration: just an animation duration in ms, from which delay for the setTimeout is calculated (between frames).
        divisions (not used): how many points between frames, higher is smoother animation
  */

  desktop: {
    svg1: {
      from: 500,
      to: 2000
    },
    svg2: {
      from: 0,
      to: 2000,
      endPercent: 96.85
    },
    svg3: {
      from: 2000,
      to: 5000,
      endPercent: 99.3
    },
    svg4: {
      from: 6100,
      to: 12000,
      endPercent: 99.6,
      xOffset: 0,
      yOffset: 10,
    },
    svg5: {
      from: 12000,
      to: 15800,
      endPercent: 99.6,
      xOffset: -17,
      yOffset: -10
    }
  },
  tablet: {
    svg1t: {
      from: 120,
      to: 1357,
      endPercent: 100,
      xOffset: -10
    },
    svg2t: {
      from: 680,
      to: 1475,
    },
    svg3t: {
      from: 1375,
      to: 3000,
      endPercent: 100,
      xOffset: -10,
      yOffset: -20
    },
    svg4t: {
      from: 3000,
      to: 5000,
      endPercent: 100,
      xOffset: 7,
      yOffset: -2
    },
    svg5t: {
      from: 5300,
      to: 6350,
      endPercent: 100
    }
  },

  // mobile is not used in a `scroll` event animation, rather in IntersectionObserver later
  mobile: {
    svg1m: {
      duration: 3000,
      divisions: 100
    },
    svg2m: {
      duration: 7000,
      divisions: 300,
      endPercent: 100,
      xOffset: -5,
      yOffset: -10
    },
    svg0m: {
      duration: 2000,
      divisions: 100,
      endPercent: 100,
      xOffset: -9,
      yOffset: -15
    }
  }
}

if (mediaQuery900.matches) {
  // start offset and end offset changes for `magnetic` effect,
  // smaller than the desktop(1.1) because it feels slower to scroll on smaller screens
  SVGS.STARTOFFSET = 0.8;
  SVGS.ENDOFFSET = 0.8;

  // some changes on `to` and `from` animation ranges when screen <= 900 height
  let sd = SVGS.desktop;
  sd.svg4.from = 5500;
  sd.svg4.to = 9400;
  sd.svg5.from = 11355;
  sd.svg5.to = 13000;
}
if (mediaQuery775.matches) {
  // some changes on `to` and `from` animation ranges when screen <= 775 height
  let sd = SVGS.desktop;
  sd.svg3.to = 3850;
  sd.svg4.from = 4000;
  sd.svg4.to = 7800;
  sd.svg5.from = 9000;
  sd.svg5.to = 11000;
}


for (let [breakpoint, svgs] of Object.entries(SVGS)) {
  // populating configs of SVGs with `_path`, `_circle`, `_tip`
  for (let [id, conf] of Object.entries(svgs)) {
    let path = document.querySelector(`#${id} #path`);
    let circle = document.querySelector(`#${id} #circle`);

    if (path !== null) {
      conf._path = path;
      conf._img = document.querySelector(`#${id} #img`);
    } else if (circle !== null) {
      conf._circle = circle;
      conf._tip = document.querySelector(`#${id} #tip`);
    } else {
      console.error(`Neither '#path' nor '#circle' were found in '#${id}' svg. Skipping.`);
    }
  }

  if (breakpoint === 'mobile') {
    for (let [id, conf] of Object.entries(svgs)) {
      // just dividing duration by divisions to get the delay
      conf._delay = (conf.duration) / conf.divisions
    }
  }
}


function updateSvg({ obj, scroll=null, prcnt=null }) {
  if (scroll === null && prcnt === null) {
    console.error('updateSvg function was called without `scroll` or `prcnt` arguments...');
    return
  }

  if (typeof obj._circle !== 'undefined') {

    // circle update
    let pathDashOffset = prcnt !== null
      ? range(0, 100, 316, 0, prcnt)
      : range(obj.from, obj.to, 316, 0, scroll);
    obj._circle.style.strokeDashoffset = pathDashOffset;

    let tipDegree = prcnt !== null
      ? range(0, 100, 180, -180, prcnt)
      : range(obj.from, obj.to, 180, -180, scroll);
    obj._tip.setAttribute('cx', 50 * Math.sin(Math.PI * 2 * tipDegree / 360) + 55);
    obj._tip.setAttribute('cy', 50 * Math.cos(Math.PI * 2 * tipDegree / 360) + 55);

  } else if (typeof obj._path !== 'undefined') {

    // path update
    let percent = prcnt !== null
      ? range(0, 100, 0, obj.endPercent, prcnt) // this is ugly, should be refactored, range from 0, 100 to 0, 99.6 is just stupid
      : range(obj.from, obj.to, 0, obj.endPercent, scroll);

    // this is for `magnetic` effect on the start and end of paths
    if (percent <= SVGS.STARTOFFSET) percent = 0;  // if the current position is under the STARTOFFSET, set the position to 0;
    if (percent >= obj.endPercent - SVGS.ENDOFFSET) percent = obj.endPercent;  // if the current position is bigger than ENDOFFSET, set the position to END;

    let pathLength = obj._path.getTotalLength();
    let point = obj._path.getPointAtLength((percent * pathLength) / 100);
    point.x = point.x + (typeof obj.xOffset !== 'undefined' ? obj.xOffset : SVGS.DEFAULTXOFFSET);
    point.y = point.y + (typeof obj.yOffset !== 'undefined' ? obj.yOffset : SVGS.DEFAULTYOFFSET);
    obj._img.setAttribute('x', point.x);
    obj._img.setAttribute('y', point.y);

  }
}

window.addEventListener('scroll', () => {
  let current = window.scrollY || window.pageYOffset;

  // console.log(current);

  if (mediaMobile.matches) {
    // do nothing, else tablet media will match and will do unnecessary calculations
    // mobile animations are handled in the next code block
  } else if (mediaTablet.matches) {
    // tablet
    Object.values(SVGS.tablet).forEach(svg => {
      if (current >= svg.from && current <= svg.to) {
        updateSvg({obj: svg, scroll: current});
      }
    })
  } else {
    // desktop
    Object.values(SVGS.desktop).forEach(svg => {
      if (current >= svg.from && current <= svg.to) {
        updateSvg({obj: svg, scroll: current});
      }
    })
  }
})


// using IntersectionObserver for mobile animations,
// because scroll on iOS is fucked up
// `animateCircle` and `animatePath` is async for non-blocking animations

async function animateSvg(obj) {
  let progress = 0;

  function frame() {
    updateSvg({obj: obj, prcnt: (progress / obj.divisions) * 100});

    if (progress !== obj.divisions) {
      progress += 1;
      setTimeout(() => requestAnimationFrame(frame), obj._delay);
    }
  }

  requestAnimationFrame(frame)
}

if (mediaMobile.matches) {
  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSvg(SVGS.mobile[entry.target.id]);
      }
    })
  })

  Object.keys(SVGS.mobile).forEach(id => {
    observer.observe(document.getElementById(id));
  })

  // updateSvg({ obj: SVGS.mobile.svg0m, prcnt: 0 });
}