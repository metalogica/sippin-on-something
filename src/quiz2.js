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

const PLATFORM_LINK_HANDLER_MAP = {
  x: ({ personalityType }) => { 
    const text = encodeURIComponent(`I just took the wine personality quiz and discovered that I'm a ${personalityType}! 🍷✨

👉 Click the link to discover your wine personality: ${QUIZ_LINK}`);

    const link = `https://x.com/intent/post?text=${text}`;

    window.open(link, '_blank');
  },

  facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${QUIZ_LINK}&amp;src=sdkpreparse`, '_blank'),

  instagram: ({ personalityType }) => {
    const text = encodeURIComponent(`I just took the wine personality quiz and discovered that I'm a ${personalityType}!

Curious about your wine personality? Do you have a sophisticated palate like me, or are you a bold adventurer? Take the quiz and find out!

Click the link to discover your wine personality: ${QUIZ_LINK}`);
    
    const link = `https://www.threads.net/intent/post?text=${text}`;

    window.open(link, '_blank');
  },

  link: ({ personalityType}) => {
    const text = `🎉 I just took the wine personality quiz and discovered that I'm a ${personalityType}! 🍷✨

Curious about your wine personality? Do you have a sophisticated palate like me, or are you a bold adventurer? Take the quiz and find out!  🍇🍷

👉 Click the link to discover your wine personality: ${QUIZ_LINK}`;

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

const ROUNDS = [
  {
    question: `On Wednesdays, we sip:`,
    choices: [
      {
        id: 1,
        text: `Water`,
        score: 1
      },
      {
        id: 2,
        text: `Any wine with bubbles`,
        score: 2
      },
      {
        id: 3,
        text: `A crisp and refreshing white wine`,
        score: 3
      },
      {
        id: 4,
        text: `A dry and full-bodied red wine`,
        score: 4
      },
    ]
  },
  {
    question: `Your ideal first date includes:`,
    choices: [
      {
        id: 1,
        text: `A five-course meal, not just a snack`,
        score: 1
      },
      {
        id: 2,
        text: `A night of cooking together at home`,
        score: 2
      },
      {
        id: 3,
        text: `Game night by the fireplace`,
        score: 3
      },
      {
        id: 4,
        text: `Club, another club, next place, wine bar`,
        score: 4
      },
      {
        id: 5,
        text: `A destination date to a place on your bucket list`,
        score: 5
      }
    ]
  },
  {
    question: `If your life had a theme song, it would be:`,
    choices: [
      {
        id: 1,
        text: `“My Way” by Frank Sinatra`,
        score: 1
      },
      {
        id: 2,
        text: `“Live Like You Were Dying” by Tim McGraw`,
        score: 2
      },
      {
        id: 3,
        text: `“Glamorous” by Fergie`,
        score: 3
      },
      {
        id: 4,
        text: `“Club Can’t Handle Me” by Flo Rida`,
        score: 4
      },
      {
        id: 5,
        text: `“Mr. Brightside” by the Killers`,
        score: 5
      },
      {
        id: 6,
        text: `“Bottoms Up” by Trey Songz feat. Nicki Minaj`,
        score: 6
      }
    ]
  },
  {
    question: `Self-care night to you means:`,
    choices: [
      {
        id: 1,
        text: `Drinking biodynamic wine as a workout`,
        score: 1
      },
      {
        id: 2,
        text: `Charcuterie, red wine, and your favorite movie`,
        score: 2
      },
      {
        id: 3,
        text: `Bubbly, a face mask, and a soaking tub`,
        score: 3
      },
      {
        id: 4,
        text: `Downing two bottles without shame and having a solo dance party`,
        score: 4
      },
      {
        id: 5,
        text: `Taking the night off from drinking and being in your healthy era`,
        score: 5
      },
    ]    
  },
  {
    question: `In social settings, you tend to:`,
    choices: [
      {
        id: 1,
        text: `Pair well with others`,
        score: 1
      },
      {
        id: 2,
        text: `Make one friend and stick by their side`,
        score: 2
      },
      {
        id: 3,
        text: `“Meep” in the corner`,
        score: 3
      },
      {
        id: 4,
        text: `Be the life of the party`,
        score: 4
      },
    ]
  },
  {
    question: `Your friends would describe you as:`,
    choices: [
      {
        id: 1,
        text: `Pair well with others`,
        score: 1
      },
      {
        id: 2,
        text: `Make one friend and stick by their side`,
        score: 2
      },
      {
        id: 3,
        text: `“Meep” in the corner`,
        score: 3
      },
      {
        id: 4,
        text: `Be the life of the party`,
        score: 4
      },
    ] 
  },
  {
    question: `Your ideal dinner would be:`,
    choices: [
      {
        id: 1,
        text: `Kale salad and green juice`,
        score: 1
      },
      {
        id: 2,
        text: `A cheeseburger dipped in Bordeaux`,
        score: 2
      },
      {
        id: 3,
        text: `The chef's tasting menu with perfectly paired wines`,
        score: 3
      },
      {
        id: 4,
        text: `Kids chicken tenders with mac n' cheese paired with a California Cabernet`,
        score: 4
      },
      {
        id: 5,
        text: `A magnum bottle of champagne (and maybe some snacks)`,
        score: 4
      },
    ]
  },
  {
    question: `You would describe your palate as:`,
    choices: [
      {
        id: 1,
        text: `Sweet tooth`,
        score: 1
      },
      {
        id: 2,
        text: `Savory over sweet`,
        score: 2
      },
      {
        id: 3,
        text: `Well-developed and sophisticated`,
        score: 3
      },
      {
        id: 4,
        text: `A not-so-civilized drinker`,
        score: 4
      },
      {
        id: 5,
        text: `On its way to being high maintenance`,
        score: 4
      },
    ]
  },
  {
    question: `When navigating a wine list, ___________ is a great go-to:`,
    choices: [
      {
        id: 1,
        text: `The cheapest option on the menu`,
        score: 1
      },
      {
        id: 2,
        text: `A red wine that's a flex`,
        score: 2
      },
      {
        id: 3,
        text: `A magnum of anything... cuz it's better, duh!`,
        score: 3
      },
      {
        id: 4,
        text: `An organic wine from Italy`,
        score: 4
      },
      {
        id: 5,
        text: `A vintage that's too old to understand`,
        score: 4
      },
    ]
  },
  {
    question: `___________ describes me after a bottle of wine`,
    choices: [
      {
        id: 1,
        text: `A sippin' situation`,
        score: 1
      },
      {
        id: 2,
        text: `Sleepy sips`,
        score: 2
      },
      {
        id: 3,
        text: `Sass in a glass`,
        score: 3
      },
      {
        id: 4,
        text: `The whole package`,
        score: 4
      },
      {
        id: 5,
        text: `The juiciest grape`,
        score: 4
      },
      {
        id: 6,
        text: `Doing the least while sippin the most`,
        score: 4
      },
      {
        id: 7,
        text: `Sad sip... you can't buy happiness but you can certainly buy wine`,
        score: 4
      },            
    ]    
  },
];

const PERSONALITY_TYPE = {
  CASUAL_SIPPER: 'Casual Sipper',
  SOCIAL_SIPPER: 'Social Sipper',
  ADVENTUROUS_SIPPER: 'Adventurous Sipper',
  SOPHISTICATED_SIPPER: 'Sophisticated Sipper',
}

const PERSONALITY_TYPE_SCORE_MAP = {
  [PERSONALITY_TYPE.CASUAL_SIPPER]: 0,
  [PERSONALITY_TYPE.SOCIAL_SIPPER]: 10,
  [PERSONALITY_TYPE.ADVENTUROUS_SIPPER]: 20,
  [PERSONALITY_TYPE.SOPHISTICATED_SIPPER]: 30,
}

const PERSONALITY_TYPE_DESCRIPTION_MAP = {
  [PERSONALITY_TYPE.CASUAL_SIPPER]: `You appreciate the simpler things in life. You enjoy wine, but you're not deeply knowledgeable. Your wine personality is`,
  [PERSONALITY_TYPE.SOCIAL_SIPPER]: `You're likely to be found where the fun is and make great company. You're open to new and unique wine experiences. Your wine personality is`, 
  [PERSONALITY_TYPE.ADVENTUROUS_SIPPER]: `You're the life of the party that enjoys bold and unconventional wine choices. Your personality is`, 
  [PERSONALITY_TYPE.SOPHISTICATED_SIPPER]: `You are highly dynamic with a taste for the finer things in life and have a refined palate. Your wine knowledge is extensive. Your wine personality is`, 
};

const PERSONALITY_TYPE_WINE_MAP = {
  [PERSONALITY_TYPE.CASUAL_SIPPER]: `Sauvignon Blanc`,
  [PERSONALITY_TYPE.SOCIAL_SIPPER]: `Rosé`, 
  [PERSONALITY_TYPE.ADVENTUROUS_SIPPER]: `Champagne`, 
  [PERSONALITY_TYPE.SOPHISTICATED_SIPPER]: `Bordeaux`, 
}

const CLASS_NAME_SELECTED = 'selected';
const QUIZ_NEXT_BUTTON_DOM_ID = 'choiceButton';

document.addEventListener('alpine:init', () => {
  Alpine.store('quiz', {
    roundNumber: 0,
    roundsTotal: ROUNDS.length,
    hasSelected: false,
    round: ROUNDS[0],
    personalityType: '',
    personalityTypeDescription: '',
    personalityTypeWine: '',
    score: 0,
    state: STATE.NOT_STARTED,
    selectedChoiceId: '',

    start() {
      this.state = STATE.IN_PROGRESS;
    },

    select(event = {}) {
      const { target } = event;

      if (!target) {
        window.alert('Something went wrong.');
      }

      if (this.hasSelected) {
        const selectedChoiceDomElement = this._findDomElementByClassName(CLASS_NAME_SELECTED);
        this._removeClassName(selectedChoiceDomElement, CLASS_NAME_SELECTED);
      } else {
        this._setHasSelected(true);
        this._toggleDomElementVisibility(QUIZ_NEXT_BUTTON_DOM_ID);
      }
      
      this._applyClassName(target, CLASS_NAME_SELECTED);

      const choiceId = Number(target.dataset.choiceId);
      this._setSelectedChoiceId(choiceId);
    },

    next() {
      if (!this.hasSelected) {
        return;
      }

      const hasNextRound = Boolean(ROUNDS[this.roundNumber + 1]);
      if (!hasNextRound) {
        const score = this._getScore();

        const personalityType = this._resolvePersonalityType(score);
        this._setPersonalityType(personalityType);

        const personalityTypeDescription = PERSONALITY_TYPE_DESCRIPTION_MAP[personalityType]
        this._setPersonalityTypeDescription(personalityTypeDescription);

        const personalityTypeWine = PERSONALITY_TYPE_WINE_MAP[personalityType];
        this._setPersonalityTypeWine(personalityTypeWine);
        
        this.state = STATE.COMPLETED;
        
        return;
      } else {
        const choiceId = this._getSelectedChoiceId();
        const choiceScore = this._getChoiceScore(choiceId);
        this._setScore(choiceScore);

        const selectedChoiceDomElement = this._findDomElementByClassName(CLASS_NAME_SELECTED);
        this._removeClassName(selectedChoiceDomElement, CLASS_NAME_SELECTED);

        const nextRoundNumber = this.roundNumber + 1;
        this._setRound(nextRoundNumber);
        this._setRoundNumber(nextRoundNumber);
  
        this._setHasSelected(false);
        this._toggleDomElementVisibility(QUIZ_NEXT_BUTTON_DOM_ID);
      }
    },

    share(platform) {
      const linkHandler = PLATFORM_LINK_HANDLER_MAP[platform];

      if (!linkHandler) {
        window.alert('Oops! Something went wrong!');
      }

      const link = linkHandler({ personalityType: this._getPersonalityType() });
    },

    _resolvePersonalityType(score) {
      if (score > PERSONALITY_TYPE_SCORE_MAP.SOPHISTICATED_SIPPER) {
        return PERSONALITY_TYPE.SOPHISTICATED_SIPPER;
      } else if (score > PERSONALITY_TYPE_SCORE_MAP.ADVENTUROUS_SIPPER) {
        return PERSONALITY_TYPE.ADVENTUROUS_SIPPER;
      } else if (score > PERSONALITY_TYPE_SCORE_MAP.SOCIAL_SIPPER) {
        return PERSONALITY_TYPE.SOCIAL_SIPPER;
      } else {
        return PERSONALITY_TYPE.CASUAL_SIPPER;
      }
    },

    _findDomElementByDataAttribute(dataAttribute) {
      return document.querySelector(`[data-${dataAttribute}]`);
    },

    _findDomElementByClassName(className) {
      if (!className) {
        return;
      }

      return document.querySelectorAll(`.${className}`)[0];
    },

    _applyClassName(domElement, className) {
      if (!domElement || !className) {
        return;
      }

      domElement.classList.add(className);
    },

    _removeClassName(domElement, className) {
      if (!domElement || !className) {
        return;
      }

      domElement.classList.remove(className);
    },

    _toggleDomElementVisibility(elementId) {
      const element = document.getElementById(elementId);

      if (!element) {
        return;
      }

      element.classList.toggle('hidden');
    },

    _getChoiceScore(choiceId) {
      const choice = this.round.choices.find(choice => choice.id === choiceId);
      
      return choice.score;
    },

    _getScore() {
      return this.score;
    },

    _getPersonalityType() {
      return this.personalityType;
    },

    _setSelectedChoiceId(choiceId) {
      this.selectedChoiceId = choiceId;
    },

    _getSelectedChoiceId() {
      return this.selectedChoiceId;
    },

    _setHasSelected(value) {
      this.hasSelected = value;
    },

    _setPersonalityType(personalityType) {
      this.personalityType = personalityType;
    },

    _setPersonalityTypeDescription(personalityTypeDescription) {
      this.personalityTypeDescription = personalityTypeDescription;
    },

    _setPersonalityTypeWine(personalityTypeWine) {
      this.personalityTypeWine = personalityTypeWine;
    },

    _setRound(roundNumber) {
      this.round = ROUNDS[roundNumber];
    },

    _setRoundNumber(roundNumber) {
      this.roundNumber = roundNumber;
    },

    _setScore(score) {
      this.score += score;
    }
  });
});
