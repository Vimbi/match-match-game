const scoreHtml = (name: string, lastName: string, email: string, score: number): string => (
  `
  <div class="personal_data">
    <div>${name} ${lastName}</div>
    <div>${email}</div>
  </div>
  <div>
    <p>Score: ${score}</p>
  </div>
  <hr>
  `);

export default scoreHtml;