/* Projet javascript
   Panier, sommaire dynamique, carousel
Avril 2018*/

/*  GESTION DU PANIER */
var tabArticles =[];

// Définition d'un article
function Article(nom, img, prix){
	this.nom = nom;
	this.img = img;
	this.prix = prix;
}

// Affichage des objets dans une section
function affichHtml(){
	fig = document.createElement("figure");
	document.getElementById("content").appendChild(fig);

	for (var i=0; i<tabArticles.length;i++){
		elt = document.createElement("h2");
		elt.innerText = tabArticles[i].nom;
		fig.appendChild(elt);

		//Image
		elt = document.createElement("img");
		elt.src = tabArticles[i].img;
		elt.alt = tabArticles[i].nom;
		fig.appendChild(elt);

		// Tableau Prix
		tab = document.createElement("table");
		fig.appendChild(tab);
		row = document.createElement("tr");
		tab.appendChild(row);
		one = document.createElement("td");
		one.innerText ="Prix : ";
		two = document.createElement("td");
		two.innerText = tabArticles[i].prix;
		two.setAttribute("class", "prix");
		three = document.createElement("td");
		three.innerText = "€";
		row.appendChild(one);
		row.appendChild(two);
		row.appendChild(three);

		// Form et boutons
		btn = document.createElement("button");
		btn.setAttribute("class","moins");
		btn.innerText="-";
		fig.appendChild(btn);

		form = document.createElement("form");
		fig.appendChild(form);
		qte = document.createElement("input");
		qte.type ="text";
		qte.id =tabArticles[i].nom;
		qte.name=tabArticles[i].nom;
		qte.value="0";
		form.appendChild(qte);

		btn = document.createElement("button");
		btn.setAttribute("class","plus");
		btn.innerText="+";
		fig.appendChild(btn);
	}
}


// Ajout de nouveaux articles
function generateArticles(){
	tabArticles.push(new Article("Ananas","./img/pineapple.png",2.3));
}

generateArticles();

affichHtml();


// Augmentation de la quantité dans le zone de texte quand on appuie sur le bouton "+"
function ajoutQuantite(e){
	var product = e.srcElement.previousElementSibling; // je récupère le frère précédent = le formulaire
	var p = product.firstChild; //je récupére le premier enfant de ce formulaire = l'input où s'affiche la qté
	var q = p.value; // je récupère la valeur de cette qté

	q++;
	p.value=q;

	//Apparition dans le panier
	var cat = e.srcElement.parentNode; //Figure parent

	//if (q===1){
		art = document.createElement("table");
		art.setAttribute("class",cat.getElementsByTagName("h2")["0"].innerText);
		document.getElementById("panier").appendChild(art);
		artRow = document.createElement("tr");
		art.appendChild(artRow);

		artRowLogo = document.createElement("td");
		artRow.appendChild(artRowLogo);

		logo = document.createElement("img");
		logo.src = cat.getElementsByTagName("img")["0"].src;
		logo.alt = cat.getElementsByTagName("img")["0"].alt;
		artRowLogo.appendChild(logo);

		artRowItem = document.createElement("td");
		artRowItem.innerText = cat.getElementsByTagName("h2")["0"].innerText;
		artRow.appendChild(artRowItem);

		artRowQuantity = document.createElement("td");
		artRowQuantity.innerText = 1;
		artRowQuantity.setAttribute("class","qte");
		artRow.appendChild(artRowQuantity);

		artRowPrice = document.createElement("td");
		artRowPrice.innerText = cat.getElementsByClassName("prix")["0"].innerText;
		artRowPrice.setAttribute("class","add");
		artRow.appendChild(artRowPrice);

	/*} else {
		console.log(document.getElementsByClassName("qte"));
		document.getElementsByClassName("qte").innerText = q;
	}*/

	calculTotal();	
}

// Ajout de la quantité dans la zone de texte quand on appuie sur le bouton "+"
var btnPlus = document.getElementsByClassName("plus");

for (i=0; i<btnPlus.length;i++){
	btnPlus[i].addEventListener("click", function(e){ajoutQuantite(e);});
}


