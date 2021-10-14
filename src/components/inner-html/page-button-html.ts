const pageButtonHtml = (icon: string, name: string, url: string): string => (`
  <a href="#/${url}" class="navigation-link">
        <img class="navigation-button__icon" src="./icons/${icon}" alt="button icon">
        <div class="navigation-button__name">${name}</div>
      </a>
`);

export default pageButtonHtml;