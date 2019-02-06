
var BRANCHAUD_TP2=BRANCHAUD_TP2||{};

(function(J) {//IIFE
	//----------On utilise un mode de programmation strict
	"use strict";
	
	//Variables de l'application
	//Objet littéral pour les questions du quiz
	var questionsQuiz = {
		nbQuestions : 5,
		question1: {
				probleme: "Question 1 - Comment dit-on Bon matin?",
				choix: ["Konnichiwa","Ohayo","Sayonnara","Konbawa"],
				bonneReponse: 1
			},
		question2: {
				probleme: "Question 2 - Comment dit-on chat?",
				choix: ["Inu","Kuma","Neko","Kitsune"],
				bonneReponse: 2
			},

		question3: {
				probleme: "Question 3 - Quel mot désigne un oreille?",
				choix: ["Mimi","Atame","Ashi","Karada"],
				bonneReponse: 0,
			},

		question4: {
				probleme: "Question 4 - Comment appelle-t-on le thé?",
				choix: ["Mizu", "Koohii","Biiru","Ocha"],
				bonneReponse: 3,
			},


		question5: {
				probleme: "Question 5 - Comment dit-on vert?",
				choix: ["Midori","Aka","Shiro","Kuro"],
				bonneReponse: 0,
			},

		commentaires: {
				bonneReponse: "Sugoi!",
				mauvaiseReponse: "Baka!",
			}
	}

	
	var noQuestionEnCours,//no de la question en cours
		laQuestion, //La question à afficher
		lesChoixDeReponses,//Les choix de réponses
		etatQuiz,//Indications sur l'évolution du Quiz
		boutonSuivant, //Bouton pour afficher les questions suivantes
        score;//Le score du jeu
	
	
	
	window.addEventListener("load", function (){
		//Quand la page est chargée...
		
		//On récupère les balises où seront affichées les infos ou autres
		laQuestion = document.querySelector("#titreQuestion");
		lesChoixDeReponses = document.querySelectorAll(".choix");
		etatQuiz = document.querySelector("footer > p");
		boutonSuivant = document.querySelector("footer > div")
		
		//Démarrage le l'animation sur intro
		var bouton1=document.querySelector("#bouton");
		console.log("hi");
		var elmIntro=document.getElementById("intro");
		bouton1.addEventListener("mousedown", function(){
		elmIntro.classList.add("anim7")	

		//On initialise les valeurs du quiz
		// elmIntro.addEventListener('animationstart', function(){}, true);
		elmIntro.addEventListener('animationend', initialiserQuiz, true);

		



		
	}, false );
	
})
	
	function initialiserQuiz (evt) {
		//Initialiser les variables
		var elmIntro=document.getElementById("intro");
		elmIntro.style.display="none";
		var elmMain=document.getElementById("afficherquiz");
		/*elmMain.style.display="block";*/
		elmMain.style.opacity="1";
		noQuestionEnCours = 0;
        score = 0;
        
        //On affiche la première question
        afficherProchaineQuestion();
        
	};// initialiserQuiz
	
	
	function afficherProchaineQuestion (evt) {
		//On incrémente le no de la prochaine question à afficher
		noQuestionEnCours++;

		//S'il reste une question on l'affiche, sinon c'est la fin du jeu...
		if(noQuestionEnCours <= questionsQuiz.nbQuestions){
			//On affiche la question
			laQuestion.innerHTML = questionsQuiz["question" + noQuestionEnCours].probleme;

			//On affiche les choix de réponse
			for (var i=0 ; i < 4 ; i++){
				lesChoixDeReponses[i].innerHTML = questionsQuiz["question" + noQuestionEnCours].choix[i];

				//On affecte dynamiquement l'index à chaque choix 
				lesChoixDeReponses[i].ID= i;

				//On met un écouteur pour choisir la réponse
				lesChoixDeReponses[i].addEventListener("mousedown", choisirReponse, false);	
			}			
		} else {


			finJeu();
		}

        //On désactive le bouton suivant
        gererBoutonSuivant(false);
		
	};// afficherProchaineQuestion
    
    
    function choisirReponse (evt) {
		//On enlève les écouteurs sur les boutons pour enregistrer la réponse
		for (var i=0 ; i < 4 ; i++){
			lesChoixDeReponses[i].removeEventListener("mousedown", choisirReponse, false);
		}

		if(evt.target.ID == questionsQuiz["question" +noQuestionEnCours].bonneReponse){
			//On incrémente le score
			score++;
			//On affiche un message en haut du bouton cliqué
			afficherMessage(evt.target,questionsQuiz.commentaires.bonneReponse);
		} else  {
			//On affiche un message en haut du bouton cliqué
			afficherMessage(evt.target,questionsQuiz.commentaires.mauvaiseReponse);
		}
		
		//On affiche le score et on ré-active le bouton suivant
		etatQuiz.innerHTML = ("Votre score: " + score + "!  Passez à la question suivante.");
		gererBoutonSuivant(true);

	};// choisirReponse
    
   
	function afficherMessage (bouton, message) {
		//console.log("afficherMessage", bouton, message);
		
		//On affiche le message au dessus du bouton
		//Récupérer la même fonte que celle affichée dans le body...
		var elemBody = document.querySelector("body");
		var laFonte= window.getComputedStyle(elemBody,null).getPropertyValue("font");

		var posX = bouton.offsetLeft;
		var posY = bouton.offsetTop - bouton.offsetHeight;

		//function AnimMot(posX, posY, fonte, mot, conteneurParent ){
		var unMessage= new J.AnimMot(posX, posY, laFonte, message, elemBody);
		
	}
    
	
	function finJeu(){
		//On désactive le bouton suivant


		
		gererBoutonSuivant(false);
		
		//On affiche une fenêtre pour indiquer que le jeu est complété
		afficherFenetre();
	}


	function afficherFenetre(){
		//Affiche la fenêtre
		var laPage= document.querySelector("body");
		var posX = laPage.offsetWidth/4,
			posY = laPage.offsetHeight/4,
			largeur = laPage.offsetWidth/2,
			hauteur = laPage.offsetHeight/1.75,
			
		//On affiche le texte de fin et le score

			texte = "Le quiz est terminé.<br><br>Cliquer dans la fenêtre pour rejouer!";
		
			texte += "<br><br>Score actuel = "  + score+"<br><br>";
			
		
			if (localStorage.meilleurscore)
			{
			texte += "Votre meilleur score était de : "  + localStorage.meilleurscore
			}
			

		//LocalStorage

    	if (localStorage.meilleurscore) {
    		if(localStorage.meilleurscore<score){

    		localStorage.meilleurscore =score ;
    		}
		} 
		else {
		localStorage.meilleurscore =score ;
		}

	


			
		//function Fenetre(posX, posY, largeur, hauteur, classeCSS, texte, action, conteneurParent){
		var uneFenetre= new J.Fenetre(posX,posY, largeur, hauteur, "fenetre", texte, rejouer, laPage);
		
	}// Fin afficherFenetre
    
	function gererBoutonSuivant (actif) {

		console.log( "gererBoutonSuivant", actif);

		if(actif==true) {
			boutonSuivant.addEventListener("mousedown",afficherProchaineQuestion,false);
			boutonSuivant.style.opacity="1";
		} else {
			boutonSuivant.removeEventListener("mousedown",afficherProchaineQuestion,false);
			boutonSuivant.style.opacity="0.3";

		}                
	}
	
	function rejouer(){
		//On réinitialise la question en cours
		initialiserQuiz();
		//On change le message en bas de page pour l'état du jeu
		etatQuiz.innerHTML = "Encore du japonais???"
	}
	
})(BRANCHAUD_TP2);//Fin IIFE