var audioSecret = new Audio('/complementFile/audio-secret.mp3'); // Ajout d'un audio secret
var rickroll = new Audio('/complementFile/rickroll.mp3'); //Ajout de l'audio rickroll

document.addEventListener('DOMContentLoaded', () => {

    // Détection du mouvement de la souris et ajoute des lignes au coordonnées
    const backgroundLayer = document.getElementById('background-layer');
    const backgrounds = ['#6EACDA', '#E83F25', '#FFD63A', '#5CB338', '#AF2655'];
    const coordinates = { x: undefined, y: undefined };

    // Fonction permettant d'ajouter une ligne dans le html
    const addElement = () => {
      const newEle = document.createElement('div');
      const typeNum = Math.round(Math.random()); // Génére un nombre entre 0 et 1 déterminant si les lignes sont verticales ou horizontales
  
      if (typeNum === 0) {
        newEle.style.width = (Math.floor(Math.random() * 4) + 5) + 'px';
        newEle.style.height = ((Math.floor(Math.random() * 4) * 3) + 25) + 'px';
        newEle.classList.add('line', 'line-high');
      } else {
        newEle.style.width = ((Math.floor(Math.random() * 4) * 3) + 25) + 'px';
        newEle.style.height = (Math.floor(Math.random() * 4) + 5) + 'px';
        newEle.classList.add('line', 'line-wide');
      }
      
      // Définition des coordonnées et de la couleur des lignes
      newEle.style.position = 'absolute';
      newEle.style.backgroundColor = backgrounds[Math.floor(Math.random() * 5)];
      newEle.style.left = coordinates.x + 'px';
      newEle.style.top = coordinates.y + 'px';
  
      backgroundLayer.appendChild(newEle); // Ajout de l'élément
    };
  
    document.addEventListener('mousemove', e => { // Détection des mouvement de la souris
      if (coordinates.x === undefined || coordinates.y === undefined) { // Première ligne initialisation des coordinates
        coordinates.x = e.x;
        coordinates.y = e.y;
        addElement();
      }
  
      if (Math.abs(coordinates.x - e.x) > 50 || Math.abs(coordinates.y - e.y) > 50) { // Attend que la souris a bougé un minimum avant d'ajouté une ligne
        coordinates.x = e.x;
        coordinates.y = e.y;
        addElement();
      }
    });



    // Lancement de l'audio rickroll quand l'image photo-cv est cliquée
    var volume = document.getElementById('photo-cv');
    volume.addEventListener('click', function(e) { 
        rickroll.play(); // Lancement du son rickroll
    });
  

    // Animation des bordures des divs (arc-en-ciel)
    const animatedDivs = document.querySelectorAll('.element-div'); // Selectionne tous les divs voulus
  
    let angle = 0;
    function animateBorders() {
      angle = (angle + 1) % 360;
      animatedDivs.forEach(el => { // Parcour tous les divs sélectionnés
        el.style.setProperty('--angle', `${angle}deg`); // Ajoute un angle au gradient de la border du div
      });
      requestAnimationFrame(animateBorders); // Lance a nouveau la fonction en indiquant au navigateur que c'est une animation 
    }
  
    animateBorders();   
});


// Fonction exécutée quand le boutton téléchargement est pressé, déclenche une animation
function download() {
    const button = document.getElementById("download-button");

    button.disabled = true;
    button.querySelector('.button-text').style.opacity = '0';

    const loader = button.querySelector('.loader');
    loader.style.display = 'block';

    setTimeout(() => {
        button.classList.add('success');
        loader.style.display = 'none';
    }, 2000);

    setTimeout(() => {
        button.classList.remove('success');
        button.disabled = false;
        button.querySelector('.button-text').style.opacity = '1';
    }, 5000);
  }


// Fonction exécutée quand le bouton caché est pressé, lance l'audio secret
function surprise(){
  audioSecret.play(); 
}