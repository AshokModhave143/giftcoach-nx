export const setMapWindowStyle = (document: Document) => {
  if (document.readyState === 'complete') {
    document.body.style.padding = '0';
  }
};
