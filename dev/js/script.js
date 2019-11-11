'use strict';

const header               = document.querySelector('.header'),
			modalSearch          = document.querySelector('.modal-search'),
			footerEmail          = document.querySelector('.footer__form-input'),
			footerButton         = document.querySelector('.footer__form-button'),
			linkCart             = document.querySelector('.link-cart'),
			popupCart            = document.querySelector('.modal-right--cart'),
			linkLogin            = document.querySelectorAll('.link-login'),
			popupBody            = document.querySelector('body'),
			popupWrapper         = document.querySelector('.modal-wrapper'),
			popupLogin           = document.querySelector('.modal'),
			linkRecovery         = popupLogin.querySelector('.link-recovery'),
			popupRecovery        = document.querySelector('.modal--recovery'),
			linkFavorites        = document.querySelector('.link-favorites'),
			popupFavorites       = document.querySelector('.modal-right--favorites'),
			buttonRightClose     = document.querySelectorAll('.modal-right__close'),
			buttonSearch         = document.querySelector('.user-menu__item--search'),
			linkSearch           = buttonSearch.querySelector('.link-search'),
			popupSearch          = document.querySelector('.modal-search'),
			searchText           = popupSearch.querySelector('.modal-search__input'),
			searchButton         = popupSearch.querySelector('.modal-search__button'),
			linkHer              = document.querySelector('.link-her'),
			linkHim              = document.querySelector('.link-him'),
			menuHer              = document.querySelector('.main-nav__submenu-wrapper--her'),
			menuHim              = document.querySelector('.main-nav__submenu-wrapper--him'),
			buttonsMenu          = document.querySelector('.main-nav__buttons'),
			buttonMenu           = document.querySelector('.main-nav__button-menu'),
			buttonMenuClose      = document.querySelector('.main-nav__button-close'),
			menuShow             = document.querySelector('.main-nav'),
			buttonSearchClose    = document.querySelector('.user-menu__item--search-close');

popupBody.classList.remove('no-js');
footerButton.setAttribute('disabled', 'disabled');
searchButton.setAttribute('disabled', 'disabled');

function checkFooterForm() {
	footerButton.disabled = footerEmail.value ? false : "disabled";
}

function checkSearchForm() {
	searchButton.disabled = searchText.value ? false : "disabled";
}

linkHer.addEventListener('click', function(event) {
	event.preventDefault();
	if(menuHim.classList.contains('main-nav__submenu--show')) {
		menuHim.classList.remove('main-nav__submenu--show');
		menuHer.classList.add('main-nav__submenu--show');
	} else if(menuHer.classList.contains('main-nav__submenu--show')) {
		menuHer.classList.remove('main-nav__submenu--show')
	} else {
		menuHer.classList.add('main-nav__submenu--show');
	}
});

linkHim.addEventListener('click', function(event) {
	event.preventDefault();
	if(menuHer.classList.contains('main-nav__submenu--show')) {
		menuHer.classList.remove('main-nav__submenu--show');
		menuHim.classList.add('main-nav__submenu--show');
	} else if(menuHim.classList.contains('main-nav__submenu--show')) {
		menuHim.classList.remove('main-nav__submenu--show')
	} else {
		menuHim.classList.add('main-nav__submenu--show');
	}
});

function headerSticky() {
	let changeYMyself = window.pageYOffset;
	if(window.pageYOffset < 250 && header.classList.contains('trigger')) {
		header.classList.add('header--close');
		setTimeout(function(){header.classList.remove('header--close')}, 690);
		setTimeout(function(){header.classList.remove('trigger')}, 300);
	}
	if(window.pageYOffset >= 250) {
			header.classList.add('header--show');
			header.classList.add('trigger');
		} else {
			header.classList.remove('header--show');
	}
	if (window.pageYOffset < 133) {
		header.classList.remove('header--close');
	}
}

window.addEventListener('scroll', headerSticky);

let lastFocus;

function modalShow() {
	lastFocus = document.activeElement;
}

function modalClose() {
	lastFocus.focus();
}


