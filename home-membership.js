/* Shared ShareYou membership dialog */
(function () {
  var modal = document.getElementById('membershipModal');
  if (!modal) return;

  var dialog = modal.querySelector('.membership-dialog');
  var closeButton = modal.querySelector('.membership-dialog__close');
  var upgradeButton = modal.querySelector('[data-membership-upgrade]');
  var triggers = [].slice.call(document.querySelectorAll('[data-membership-open]'));
  var lastFocus = null;
  var hideTimer = null;
  var pageSiblings = [].slice.call(document.body.children).filter(function (element) {
    return element !== modal && element.tagName !== 'SCRIPT';
  });

  function language() {
    return window.SY && SY.lang ? SY.lang() : 'en';
  }

  function translate() {
    var lang = language();
    modal.querySelectorAll('[data-member-en]').forEach(function (element) {
      element.textContent = element.getAttribute(lang === 'zh' ? 'data-member-zh' : 'data-member-en');
    });
    closeButton.setAttribute('aria-label', lang === 'zh' ? '关闭会员介绍' : 'Close membership dialog');
    modal.querySelector('.membership-table').setAttribute(
      'aria-label',
      lang === 'zh' ? '免费版与会员版功能对比' : 'Free and Premium feature comparison'
    );
  }

  function focusableElements() {
    return [].slice.call(dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'))
      .filter(function (element) { return element.offsetParent !== null; });
  }

  function openModal(trigger) {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    lastFocus = trigger || document.activeElement;
    translate();
    modal.hidden = false;
    pageSiblings.forEach(function (element) { element.inert = true; });
    document.body.classList.add('membership-open');
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      dialog.focus({ preventScroll: true });
    });
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    pageSiblings.forEach(function (element) { element.inert = false; });
    document.body.classList.remove('membership-open');
    hideTimer = setTimeout(function () {
      modal.hidden = true;
      hideTimer = null;
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
    }, 230);
  }

  triggers.forEach(function (trigger) {
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', 'membershipModal');
    trigger.addEventListener('click', function (event) {
      event.preventDefault();
      openModal(trigger);
    });
  });

  modal.querySelectorAll('[data-membership-close]').forEach(function (control) {
    control.addEventListener('click', closeModal);
  });

  upgradeButton.addEventListener('click', function () {
    var zh = language() === 'zh';
    var original = upgradeButton.textContent;
    upgradeButton.disabled = true;
    upgradeButton.textContent = zh ? '已选择月度会员' : 'Monthly membership selected';
    if (window.SY && SY.toast) {
      SY.toast(zh ? '支付功能接入后即可继续升级' : 'Upgrade will continue once payments are connected');
    }
    setTimeout(function () {
      upgradeButton.disabled = false;
      upgradeButton.textContent = original;
    }, 1600);
  });

  document.addEventListener('keydown', function (event) {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;

    var focusable = focusableElements();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (document.activeElement === dialog) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  document.addEventListener('sy:lang', translate);
  translate();
})();
