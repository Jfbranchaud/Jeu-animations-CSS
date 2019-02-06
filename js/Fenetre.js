/**
 * Classe Fenetre
 * 582-345 Programmation Animation II
 * @version 2016-11-13
 */

var BRANCHAUD_TP2 = BRANCHAUD_TP2||{};

(function() {//IIFE
	//Usage d'un mode strict
	"use strict";
	
		/**
		  * Classe permettant de créer d'afficher une fenêtre
		  * et, d'appeler une fonction du conteneur parent
		  * @param {Number} posX - position du mot sur l'axe des X
		  * @param {Number} posY - position du mot sur l'axe des Y
		  * @param {Number} largeur - largeur de la fenêtre
		  * @param {Number} hauteur - hauteur de la fenêtre
		  * @param {String} classeCSS  - classe CSS pour la mise en forme de la fenêtre
		  * @param {String} texte  - texte à afficher dans la fenêtre
		  * @param {Function} action  - fonction à appeler sur un mousedown
		  * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les mots animés
		  */
	
		function Fenetre(posX, posY, largeur, hauteur, classeCSS, texte, action, conteneurParent){
			//Récupérer les valeurs passées en paramètre			
			this.posX = posX;
			this.posY = posY;
			this.largeur = largeur;
			this.hauteur = hauteur;
			this.classeCSS = classeCSS;
			this.texte = texte;
			this.action = action;
			this.conteneurParent = conteneurParent;

		    //Autres propriétés de la fenêtre
			this.requeteID = 0;
			this.pourcentageEchelle = 0;
			
			
			//Créer la fenêtre
			this.creerFenetre();
		}

		/**
		  * Méthode pour créer et afficher les instances de la classe Fenetre
		  */
		Fenetre.prototype.creerFenetre = function(){
			//Créer une balise <div>
			this.elHTML = document.createElement('div');
			//Appliquer les éléments de style
			this.elHTML.style.position = "absolute";
			this.elHTML.style.width = this.largeur + "px";
			this.elHTML.style.height = this.hauteur + "px";
			this.elHTML.style.left = this.posX + "px";
			this.elHTML.style.top = this.posY + "px";
			this.elHTML.classList.add(this.classeCSS);
			this.elHTML.style.transformOrigin = "50% 50%";
			this.elHTML.style.webkitTransformOrigin = "50% 50%";

			//Mettre le texte et la fenêtre dans son conteneur parent
			this.elHTML.innerHTML = this.texte;
			this.conteneurParent.appendChild(this.elHTML);
			
			//Mettre un écouteur pour fermer la fenêtre et appeler la fonction passée en paramètre
			
			/*En mettant l'écouteur sur l'élément HTML, au sein de la fonction appelée
			le this va correspondre à l'élément HTML et non à l'instance de la fenêtre.
			Lorsqu'on travaille avec des méthodes de classe utilisant this qui se réfère à l'instance, on peut lier this de façon explicite afin d'être certain de manipuler l'instance.
			La méthode "bind"" permet cela*/		
			
			this.elHTML.addEventListener("mousedown", this.fermerFenetre.bind(this), false );

			/*Partir la première RequestAnimationFrame
			Par défaut à l'intérieur d'une fonction appelée par window.requestAnimationFrame(), le mot-clé "this"" sera attribué à l'objet window (ou l'objet global). Lorsqu'on travaille avec des méthodes de classe utilisant this qui se réfère à l'instance, on peut lier this de façon explicite afin d'être certain de manipuler l'instance.
			La méthode "bind"" permet cela*/
			
			this.requeteID = window.requestAnimationFrame(this.animerArriveeFenetre.bind(this));
		}

		
		/**
		  * Méthode pour animer la fenêtre au moment de son affichage
		  */
		Fenetre.prototype.animerArriveeFenetre = function(tempsActuel){	
            
			//Incrémenter le pourcentage d'animation pour l'échelle
			this.pourcentageEchelle += 0.03;
			
			//On agrandit la fenêtre tant que son échelle est < 1,
			//Sinon, on cancelle le RAF
			
			if(this.pourcentageEchelle < 1.5){
				//Animer l'échelle
				this.elHTML.style.transform = "scale(" + this.pourcentageEchelle + ")";
				this.elHTML.style.webkitTransform = "scale(" + this.pourcentageEchelle + ")";
				
				//Prochaine requête d'animation
				this.requeteID = window.requestAnimationFrame(this.animerArriveeFenetre.bind(this));
			} else {
				//Arrêter l'Animation RAF
				window.cancelAnimationFrame(this.requeteID);
			}

		}
		
		Fenetre.prototype.fermerFenetre = function(evt){
			//console.log("fermerFenetre", this)
			//Enlever l'écouteur sur l'élément HTML
			this.elHTML.removeEventListener("mousedown", this.fermerFenetre, false );
			//Enlever la fenetre
			this.conteneurParent.removeChild(this.elHTML);
			
			//Appeler la fonction passée en paramètre
			this.action();
			
			//Arrêter la propagation de l'événement!!!
			evt.stopPropagation();
		}	
		

		/*Comme le constructeur de la classe Fenetre est déclaré dans une fonction IIFE,
		ses variables, méthodes ou autres ne seront pas accessibles de l'extérieur...
		Nous devons donc la passer le constructeur de la classe Fenetre à l'objet HTML window qui enregistre toutes les propriétés globales de notre application Web...*/
		BRANCHAUD_TP2.Fenetre = Fenetre;

})();//Fin IIFE