buttonMenu.addEventListener('click', function() {
	buttonsMenu.classList.toggle('main-nav__toggle');
	menuShow.classList.add('main-nav--show');
});

buttonMenuClose.addEventListener('click', function() {
	buttonsMenu.classList.toggle('main-nav__toggle');
	menuShow.classList.remove('main-nav--show');
});

for (let i = 0; i < linkLogin.length; i++) {
	let link = linkLogin[i];
	link.addEventListener('click', function (event) {
		event.preventDefault();
		modalShow();
		if (popupRecovery.classList.contains('modal--show')) {
				popupRecovery.classList.remove('modal--show');
				popupWrapper.classList.remove('modal--show');
		}
		if (popupBody.classList.contains('modal--open')) {
				popupBody.classList.remove('modal--open');
		}
	popupBody.classList.add('modal--open');
	popupWrapper.classList.add('modal--show');
	popupLogin.classList.add('modal--show');
	popupLogin.setAttribute('tabindex', '0');
	focusRestrict();
	});
}

function focusRestrict(event) {
	if (popupLogin.classList.contains('modal--show')) {
		document.addEventListener('focus', function(event) {
			if (popupLogin.classList.contains('modal--show') && !popupLogin.contains(event.target)) {
				event.stopPropagation();
				popupLogin.focus();
			}
		}, true);
	}
	if (popupRecovery.classList.contains('modal--show')) {
		document.addEventListener('focus', function(event) {
			if (popupRecovery.classList.contains('modal--show') && !popupRecovery.contains(event.target)) {
				event.stopPropagation();
				popupRecovery.focus();
			}
		}, true);
	}
	if (popupSearch.classList.contains('modal--show')) {
		document.addEventListener('focus', function(event) {
			if (popupSearch.classList.contains('modal--show') && !popupSearch.contains(event.target)) {
				event.stopPropagation();
				popupSearch.focus();
			}
		}, true);
	}
}

linkRecovery.addEventListener('click', function(event) {
	event.preventDefault();
	modalShow();
	if (popupLogin.classList.contains('modal--show')) {
			popupLogin.classList.remove('modal--show');
			popupWrapper.classList.remove('modal--show');
	}
	if (popupBody.classList.contains('modal--open')) {
			popupBody.classList.remove('modal--open');
	}
	popupBody.classList.add('modal--open');
	popupWrapper.classList.add('modal--show');
	popupRecovery.classList.add('modal--show');
	popupRecovery.setAttribute('tabindex', '0');
	focusRestrict();
});

linkSearch.addEventListener('click', function(event) {
	event.preventDefault();
	modalShow();
	popupSearch.classList.add('modal--show');
	header.classList.add('header--top');
	buttonSearch.classList.add('user-menu--toggle-close');
	setTimeout(function(){
		buttonSearch.classList.remove('user-menu--toggle-close');
		buttonSearch.classList.remove('user-menu--toggle');
		buttonSearchClose.classList.add('user-menu--toggle');
	}, 995);
	popupSearch.setAttribute('tabindex', '0');
	focusRestrict();
});

buttonSearchClose.addEventListener('click', function(event) {
	popupSearch.classList.add('modal--close');
	popupSearch.classList.remove('modal--show');
	buttonSearchClose.classList.add('user-menu--toggle-close');
	setTimeout(function(){buttonSearchClose.classList.remove('user-menu--toggle-close');
		buttonSearchClose.classList.remove('user-menu--toggle');
		buttonSearch.classList.add('user-menu--toggle');
	}, 995);
	setTimeout(function(){popupSearch.classList.remove('modal--close');
		header.classList.remove('header--top');
	}, 995);
	modalClose();
});

popupWrapper.addEventListener("click", function() {
	if (popupLogin.classList.contains('modal--show')) {
			popupWrapper.classList.remove('modal--show');
			popupLogin.classList.remove('modal--show');
			popupBody.classList.remove('modal--open');
			modalClose();
	}
	if (popupRecovery.classList.contains('modal--show')) {
			popupWrapper.classList.remove('modal--show');
			popupRecovery.classList.remove('modal--show');
			popupBody.classList.remove('modal--open');
			modalClose();
	}
});

