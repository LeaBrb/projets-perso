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
                activeTab.removeEventListener('tansitionend', transitionend)
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