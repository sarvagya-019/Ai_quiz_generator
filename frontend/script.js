const form = document.getElementById('quiz-form');
const outputDiv = document.getElementById('quiz-output');
const loadingDiv = document.getElementById('loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const topic = document.getElementById('topic').value.trim();
  const numQuestions = document.getElementById('numQuestions').value;
  const difficulty = document.getElementById('difficulty').value;

  if (!topic || !numQuestions || !difficulty) {
    alert('Please fill in all fields.');
    return;
  }

  loadingDiv.style.display = 'block';
  outputDiv.innerHTML = '';

  try {
    const response = await fetch('http://localhost:5000/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, numQuestions, difficulty })
    });

    const data = await response.json();
    displayQuiz(data.questions);
  } catch (error) {
    console.error('Error:', error);
    outputDiv.innerHTML = `<p style="color:red;">Something went wrong! Please try again later.</p>`;
  } finally {
    loadingDiv.style.display = 'none';
  }
});

function displayQuiz(questions) {
  const html = questions.map((q, idx) => `
    <div class="question">
      <strong>Q${idx + 1}:</strong> ${q.question}<br>
      <em>Answer:</em> ${q.answer}
    </div>
  `).join('');
  outputDiv.innerHTML = `<h2>📝 Generated Quiz</h2>${html}`;
}
