function getItemsPerView(desktopCount, tabletCount) {
  if (window.innerWidth <= 600) {
    return 1;
  }

  if (window.innerWidth <= 1024) {
    return tabletCount;
  }

  return desktopCount;
}

function initResponsiveSlider({
  trackId,
  prevId,
  nextId,
  itemSelector,
  desktopItems,
  tabletItems,
  step = 1
}) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!track || !prevBtn || !nextBtn) return;

  let index = 0;
  let itemsPerView = getItemsPerView(desktopItems, tabletItems);

  function getItems() {
    return Array.from(track.querySelectorAll(itemSelector));
  }

  function getMaxIndex() {
    return Math.max(0, getItems().length - itemsPerView);
  }

  function getItemWidth() {
    const firstItem = getItems()[0];

    if (!firstItem) return 0;

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "0");

    return firstItem.getBoundingClientRect().width + gap;
  }

  function updateButtons() {
    const maxIndex = getMaxIndex();
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= maxIndex;
    prevBtn.style.opacity = prevBtn.disabled ? "0.45" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.45" : "1";
    prevBtn.style.cursor = prevBtn.disabled ? "default" : "pointer";
    nextBtn.style.cursor = nextBtn.disabled ? "default" : "pointer";
  }

  function updateSlider() {
    const maxIndex = getMaxIndex();
    index = Math.min(index, maxIndex);
    track.style.transform = `translateX(-${index * getItemWidth()}px)`;
    updateButtons();
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();

    if (index >= maxIndex) return;

    index = Math.min(index + step, maxIndex);
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;

    index = Math.max(index - step, 0);
    updateSlider();
  });

  window.addEventListener("resize", () => {
    itemsPerView = getItemsPerView(desktopItems, tabletItems);
    updateSlider();
  });

  updateSlider();
}

initResponsiveSlider({
  trackId: "track",
  prevId: "prev",
  nextId: "next",
  itemSelector: ".slide-item",
  desktopItems: 3,
  tabletItems: 2,
  step: 1
});

initResponsiveSlider({
  trackId: "track2",
  prevId: "prev2",
  nextId: "next2",
  itemSelector: "img",
  desktopItems: 3,
  tabletItems: 2,
  step: 1
});

initResponsiveSlider({
  trackId: "track3",
  prevId: "prev3",
  nextId: "next3",
  itemSelector: ".testimonial-card",
  desktopItems: 2,
  tabletItems: 2,
  step: 1
});
