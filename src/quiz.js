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
    {
    question: `Which wine-making method gives wine a crisp and effervescent profile?`,
    answer: `Both Steel barrel aging AND Egg barrel aging`,
    choices: [`Steel barrel aging`, `Oak barrel aging`, `Egg barrel aging`, `Both Steel barrel aging AND Egg barrel aging`],
  },
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
