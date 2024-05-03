const fadeInChoices = () => Array.from(
  document.querySelectorAll('.fade-in'))
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

const COMPETENCY_LEVELS = {
  0: 'Do you even wine?',
  1: 'Do you even wine?',
  2: 'You need more wine in your life',
  3: 'You need more wine in your life',
  4: 'You’re a 4 … but you’re funny 😊',
  5: 'You’ve been to a tasting or two but could use some more sippin',
  6: 'Sips of success – you’re doing great!',
  7: 'Sips of success – you’re doing great!',
  8: 'Sip n’ slay – you’re a wine snob!',
  9: 'Sip n’ slay – you’re a wine snob!',
  10: 'Master Somm status achieved!!!',
};

const ROUNDS = [
  {
    question: `How many pounds of grapes are needed to make a bottle of wine?`,
    answer: `2.5 pounds`,
    choices: [`10 pounds`, `2.5 pounds`, `61 pounds`, `0.7 pounds`]
  },
  {
    question: `The process by which grape sugar becomes alcohol is...`,
    answer: `Fermentation`,
    choices: [`Carbonation`, `Fermentation`, `Yeastification`, `Ripening`],
  },
  {
    question: `What compound in red grapes makes you tired?`,
    answer: `Melatonin`,
    choices: [`Alcohol level`, `Melatonin`, `Grape color`, `Sugar level`],
  },
  {
    question: `Which of the following external factors does not influence a grape variety’s flavor profile?`,
    answer: `Bottle size`,
    choices: [`Weather`, `Soil`, `Aging style and time`, `Bottle size`],
  },
  // surplus round
  // {
  //   question: `Which wine-making method gives wine a crisp and effervescent profile?`,
  //   answer: `Both Steel barrel aging AND Egg barrel aging`,
  //   choices: [`Steel barrel aging`, `Oak barrel aging`, `Egg barrel aging`, `Both Steel barrel aging AND Egg barrel aging`],
  // },
  {
    question: `Which country is not a top-five producer of wine?`,
    answer: `Chile`,
    choices: [`Italy`, `Spain`, `Argentina`, `Chile`],
  },
  {
    question: `Which of the following is not one of the -S words of tasting?`,
    answer: `Stand`,
    choices: [`Sip`, `Stand`, `Smell`, `Swirl`],
  },
  {
    question: `Which of these is the most diverse grape?`,
    answer: `Stand`,
    choices: [`Merlot`, `Cabernet Sauvignon`, `Chardonnay`, `Sauvignon Blanc`],
  },
  {
    question: `Which of these is the most diverse grape?`,
    answer: `Chardonnay`,
    choices: [`Merlot`, `Cabernet Sauvignon`, `Chardonnay`, `Sauvignon Blanc`],
  },
  {
    question: `Which wine is associated with flavours of green bell pepper, grass, and gooseberry?`,
    answer: `Sauvignon Blanc`,
    choices: [`Merlot`, `Cabernet Sauvignon`, `Chardonnay`, `Sauvignon Blanc`], 
  },
  {
    question: `Where did winemaking begin?`,
    answer: `Georgia`,
    choices: [`France`, `Argentina`, `Italy`, `Georgia`], 
  }    
];

let CURRENT_ROUND = 0;

document.addEventListener('alpine:init', () => {
  Alpine.store('quiz', {
    choiceLabels: ['A', 'B', 'C', 'D'],
    competencyLevel: '',
    competencyText: '',
    guess: '',
    currentRound: CURRENT_ROUND + 1,
    round: ROUNDS[CURRENT_ROUND],
    score: 0,
    state: STATE.NOT_STARTED,

    start () {
      this.state = STATE.IN_PROGRESS;

      document.querySelector('.quiz-container').classList.remove('bg-main');
    },

    select(event) {
      this._clearSelected();
      
      event.target.classList.add('selected');
    },
    
    guess () {
      const selectedChoice = document.querySelector('.selected');
      if (!selectedChoice) {
        return;
      }

      if (this.completed) {
        this.competencyLevel = COMPETENCY_LEVELS[this.score];
        
        return;
      }
      
      if (selectedChoice.innerText === this.round.answer) {
        this.score += 1;
      }
      
      const nextRound = ROUNDS[CURRENT_ROUND + 1];
      if (nextRound) {
        this.round = nextRound;
        this.currentRound += 1;
        
        CURRENT_ROUND += 1;
        
        this._clearSelected();

        fadeInChoices();
      } else {
        this.competencyText = COMPETENCY_LEVELS[this.score];
        this.state = STATE.COMPLETED;
      }
    },
    
    _clearSelected() {
      Array.from(document.querySelectorAll('.quiz-card')).forEach(choice => choice.classList.remove('selected'));
    }
  });
});
