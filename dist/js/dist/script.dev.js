"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  //Tabs
  var tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(function (i) {
      i.classList.add('hide');
      i.classList.remove('show', 'fade');
    });
    tabs.forEach(function (i) {
      i.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.classList.contains('tabheader__item')) tabs.forEach(function (item, i) {
      if (target == item) {
        hideTabContent();
        showTabContent(i);
      }
    });
  }); //Timer

  var deadline = '2020-08-26';

  function getTimeRemaming(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        minutes = Math.floor(t / 1000 / 60 % 60),
        seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0".concat(num);
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      var t = getTimeRemaming(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      function endTimer(value, selector) {
        if (value <= 0) {
          selector.innerHTML = "00";
        } else {
          selector.innerHTML = getZero(value);
        }
      }

      endTimer(t.days, days);
      endTimer(t.hours, hours);
      endTimer(t.minutes, minutes);
      endTimer(t.seconds, seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); //Modal

  var modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(function (btn) {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });
  var modalTimerId = setTimeout(openModal, 5000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); //Используем классы для карточек

  var MenuCard =
  /*#__PURE__*/
  function () {
    function MenuCard(src, alt, title, descr, price, parentSelector) {
      _classCallCheck(this, MenuCard);

      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 3;
      this.changToBUR();
    }

    _createClass(MenuCard, [{
      key: "changToBUR",
      value: function changToBUR() {
        this.price = +this.price * this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var div = document.createElement('div');

        if (this.classes.length === 0) {
          this.div = 'menu__item';
          div.classList.add(this.div);
        } else {
          this.classes.forEach(function (className) {
            return div.classList.add(className);
          });
        }

        div.innerHTML = "\n        <img src=".concat(this.src, " alt=").concat(this.alt, ">\n        <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n        <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n        <div class=\"menu__item-divider\"></div>\n        <div class=\"menu__item-price\">\n            <div class=\"menu__item-cost\">\u0426\u0435\u043D\u0430:</div>\n            <div class=\"menu__item-total\"><span>").concat(this.price, "</span> BUR/\u0434\u0435\u043D\u044C</div>\n        </div>\n        ");
        this.parent.append(div);
      }
    }]);

    return MenuCard;
  }();

  new MenuCard("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 9, ".menu .container").render();
  new MenuCard("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 14, '.menu .container', 'menu__item').render();
  new MenuCard("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 19, '.menu .container', 'menu__item').render();
});