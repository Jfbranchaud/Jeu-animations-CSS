/**
 * Classe AnimMot
 * 582-345 Programmation Animation II
 * @version 2016-11-13
 */
var BRANCHAUD_TP2=BRANCHAUD_TP2||{};

(function() {//IIFE
	//Usage d'un mode strict
	"use strict";
	
		/**
		  * Classe permettant de créer et d'animer des éléments textuels
		  * @param {Number} posX - position du mot sur l'axe des X
		  * @param {Number} posY - position du mot sur l'axe des Y
		  * @param {String} fonte  - fonte affectée au mot
		  * @param {String} mot  - chaîne indiquant le mot à animer
		  * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les mots animés
		  */
	
		function AnimMot(posX, posY, fonte, mot, conteneurParent ){
			//Récupérer les valeurs passées en paramètre			
			this.posX = posX;
			this.posY = posY;
			this.fonte = fonte;
			this.mot = mot;
			this.conteneurParent = conteneurParent;

		    //Autres propriétés du mot animé
			this.requeteID = 0;
			this.pourcentageOpacite = 1;
			this.pourcentageEchelle = 1;
			
			//Créer le mot
			this.creerMot();
		}

		/**
		  * Méthode pour créer les différents mots et pour débuter leur animation
		  */
		AnimMot.prototype.creerMot = function(){
			//Créer une balise <div> pour le mot et lui attribuer des styles
			this.elHTML = document.createElement('div');
			this.elHTML.style.position = "absolute";
			this.elHTML.style.left = this.posX + "px";
			this.elHTML.style.top = this.posY + "px";
			this.elHTML.style.font = this.fonte;
			this.elHTML.style.transformOrigin = "0 0";
			this.elHTML.style.webkitTransformOrigin = "0 0";

			//Afficher le mot transféré et mettre l'élément HTML dans son conteneur parent
			this.elHTML.innerHTML = this.mot;
			this.conteneurParent.appendChild(this.elHTML);

			/*Partir la première RequestAnimationFrame
			Par défaut à l'intérieur d'une fonction appelée par window.requestAnimationFrame(), le mot-clé "this"" sera attribué à l'objet window (ou l'objet global). Lorsqu'on travaille avec des méthodes de classe utilisant this qui se réfère à l'instance, on peut lier this de façon explicite afin d'être certain de manipuler l'instance.
			La méthode "bind"" permet cela*/
			
			this.requeteID = window.requestAnimationFrame(this.animerMot.bind(this));
		}

		
		/**
		  * Méthode pour animer le mot et le détruire à la fin de son animation
		  */
		AnimMot.prototype.animerMot = function(tempsActuel){
			
			//Décrémenter le pourcentage d'animation pour l'opacité
			this.pourcentageOpacite -= 0.03;
			//Incrémenter le pourcentage d'animation pour l'échelle
			this.pourcentageEchelle += 0.03;
			
			//Si le pourcentage de l'opacité est > 0, on anime le mot et on repart une nouvelle requête d'animation
			//Sinon, on cancelle le RAF et on enlève l'élément HTML de l'affichage
			
			if(this.pourcentageOpacite > 0 ){
				//Animer l'échelle et l'opacité du mot (i.e. de l'élément HTML)
				this.elHTML.style.opacity = this.pourcentageOpacite + "";
				this.elHTML.style.transform = "scale(" + this.pourcentageEchelle + ")";
				this.elHTML.style.webkitTransform = "scale(" + this.pourcentageEchelle + ")";
				
				//Prochaine requête d'animation
				this.requeteID = window.requestAnimationFrame(this.animerMot.bind(this));
			} else {
				//Arrêter l'Animation RAF
				window.cancelAnimationFrame(this.requeteID);
				//Enlever l'élément HTML de l'affichage
				this.conteneurParent.removeChild(this.elHTML);
				//console.log("Bye bye mot");
			}

		}		

		/*Comme le constructeur de la classe AnimMot est déclaré dans une fonction IIFE,
		ses variables, méthodes ou autres ne seront pas accessibles de l'extérieur...
		Nous devons donc la passer le constructeur de la classe AnimMot à l'objet HTML window qui enregistre toutes les propriétés globales de notre application Web...*/
		BRANCHAUD_TP2.AnimMot = AnimMot;

})();//Fin IIFE