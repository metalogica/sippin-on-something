const html = `<div x-cloak x-data>
  <template x-if="$store.quiz.state === STATE.NOT_STARTED">
    <div>
      <h1>Quiz</h1>
      <button
        @click="() => $store.quiz.start()">Begin!</button>
    </div>
  </template>

  <template x-if="$store.quiz.state === STATE.IN_PROGRESS">
    <div>
      <h2>A Round</h2>
      <p x-text="$store.quiz.score"></p>
      <p x-text="$store.quiz.round.question"></p>
      <template x-for="choice in $store.quiz.round.choices">
        <button
          class="choice"
          x-text="choice"
          @click="event => $store.quiz.guess(event); $nextTick(fadeInChoices)"></button>
      </template>
    </div>
  </template>

  <template x-if="$store.quiz.state === STATE.COMPLETED">
    <div>
      <h2>Completed</h2>
      Total points: <p x-text="$store.quiz.score"></p>
    </div>
  </template>
</div>`;

document.getElementById('root').innerHTML = html;

const fadeInChoices = () => Array.from(
  document.querySelectorAll('.choice'))
    .map(choice => {
      choice.animate([
        { opacity: 100 },
        { opacity: 0 }, 
        { opacity: 100 },
      ], {
        duration: 500,
        iterations: 1,
      }
  )
});

const STATE = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
};

const ROUNDS = [
  {
    question: `What is the chemical element for the symbol 'O'?`,
    answer: `Oxygen`,
    choices: [`Oxygen`, `Fluoride`, `Nitrogen`]
  },
  {
    question: `Who is the author of the novel 'Oliver Twist'?`,
    answer: `Charles Dickens`,
    choices: [`Charles Dickens`, `Jane Austen`, `George Eliot`],
  },
  {
    question: `What is the capital of Australia?`,
    answer: `Canberra`,
    choices: [`Canberra`, `Melbourne`, `Sydney`],
  },
  {
    question: `Who is the president of the USA?`,
    answer: `Joe Biden`,
    choices: [`Joe Biden`, `Donald Trump`, `JFK`],
  }
];

let CURRENT_ROUND = 0;

document.addEventListener('alpine:init', () => {
  Alpine.store('quiz', {
    state: STATE.NOT_STARTED,
    score: 0,
    round: ROUNDS[CURRENT_ROUND],
    start () {
      this.state = STATE.IN_PROGRESS;
    },
    guess (event) {
      if (this.completed) {
        return;
      }
      
      if (event.target.innerText === this.round.answer) {
        this.score += 1;
      }
      
      
      const nextRound = ROUNDS[CURRENT_ROUND + 1];
      if (nextRound) {
        this.round = nextRound;

        CURRENT_ROUND += 1;
      } else {
        this.state = STATE.COMPLETED;
      }
    }
  });
});