// Diminution de la quantité dans la zone de texte quand on appuie sur le bouton "-"
function retraitQuantite(e){
	var product = e.srcElement.nextElementSibling; // je récupère le frère suivant = le formulaire
	var p = product.firstChild; // je récupére le premier enfant de ce formulaire = l'input où s'affiche la qté
	var q = p.value; // je récupère la valeur de cette qté

	if(q>0){
		q--;
		p.value=q;
	}
    // Figure parent de l'élément cliqué
	var cat = e.srcElement.parentNode;

    // focus sur le panier
	basket = document.getElementById("panier"); 
    
	// je sélectionne les éléments (je sais que ce sont des tables) du panier où la class est égale au texte du h2 de l'élèment cliqué = fait le lien entre l'élèment cliqué et quelle ligne supprimer
	ind = basket.getElementsByClassName(cat.getElementsByTagName("h2")["0"].innerText); 
    
	//sélectionne la dernière table sélectionnée à la ligne précédente
	sup = ind[ind.length-1];

	basket.removeChild(sup);
	 

	calculTotal();

}

var btnMoins = document.getElementsByClassName("moins");

for (i=0; i<btnMoins.length;i++){
	btnMoins[i].addEventListener("click", function(e){retraitQuantite(e);});
}


function calculTotal(){
	calc = document.getElementsByClassName("add");
	
	s=0;

	for (j=0;j<calc.length;j++){
		s=s+Number(calc[j].innerText);
	}

	document.getElementById("total").innerText = s;
}


/* GESTION DU SOMMAIRE DYNAMIQUE */

(function() {

   /*
    LORSQUE l'on clique sur un onglet
        * On retire la class active de l'onglet actif
        * J'ajoute la classe active à l'onglet actuel

        On retire la class active sur le contenu actif
        J'ajoute la class active sur le contenu correspondant à mon clic
    */

    var afficherOnglet = function(a, animations){
        if (animations === undefined){
            animations = true
        }
        var li = a.parentNode
        var div = a.parentNode.parentNode.parentNode
        var activeTab = div.querySelector('.tab-content.active') // contenu actif
        var aAfficher = div.querySelector(a.getAttribute('href')) // contenu à afficher

        if (li.classList.contains('active')) {
            return false
        }

        div.querySelector('.tabs .active').classList.remove('active')
        li.classList.add('active')

        if (animations){
            activeTab.classList.add('fade')
            activeTab.classList.remove('in')
            var transitionend = function(){
                this.classList.remove('fade')
                this.classList.remove('active')
                aAfficher.classList.add('active')
                aAfficher.classList.add('fade')
                aAfficher.offsetWidth
                aAfficher.classList.add('in')
                activeTab.removeEventListener('transitionend', transitionend)
                activeTab.removeEventListener('webkitTransitionEnd', transitionend)
                activeTab.removeEventListener('oTransitionEnd', transitionend)
            }
            activeTab.addEventListener('transitionend', transitionend) 
            activeTab.addEventListener('webkitTransitionEnd', transitionend) 
            activeTab.addEventListener('oTransitionEnd', transitionend)
        }else {
            aAfficher.classList.add('active')
            activeTab.classList.remove('active')
        }
        
        // On ajoute la classe fade sur l'élément actif
        // A la fin de l'animation 
            // on retire la classe fade et active
            // on ajoute la class active et fade à l'élément à afficher
            // on ajoute la class in
    }

    var tabs = document.querySelectorAll('.tabs a')
    for (var i = 0; i < tabs.length; i++){
        tabs[i].addEventListener('click', function(e) {
        afficherOnglet(this) 
        })
    }

    /*
    JE RECUPERE le hash
    AJOUTER LA CLASS active sur le lien href="hash"
    RETIRER LA CLASS active sur les autres onglets
    AFFICHER / Masquer les contenus
    */
    var hashChange = function(e){
        var hash = window.location.hash
        var a = document.querySelector('a[href="' + hash + '"]')
        if (a !== null && !a.parentNode.classList.contains('active')){
            afficherOnglet(a, e !== undefined)
        }
    }

    window.addEventListener('hashchange', hashChange)
    hashChange()
})()


