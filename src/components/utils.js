export const addDotesButtonName = (btn) => {
    btn.textContent = btn.textContent + '...';
}
export const removeDotesFromButtonName = (btn) => {
    btn.textContent = btn.textContent.replace('...', '');
}