'use strict';

const header               = document.querySelector('.header'),
			modalSearch          = document.querySelector('.modal-search'),
			footerEmail          = document.querySelector('.footer__form-input'),
			footerButton         = document.querySelector('.footer__form-button'),
			linkLogin            = document.querySelectorAll('.link-login'),
			popupBody            = document.querySelector('body'),
			popupWrapper         = document.querySelector('.modal-wrapper'),
			popupLogin           = document.querySelector('.modal--login'),
			linkRecovery         = popupLogin.querySelector('.link-recovery'),
			popupRecovery        = document.querySelector('.modal--recovery'),
			linkFavorites        = document.querySelector('.link-favorites'),
			popupFavorites       = document.querySelector('.modal-right--favorites'),
			buttonFavoritesClose = popupFavorites.querySelector('.modal-right__close'),
			buttonSearch         = document.querySelector('.user-menu__item--search'),
			linkSearch           = buttonSearch.querySelector('.link-search'),
			popupSearch          = document.querySelector('.modal-search'),
			searchText           = popupSearch.querySelector('.modal-search__input'),
			searchButton         = popupSearch.querySelector('.modal-search__button'),
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

function headerSticky() {
	let changeYMyself = window.pageYOffset;
	if(window.pageYOffset < 250 && header.classList.contains('trigger')) {
		header.classList.add('header--close');
		setTimeout(function(){header.classList.remove('header--close')}, 701);
		setTimeout(function(){header.classList.remove('trigger')}, 510);
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
	}, 501);
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
	}, 501);
	setTimeout(function(){popupSearch.classList.remove('modal--close');
		header.classList.remove('header--top');
	}, 1001);
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

buttonFavoritesClose.addEventListener('click', function(event) {
	popupFavorites.classList.remove('modal--show');
	popupFavorites.classList.add('modal--close');
	setTimeout(function(){popupFavorites.classList.add('modal--close')}, 700);
	modalClose();
});

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
				popupFavorites.classList.remove('modal--animation');
				setTimeout(function(){popupFavorites.classList.add('modal--close')}, 700);
				header.classList.remove('header--animate');
				modalClose();
		}
		if (popupSearch.classList.contains('modal--show')) {
				popupSearch.classList.add('modal--close');
				popupSearch.classList.remove('modal--show');
				buttonSearchClose.classList.add('user-menu--toggle-close');
				setTimeout(function(){buttonSearchClose.classList.remove('user-menu--toggle-close');
					buttonSearchClose.classList.remove('user-menu--toggle');
					buttonSearch.classList.add('user-menu--toggle');
				}, 501);
				setTimeout(function(){popupSearch.classList.remove('modal--close');
					header.classList.remove('header--top');
				}, 1001);
				modalClose();
		}
	}
});