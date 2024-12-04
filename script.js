class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Quelle est la capitale de la France ?", ["Madrid", "Berlin", "Paris", "Rome"], "Paris"),
    new Question("Quel est l'élément chimique dont le symbole est 'O' ?", ["Or","Oxygène", "Osmium", "Ozone"], "Oxygène"),
    new Question("Qui a écrit 'Les Misérables' ?", ["Victor Hugo","Albert Camus", "Marcel Proust", "Gustave Flaubert"], "Victor Hugo"),
    new Question("Quelle est la plus grande planète de notre système solaire ?", ["Mars","Terre", "Jupiter", "Saturne"], "Jupiter"),
    new Question("Quel est le plus long fleuve du monde ?", ["Amazone","Nil", "Yangtsé", "Mississippi"], "Amazone"),
    new Question("Qui a peint le célèbre tableau La Nuit étoilée ?", ["Claude Monet", "Pablo Picasso", "Vincent van Gogh", "Edvard Munch"], "Vincent van Gogh"),
    new Question("Quelle est la capitale du Canada ?", ["Toronto", "Vancouver", "Ottawa", "Montréal"], "Ottawa"),
    new Question("En quelle année l'homme a-t-il marché pour la première fois sur la Lune ?", ["1965", "1969", "1972", "1980"], "1969"),
    new Question("Quel est le plus grand océan de la planète ?", ["Atlantique", "Indien", "Pacifique", "Arctique"], "Pacifique"),
    new Question("Quelle est la langue officielle du Brésil ?", ["Espagnol", "Portugais", "Italien", "Anglais"], "Portugais")
  ];
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }

  const boutonRe = document.querySelector('#bouton');
  const boutonPlusAfficher = document.querySelector('#plusAfficher');
  const fini = document.querySelector('#fini');
  const debutQuiz = document.querySelector('#quiz');
  
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("fini", endQuizHTML);
      debutQuiz.classList.add('hidden');
      fini.classList.remove('hidden');
      boutonRe.classList.remove('hidden');
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();

let boolPlusAfficher = localStorage.getItem('AfficherDialog');
console.log(boolPlusAfficher);

/**
 * Afficher le dialog au chargement de la page, sauf si le boutton 'Ne plus afficher' à été cliqué.
 */
window.onload = function() {
  if(boolPlusAfficher == 'false'){
    document.getElementById('modal').style.display = 'none';
  }
  else{
    document.getElementById('modal').style.display = 'block';
  }
};

/**
 * Fermer la fenêtre modale lorsque le bouton 'Fermer la fenêtre' est cliqué.
 */
document.getElementById('close-btn').onclick = function() {
  document.getElementById('modal').style.display = 'none';
};

/**
 * Fermer la fenêtre modale lorsque le bouton 'Ne plus afficher' est cliqué, et mettre la valeur de 'AfficherDialog' à false afin de ne plus l'afficher par la suite.
 */
document.getElementById('plusAfficher').onclick = function(){
  document.getElementById('modal').style.display = 'none';
  localStorage.setItem('AfficherDialog','false');
}

/**
 * Redémarrer le quiz et réinitialiser le score lorsque le bouton 'Recommencer' est cliqué.
 */
boutonRe.addEventListener('click', function(){
  // Create Quiz
  debutQuiz.classList.remove('hidden');
  fini.classList.add('hidden');
  boutonRe.classList.add('hidden');

  quiz = new Quiz(questions);
  quiz.currentQuestionIndex = 0;
  quizApp();
})