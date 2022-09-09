import './style.css';

const scoreUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/L6sobYquggbOdKF1aWoB/scores/';

const listElement = document.querySelector('#scores_list');
const submitButton = document.querySelector('#submit_btn');
const refreshButton = document.querySelector('#refresh_btn');

// getData function is for fetching the scores list form the API
const getData = async () => {
  const response = await fetch(scoreUrl);
  const data = await response.json();
  return data.result;
};

// renderScores function is for rendering the fetched list into the DOM
const renderScores = async (scores) => {
  listElement.innerHTML = '';

  scores.forEach((obj) => {
    const listItem = document.createElement('div');
    listItem.classList.add('items');
    listItem.innerHTML = `
      <p> ${obj.user}: ${obj.score} </p>
      `;
    listElement.appendChild(listItem);
  });
};

/*
refreshScoreList function is to refresh the list
 by calling the getData() & renderScores() functions
 */
const refreshScoreList = async () => {
  const scores = await getData();
  renderScores(scores);
};

// addNewScore function is to add a new score into the API using the 'POST' method
const addNewScore = async () => {
  const userName = document.querySelector('#user_field').value;
  const userScore = document.querySelector('#score_field').value;
  document.querySelector('#user_field').value = '';
  document.querySelector('#score_field').value = '';

  const response = await fetch(scoreUrl, {
    method: 'POST',
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  await refreshScoreList();
  const message = await response.json;
  return message;
};

// Add click listeners to Submit & Refresh buttons
submitButton.addEventListener('click', addNewScore);
refreshButton.addEventListener('click', refreshScoreList);

// window.onload will call the refreshScoreList() function during the load of the page
window.onload = refreshScoreList();