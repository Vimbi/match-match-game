const gameSettingsHtml = `
<div class="settings-wrapper">
  <label class="settings-label" for="cards-type">Game cards</label>
  <select class="settings-select cards-type" name="cards-type" id="cards-type">
    <option value="0" disabled selected>select game cards type</option>
    <option value="0">Unsorted</option>
    <option value="1">Vehicles</option>
  </select>
</div>

<div class="settings-wrapper">
  <label class="settings-label for="difficulty">Difficulty</label>
  <select class="settings-select difficulty" name="difficulty" id="difficulty">
    <option value="0" disabled selected>select game type</option>
    <option value="0">4 x 4</option>
    <option value="1">6 x 6</option>
  </select>
</div>
`;

export default gameSettingsHtml;