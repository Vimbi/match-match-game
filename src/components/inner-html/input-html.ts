const inputHtml = (placeholder: string): string => (
  `
  <input class="registr-input" type="text" maxlength="30" placeholder="${placeholder}" required>
      <img class="input-done" src="./about/done.png" alt="Done"></img>
`);

export default inputHtml;