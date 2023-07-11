export function getActiveNavigationId(navigationIds: string[]): string {
    const TOP_OFFSET_TO_BE_CONSIDERED_ACTIVE = 10;

    if (!Array.isArray(navigationIds) || navigationIds.length === 0) {
        return '';
    }

    const activeElementId = navigationIds.reduce((prev: string, current: string) => {
        const prevElement = document.getElementById(prev);
        const currentElement = document.getElementById(current);

        if (!prevElement) {
            return current;
        }
        if (!currentElement) {
            return prev;
        }

        const prevTop = prevElement.getBoundingClientRect().top;
        const currentTop = currentElement.getBoundingClientRect().top;

        return prevTop < currentTop && currentTop < TOP_OFFSET_TO_BE_CONSIDERED_ACTIVE
            ? current : prev;
    });

    const activeElement = document.getElementById(activeElementId);
    if (activeElement && isElementInView(activeElement)) {
        return activeElementId;
    }
    return '';

    function isElementInView(element: HTMLElement): boolean {
        return element.getBoundingClientRect().top - TOP_OFFSET_TO_BE_CONSIDERED_ACTIVE <= 0;
    }
}
