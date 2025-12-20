// 하단 모달
(function () {
  
  const TRIGGER_SELECTOR = '[data-bottom-sheet-target]';
  const DISMISS_SELECTOR = '[data-bottom-sheet-dismiss]';
  const HANDLE_SELECTOR = '.bottom-sheet__handle';
  const SWIPE_CLOSE_THRESHOLD = 60;
  const MAX_DRAG_DISTANCE = 120;

  const triggers = document.querySelectorAll(TRIGGER_SELECTOR);
  const sheets = Array.from(document.querySelectorAll('.bottom-sheet'));

  if (!triggers.length || !sheets.length) {
    return;
  }

  const dim = document.createElement('div');
  dim.className = 'bottom-sheet-dim';
  document.body.appendChild(dim);

  let activeSheet = null;
  let startY = null;
  let isDragging = false;

  const getOpenSheets = () => sheets.filter((sheet) => sheet.classList.contains('is-open'));

  const hideDimIfNeeded = () => {
    if (!getOpenSheets().length) {
      document.body.classList.remove('bottom-sheet-open');
      dim.classList.remove('is-visible');
    }
  };

  const resetSheetPosition = (sheet) => {
    sheet.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    sheet.style.transform = '';
  };

  const closeSheet = (sheet) => {
    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    resetSheetPosition(sheet);
    if (activeSheet === sheet) {
      activeSheet = null;
    }
    hideDimIfNeeded();
  };

  const openSheet = (sheet) => {
    if (activeSheet && activeSheet !== sheet) {
      closeSheet(activeSheet);
    }
    resetSheetPosition(sheet);
    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    activeSheet = sheet;
    document.body.classList.add('bottom-sheet-open');
    dim.classList.add('is-visible');
  };

  const attachDismissHandlers = (sheet) => {
    const dismissButtons = sheet.querySelectorAll(DISMISS_SELECTOR);
    dismissButtons.forEach((button) => {
      button.addEventListener('click', () => closeSheet(sheet));
    });
  };

  const attachHandleHandlers = (sheet) => {
    const handle = sheet.querySelector(HANDLE_SELECTOR);
    if (!handle) return;

    const handlePointerMove = (event) => {
      if (!isDragging || startY === null) return;
      const deltaY = event.clientY - startY;

      if (deltaY <= 0) {
        sheet.style.transform = 'translate(-50%, 0)';
        return;
      }

      const limitedDelta = Math.min(deltaY, MAX_DRAG_DISTANCE);
      sheet.style.transform = `translate(-50%, ${limitedDelta}px)`;
    };

    const endDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      if (startY !== null) {
        const deltaY = event.clientY - startY;
        if (deltaY > SWIPE_CLOSE_THRESHOLD) {
          closeSheet(sheet);
        } else {
          resetSheetPosition(sheet);
        }
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      if (event.pointerId !== undefined && handle.hasPointerCapture(event.pointerId)) {
        handle.releasePointerCapture(event.pointerId);
      }
      startY = null;
    };

    handle.addEventListener('pointerdown', (event) => {
      if (!sheet.classList.contains('is-open')) return;
      isDragging = true;
      startY = event.clientY;
      sheet.style.transition = 'none';
      handle.setPointerCapture(event.pointerId);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
    });
  };

  const registerSheet = (sheet) => {
    attachDismissHandlers(sheet);
    attachHandleHandlers(sheet);
  };

  sheets.forEach(registerSheet);

  dim.addEventListener('click', () => {
    if (activeSheet) {
      closeSheet(activeSheet);
    }
  });

  const handleTrigger = (event) => {
    const targetId = event.currentTarget.getAttribute('data-bottom-sheet-target');
    if (!targetId) return;
    const sheet = document.getElementById(targetId);
    if (!sheet) return;

    if (event.type === 'keydown' && !['Enter', ' ', 'Spacebar'].includes(event.key)) {
      return;
    }

    openSheet(sheet);
    event.preventDefault();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', handleTrigger);
    trigger.addEventListener('keydown', handleTrigger);
  });
})();