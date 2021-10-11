const exitIntentPopup = document.querySelector('.close');

const expireDays = 1;

const mouseOutEvent = e => {
  const shouldShowExitIntent =
    !e.toElement &&
    !e.relatedTarget &&
    e.clientY < 10;

  if (shouldShowExitIntent && Cookies.get('isVisible') === undefined) {
    document.removeEventListener('mouseout', mouseOutEvent);
    document.querySelector('.exit-intent-popup').classList.add('visible');
    Cookies.set('isVisible', 'true', { expires: expireDays });
  }
}

setTimeout(() => document.addEventListener('mouseout', mouseOutEvent), 0);

// closing the popup
const exit = e => {
  const shouldExit =
    [...e.target.classList].includes('exit-intent-popup') || // user clicks on mask
    e.target.className === 'close' || // user clicks on the close icon
    e.keycode === '27'; // user hit the escape button

  if (shouldExit) {
    document.querySelector('.exit-intent-popup').classList.remove('visible');
  }
};

exitIntentPopup.addEventListener('click', exit);
document.addEventListener('keydown', exit);

// MOBILE DEVICES
const mobileDevice__media = window.matchMedia('(max-width: 600px)');

if (mobileDevice__media.matches) {  
  const contentHeight = document.body.clientHeight - window.innerHeight;  
  const halfOfContent__height = Math.floor(contentHeight / 2);

  var lastScrollTop = 0;

  window.addEventListener("scroll", function () { 
    var st = window.pageYOffset || document.documentElement.scrollTop; 
    if (st > lastScrollTop) {
      // console.log('donwscroll');
    } else {
      if (lastScrollTop < halfOfContent__height){
        if (Cookies.get('isVisible') === undefined){
          document.querySelector('.exit-intent-popup').classList.add('visible');
          Cookies.set('isVisible', 'true', { expires: expireDays });
        }        
      }
    }
    lastScrollTop = st <= 0 ? 0 : st; 
  }, false);  
}

