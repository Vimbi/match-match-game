const cardHtml = (image: string): string => (
  `
  <div class="card">
    <div class="card__front" style="background-image: url('./images/${image}')"></div>
    <div class="card__back"></div>
  </div>
`);

export default cardHtml;