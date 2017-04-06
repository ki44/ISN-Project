function main(){
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext('2d');
    
    var kl = false;                     // Variable pour les touches
    var ku = false;
    var kr = false;
    var gravity = true;
    var jump = true;
    var char_jump = 0;
    var score = 0;
    
    var character = {x:canvas.width/2, y:canvas.height/2, xv:3, yv:0, size:20, jump:200};       // Elements à créer
    
    
    var mob = [];
        mob[0] = {x: Math.floor((canvas.width-10)*Math.random())+5, y: Math.floor((canvas.height-30)*Math.random())+1, xv:2.5, yv:0, size:15, gravity:true, alive:true};
    
    function create_mob(){
        this.x = Math.floor((canvas.width-10)*Math.random())+5; 
        this.y = Math.floor((canvas.height-30)*Math.random())+1; 
        this.xv = 2.5; 
        this.yv = 0, 
        this.size = 15; 
        this.gravity = true;
    }
    
	var ground = [];
		ground[0] = {x:5, y:canvas.height - 30, w:canvas.width - 10, h:25};							 //ground du bas
		ground[1] = {x:5, y:2*canvas.height/3, w:canvas.width/4, h:25};                              //ground de gauche  
		ground[2] = {x:3*canvas.width/4 - 5, y:2*canvas.height/3, w:canvas.width/4, h:25};           //ground de droite
        ground[3] = {x:canvas.width/3, y:canvas.height/2, h:40, w:canvas.width/3};
    
    document.body.onkeydown = key_down;
    document.body.onkeyup = key_up;
    
    setInterval(background, 16);
    
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
        
    
    function background(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();                                                   // Dessin des éléments
        ctx.font="20px Arial";
        ctx.fillText("Score: " + score, 10, 40);
        ctx.rect(character.x, character.y, character.size, character.size);
		for(var m=0; m <= mob.length - 1; m++){
            ctx.rect(mob[m].x, mob[m].y, mob[m].size, mob[m].size);
        }
		for(var i=0; i <= ground.length - 1; i++){
            ctx.rect(ground[i].x,ground[i].y, ground[i].w, ground[i].h);
        }
        ctx.stroke();
			
        if(kl){    		                                            // Elements du déplacement du joueur
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
            character.yv += 9.81/100;
            character.y -= 7 - character.yv;
        } else {
            if(!gravity){
                character.yv = 0;
            }
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

        if(character.y < ground[0].y - character.size && gravity){                     // Creation des éléments solides
            character.yv += 9.81/100;
            character.y += character.yv;
            jump = false;
        }
        for(var i=0; i <= ground.length - 1; i++){
            if(character.x >= ground[i].x - character.size && character.x <= ground[i].x + ground[i].w){
                if(character.y >= ground[i].y - character.size && character.y < ground[i].y){
                    character.y = ground[i].y - character.size;
                    jump = true;
                    character.yv = 0;
                } else if(character.y <= ground[i].y + ground[i].h && character.y > ground[i].y){
                    character.y = ground[i].y + ground[i].h;
                    char_jump = ground[i].y + ground[i].h;
                }
            }
        }
        
        for(var m=mob.length - 1; m >= 0; m--){
            if(mob[m].y < ground[0].y - mob[m].size && mob[m].gravity){
                mob[m].yv += 9.81/100;
                mob[m].y += mob[m].yv;
            }
            for(var i=0; i <= ground.length - 1; i++){
                if(mob[m].x >= ground[i].x - mob[m].size && mob[m].x <= ground[i].x + ground[i].w){
                    if(mob[m].y >= ground[i].y - mob[m].size && mob[m].y < ground[i].y){
                        mob[m].y = ground[i].y - mob[m].size;
                        mob[m].yv = 0;
                        mob[m].gravity = false;
                    } else if(mob[m].y <= ground[i].y + ground[i].h && mob[m].y > ground[i].y){
                        mob[m].y = ground[i].y + ground[i].h;
                        char_jump = ground[i].y + ground[i].h;
                    }
                }
            }
            if(character.x + character.size >= mob[m].x && character.x <= mob[m].x + mob[m].size){
                if(character.y + character.size >= mob[m].y && character.y <= mob[m].y + mob[m].size){
                    mob[m] = 0;
                    score++;
                    mob.push(new create_mob());
                }
            }
        }
    }
}
