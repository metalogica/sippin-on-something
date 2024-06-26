const randomize = (originalArray) => {
  const shuffledArray = [];
  
  do {
    const randomInteger = Math.floor(Math.random() * originalArray.length);
    if (shuffledArray.includes(randomInteger)) {
      continue;
    } else {
      shuffledArray.push(randomInteger);
    }
  } while (shuffledArray.length < originalArray.length);

  return shuffledArray.map(index => originalArray[index]);
}

const QUIZ_LINK = 'https://sippinonsomething.com/quiz';

const PLATFORM_SHARE_HANDLER_MAP = {
  x: ({ score }) => { 
    const text = encodeURIComponent(`🍷 I scored ${score}/10 on the wine knowledge quiz from Sippin' on Somethin'! How well do you know your wine? 🍇🍷

Think you can beat my score? Test your knowledge and see where you stand! 🥂✨

👉 Take the quiz now: ${QUIZ_LINK}

#SippinOnSomethin`);

    const link = `https://x.com/intent/post?text=${text}`;

    window.open(link, '_blank');
  },

  facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${QUIZ_LINK}&amp;src=sdkpreparse`, '_blank'),

  instagram: ({ score }) => {
    const text = encodeURIComponent(`🍷 I scored ${score}/10 on the wine knowledge quiz from Sippin' on Somethin'! How well do you know your wine? 🍇🍷

Think you can beat my score? Test your knowledge and see where you stand! 🥂✨

👉 Take the quiz now and share your results: ${QUIZ_LINK}

#SippinOnSomethin`);
    
    const link = `https://www.threads.net/intent/post?text=${text}`;

    window.open(link, '_blank');
  },

  link: ({ score}) => {
    const text = `🍷 I scored ${score}/10 on the wine knowledge quiz from Sippin' on Somethin'! How well do you know your wine? 🍇🍷

Think you can beat my score? Test your knowledge and see where you stand! 🥂✨

👉 Take the quiz now and share your results: ${QUIZ_LINK}

#SippinOnSomethin`;

    navigator.clipboard.writeText(text);

    setTimeout(() => {
      document.querySelector('.social-media__link-popup').classList.add('hidden');
    }, 1000);
  }
}


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
    choices: randomize([`10 pounds`, `2.5 pounds`, `61 pounds`, `0.7 pounds`])
  },
  {
    question: `The process by which grape sugar becomes alcohol is...`,
    answer: `Fermentation`,
    choices: randomize([`Carbonation`, `Fermentation`, `Yeastification`, `Ripening`]),
  },
  {
    question: `What compound in red grapes makes you tired?`,
    answer: `Melatonin`,
    choices: randomize([`Alcohol level`, `Melatonin`, `Grape color`, `Sugar level`]),
  },
  {
    question: `Which of the following external factors does not influence a grape variety’s flavor profile?`,
    answer: `Bottle size`,
    choices: randomize([`Weather`, `Soil`, `Aging style and time`, `Bottle size`]),
  },
  {
    question: `Which wine-making method gives wine a crisp and effervescent profile?`,
    answer: `Both steel and egg barrel aging`,
    choices: randomize([`Steel barrel aging`, `Oak barrel aging`, `Egg barrel aging`, `Both steel and egg barrel aging`]),
  },
  {
    question: `Which country is not a top-five producer of wine?`,
    answer: `Chile`,
    choices: randomize([`Italy`, `Spain`, `Argentina`, `Chile`]),
  },
  {
    question: `Which of the following is not one of the -S words of tasting?`,
    answer: `Stand`,
    choices: randomize([`Sip`, `Stand`, `Smell`, `Swirl`]),
  },
  {
    question: `Which of these is the most diverse grape?`,
    answer: `Chardonnay`,
    choices: randomize([`Merlot`, `Cabernet Sauvignon`, `Chardonnay`, `Sauvignon Blanc`]),
  },
  {
    question: `Which wine is associated with flavours of green bell pepper, grass, and gooseberry?`,
    answer: `Sauvignon Blanc`,
    choices: randomize([`Merlot`, `Cabernet Sauvignon`, `Chardonnay`, `Sauvignon Blanc`],) 
  },
  {
    question: `Where did winemaking begin?`,
    answer: `Georgia`,
    choices: randomize([`France`, `Argentina`, `Italy`, `Georgia`],) 
  }    
];

