function main(){
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    
    var kl = false;                     // Variable pour les touches
    var ku = false;
    var kr = false;
    var gravity = true;
    var jump = true;
    var char_jump = 0;
    
    var character = {x:canvas.width/2, y:canvas.height/2, xv:3, yv:0, size:20, jump:200};                     // Elements à créer
    var ground_l = {x:5, y:2*canvas.height/3, w:canvas.width/4, h:25};
    var ground = {x:5, y:canvas.height - 30, w:canvas.width - 10, h:25};
    var ground_r = {x:3*canvas.width/4 - 5, y:2*canvas.height/3, w:canvas.width/4, h:25};
    
    document.body.onkeydown = key_down;
    document.body.onkeyup = key_up;
    
    setInterval(draw, 16);
    
    function key_down(ev){             // fonction active à l'appui d'une touche
        switch(ev.keyCode){
            case 37:kl = true;
                break;
            case 38:ku = true;
                break;
            case 39:kr = true;
                break;
        }
        
    }
        
    function key_up(ev){               // fonction active lorsque la touche est relachée
        switch(ev.keyCode){
            case 37:kl = false;
                break;
            case 38:ku = false;
                break;
            case 39:kr = false;
                break;
        }
            
    }
        
    
    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        ctx.beginPath();                                                                            // Dessin des éléments
        ctx.rect(character.x, character.y, character.size, character.size);
        ctx.rect(ground.x,ground.y, ground.w, ground.h);
        ctx.rect(ground_l.x,ground_l.y, ground_l.w, ground_l.h);
        ctx.rect(ground_r.x,ground_r.y, ground_r.w, ground_r.h);
        ctx.stroke();
        
        if(kl){                                             // Elements du déplacement du joueur
            character.x -= character.xv;
        } else if(kr){
            character.x += character.xv;
        }
        
        if(ku && jump){                                             // Elements pour le saut
            char_jump = character.y - character.jump;               // Si la touche et l'option sont activés alors le saut a lieu
            gravity = false;
            jump = false;
        }
        
        if(character.y > char_jump && !gravity){                    // Permet de pouvoir relacher la touche HAUT sans arrêter le saut
            character.y -= 7;
        } else {
            gravity = true;
        }
        
        if(!ku && jump){
            character.yv = 0;
        }
        
        
        if(character.x <= 0){                               // Retour du joueur de l'autre coté du canva
            character.x = canvas.width;
        } else if(character.x >= canvas.width){
            character.x = 0;
        } 
        
        if(character.y < ground.y - character.size && gravity){                     // Creation des éléments solides
            character.y += character.yv;
            character.yv += 9.81/40;
            jump = false;
        }
        if(character.y >= ground.y - character.size){
            character.y = ground.y - character.size;
            jump = true;
            character.yv = 0;
        }
        if(character.x >= ground_r.x - character.size && character.x <= ground_r.x + ground_r.w){
            if(character.y >= ground_r.y - character.size && character.y < ground_r.y + ground_r.h){
                character.y = ground_r.y - character.size;
                jump = true;
            }
        }
        if(character.x >= ground_l.x - character.size && character.x <= ground_l.x + ground_l.w){
            if(character.y >= ground_l.y - character.size && character.y < ground_l.y + ground_l.h){
                character.y = ground_l.y - character.size;
                jump = true;
            }
        }
    }
}