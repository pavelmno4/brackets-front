export function validate(event: { currentTarget: EventTarget & HTMLElement }, isValid: () => boolean) {
    if (!isValid()) {
        event.currentTarget.setAttribute('aria-invalid', 'true');
    } else {
        event.currentTarget.setAttribute('aria-invalid', 'false');
    }
}