linkFavorites.addEventListener('click', function(event) {
	event.preventDefault();
	modalShow();
	popupFavorites.classList.add('modal--show');
	popupFavorites.setAttribute('tabindex', '0');
	popupFavorites.focus();
});

linkCart.addEventListener('click', function(event) {
	event.preventDefault();
	modalShow();
	popupCart.classList.add('modal--show');
	popupCart.setAttribute('tabindex', '0');
	popupCart.focus();
});

for (let i = 0; i < buttonRightClose.length; i++) {
	let buttonClose = buttonRightClose[i];
	buttonClose.addEventListener('click', function (event) {
		event.preventDefault();
		if (popupFavorites.classList.contains('modal--show')) {
				popupFavorites.classList.remove('modal--show');
				popupFavorites.classList.add('modal--close');
				setTimeout(function(){popupFavorites.classList.add('modal--close')}, 700);
		}
		if (popupCart.classList.contains('modal--show')) {
				popupCart.classList.remove('modal--show');
				popupCart.classList.add('modal--close');
				setTimeout(function(){popupCart.classList.add('modal--close')}, 700);
		}
		modalClose();
	});
}

window.addEventListener('keydown', function(event) {
	if (event.keyCode === 27) {
		if (popupLogin.classList.contains('modal--show')) {
				popupWrapper.classList.remove('modal--show');
				popupLogin.classList.remove('modal--show');
				popupBody.classList.remove('modal--open');
				modalClose();
		}
		if (popupRecovery.classList.contains('modal--show')) {
				popupWrapper.classList.remove('modal--show');
				popupRecovery.classList.remove('modal--show');
				popupBody.classList.remove('modal--open');
				modalClose();
		}
		if (popupFavorites.classList.contains('modal--show')) {
				popupFavorites.classList.remove('modal--show');
				popupFavorites.classList.add('modal--close');
				setTimeout(function(){popupFavorites.classList.add('modal--close')}, 700);
				modalClose();
		}
		if (popupCart.classList.contains('modal--show')) {
				popupCart.classList.remove('modal--show');
				popupCart.classList.add('modal--close');
				setTimeout(function(){popupCart.classList.add('modal--close')}, 700);
				modalClose();
		}
		if (popupSearch.classList.contains('modal--show')) {
				popupSearch.classList.add('modal--close');
				popupSearch.classList.remove('modal--show');
				buttonSearchClose.classList.add('user-menu--toggle-close');
				setTimeout(function(){buttonSearchClose.classList.remove('user-menu--toggle-close');
					buttonSearchClose.classList.remove('user-menu--toggle');
					buttonSearch.classList.add('user-menu--toggle');
				}, 995);
				setTimeout(function(){popupSearch.classList.remove('modal--close');
					header.classList.remove('header--top');
				}, 995);
				modalClose();
		}
	}
});

window.onload = function () {
  document.querySelector('.good_info__btns').addEventListener('click', funcTabs);

    function funcTabs(event) {
    console.log(event);
    if (event.target.className == 'good_info__btn'){
      var dataTab = event.target.getAttribute('data-tab');
      var tabH = document.getElementsByClassName('good_info__btn');
      for(var i = 0; i < tabH.length; i++){
        tabH[i].classList.remove('active');
      }
      event.target.classList.add('active');

      var tabBody = document.getElementsByClassName('tab-block');

      function fadeIn(tabBody) {
        var opacity = 0.01;
        tabBody.style.opacity = 0.01;
        tabBody.style.display = "block";
        var timer = setInterval(function() {
          if(opacity >= 1) {
            clearInterval(timer);
          }
          tabBody.style.opacity = opacity;
            opacity += opacity * 0.1;
        }, 10);
      }

      for (var i = 0; i < tabBody.length; i++){
        if (dataTab == i) {
          fadeIn(tabBody[i]);
        }else {
          tabBody[i].style.display = 'none';
        }
      }
    }
  }
}