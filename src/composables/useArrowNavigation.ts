import { watch, onMounted, type Ref, nextTick } from "vue";

interface UseArrowNavigationOptions {
  /** Number of columns in the grid layout */
  columns: number;
  /** Whether navigation should loop around edges */
  loop?: boolean;
  /** Optional selector for the focusable items within the container */
  itemSelector?: string;
}

/**
 * Composable for managing arrow key navigation within a grid of focusable elements.
 * Assumes elements are ordered in the DOM corresponding to their visual grid order.
 *
 * @param containerRef Ref to the container element listening for keydown events.
 * @param itemsRef Ref to an array of the focusable HTML elements within the container.
 * @param options Configuration options.
 * @returns An object containing the handleKeydown function to attach as a listener.
 */
export function useArrowNavigation(
  containerRef: Ref<HTMLElement | null>,
  itemsRef: Ref<(HTMLElement | null)[]>,
  options: UseArrowNavigationOptions
) {
  const { columns, loop = false } = options;

  const getFocusableItems = (): HTMLElement[] => {
    // Filter out any null/undefined items potentially left by v-for refs
    return itemsRef.value.filter((el): el is HTMLElement => !!el);
  };

  const setInitialTabindex = () => {
    const focusableItems = getFocusableItems();
    focusableItems.forEach((item, index) => {
      item.tabIndex = index === 0 ? 0 : -1;
    });
  };

  const handleKeydown = async (event: KeyboardEvent) => {
    const { key } = event;
    const validKeys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];

    if (!validKeys.includes(key) || !containerRef.value) {
      return;
    }

    const focusableItems = getFocusableItems();
    if (focusableItems.length === 0) {
      return;
    }

    const currentFocusedElement = document.activeElement as HTMLElement;
    // Ensure the currently focused element is one of the items we are managing
    const currentIndex = focusableItems.findIndex(
      (item) => item === currentFocusedElement
    );

    if (currentIndex === -1) {
      // If focus is somehow outside the managed items but within the container,
      // potentially focus the first item? Or do nothing? For now, do nothing.
      // Alternatively, could allow tabbing *into* the container to focus the
      // element with tabindex=0. This needs a @focusin listener on the container.
      return;
    }

    event.preventDefault(); // Prevent default arrow key behavior (scrolling)

    let nextIndex = -1;

    switch (key) {
      case "ArrowLeft":
        nextIndex =
          currentIndex > 0
            ? currentIndex - 1
            : loop
            ? focusableItems.length - 1
            : 0;
        break;
      case "ArrowRight":
        nextIndex =
          currentIndex < focusableItems.length - 1
            ? currentIndex + 1
            : loop
            ? 0
            : focusableItems.length - 1;
        break;
      case "ArrowUp":
        nextIndex =
          currentIndex - columns >= 0
            ? currentIndex - columns
            : loop
            ? focusableItems.length + (currentIndex - columns)
            : currentIndex; // Basic loop logic might need refinement for grid ends
        if (nextIndex < 0 && !loop) nextIndex = currentIndex; // Don't go above top row if not looping
        if (nextIndex >= focusableItems.length && loop) {
          // Adjust looping calculation if needed
          // More complex looping might be needed depending on grid shape
          nextIndex = nextIndex % focusableItems.length; // Simplistic wrap
        }
        break;
      case "ArrowDown":
        nextIndex =
          currentIndex + columns < focusableItems.length
            ? currentIndex + columns
            : loop
            ? (currentIndex + columns) % focusableItems.length
            : currentIndex; // Basic loop logic
        if (nextIndex >= focusableItems.length && !loop)
          nextIndex = currentIndex; // Don't go below last row if not looping
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = focusableItems.length - 1;
        break;
    }

    // Ensure nextIndex is valid after calculations
    if (nextIndex < 0 || nextIndex >= focusableItems.length) {
      // If calculation resulted in invalid index (e.g., complex looping edge case or no loop),
      // default to current index to prevent errors.
      nextIndex = currentIndex;
    }

    if (nextIndex !== -1 && nextIndex !== currentIndex) {
      const currentItem = focusableItems[currentIndex];
      const nextItem = focusableItems[nextIndex];

      if (currentItem) currentItem.tabIndex = -1;
      if (nextItem) {
        nextItem.tabIndex = 0;
        // Use nextTick to ensure DOM updates before focusing
        await nextTick();
        nextItem.focus();
      }
    }
  };

  // Watch for changes in the items array (e.g., loaded via v-for)
  watch(
    itemsRef,
    (newItems) => {
      if (newItems.some((item) => !!item)) {
        // Check if at least one item is valid
        setInitialTabindex();
      }
    },
    { immediate: true, deep: true } // immediate might run before refs are populated, deep helps if array structure changes
  );

  // Fallback/alternative: Use onMounted if items are expected to be ready then
  onMounted(() => {
    // Small delay might be needed if refs aren't immediately available
    setTimeout(setInitialTabindex, 50);
  });

  return {
    handleKeydown,
  };
}