let CURRENT_ROUND = 0;

document.addEventListener('alpine:init', () => {
  Alpine.store('quiz', {
    choiceLabels: ['A', 'B', 'C', 'D'],
    competencyLevel: '',
    competencyText: '',
    guess: '',
    hasGuessed: false,
    currentRound: CURRENT_ROUND + 1,
    round: ROUNDS[CURRENT_ROUND],
    score: 0,
    state: STATE.NOT_STARTED,

    start () {
      this.state = STATE.IN_PROGRESS;

      document.querySelector('.quiz-container').classList.remove('bg-main');
    },
    
    guess (event) {
      if (this.hasGuessed) {
        return;
      }

      if (this.completed) {
        this.competencyLevel = COMPETENCY_LEVELS[this.score];
        
        return;
      }
      
      const choiceElementDOM = event.target;

      choiceElementDOM.id = 'chosen';

      const selectedChoice = this.round.choices[choiceElementDOM.id];
      if (choiceElementDOM.dataset.choice === this.round.answer) {
        this.score += 1;
      }

      this.hasGuessed = true;

      this._showCorrectAnswer();
    },

    share(platform) {
      const shareHandler = PLATFORM_SHARE_HANDLER_MAP[platform];

      if (!shareHandler) {
        window.alert('Oops! Something went wrong!');
      }

      shareHandler({ score: this._getScore() });      
    },
    
    nextRound() {
      const nextRound = ROUNDS[CURRENT_ROUND + 1];
      if (nextRound) {
        this._clearSelected();

        this.hasGuessed = false;
        this.round = nextRound;
        this.currentRound += 1;
        
        CURRENT_ROUND += 1;
      } else {
        this.state = STATE.COMPLETED;
        this.competencyText = COMPETENCY_LEVELS[this.score];
      }
    },

    _getScore() {
      return this.score;
    },
    
    _clearSelected() {
      Array.from(
        document.querySelectorAll('.fade-in'))
          .map(choice => {
            choice.animate([
              { opacity: 100 },
              { opacity: 0 }, 
              { opacity: 100 },
            ], {
              duration: 1000,
              iterations: 1,
            }
        )
      });

      const choice = document.getElementById('chosen');
      if (choice) {
        choice.id = '';
      } else {
        return;
      }

      document.querySelector('.button-next').classList.add('opacity-0');

      Array.from(document.querySelectorAll('.quiz-card')).forEach(choice => choice.classList.remove('red-border', 'green-border'));
      
      Array.from(document.querySelectorAll('.quiz-card-front')).forEach(card => card.classList.remove('quiz-card-front-flip'));
      Array.from(document.querySelectorAll('.quiz-card-back')).forEach(card => card.classList.remove('quiz-card-back-flip'));
    },

    _showCorrectAnswer() {
      document.querySelector('.button-next').classList.remove('opacity-0');
      
      Array.from(document.querySelectorAll('.quiz-card-front')).forEach(card => {
        if (card.dataset.choice === this.round.answer || card.id === 'chosen') {
          card.classList.add('quiz-card-front-flip');
        }
      });

      Array.from(document.querySelectorAll('.quiz-card-back')).forEach(card => {
        if (card.dataset.choice === this.round.answer) {
          const chosenCardBackDOM = document.getElementById('chosen').parentElement.querySelector('.quiz-card-back');
          
          card.classList.add('quiz-card-back-flip');
          if (chosenCardBackDOM) {
            chosenCardBackDOM.classList.add('quiz-card-back-flip');
          }
        }
      });
    },
  });
});
