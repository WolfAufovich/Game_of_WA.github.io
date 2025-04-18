var player = document.getElementById('player');
var chest = document.getElementById('chest');
var container = document.getElementById('container');
var inventory_sect = document.querySelectorAll('.inventory-sect div');
var content_chest = document.getElementById('content-chest');
var cancel_chest = document.getElementById('cancel-chest');
var chest_sell_sect = document.querySelectorAll('.chest-sell-sect div');
var Reloading_the_pistol_Announce_sect = document.getElementById('Reloading_the_pistol_Announce_sect');
var princess = document.getElementById('princess');
var dialogue_frame_princess = document.getElementById('dialogue_frame_princess');
var announce_of_acting = document.getElementById('announce-of-acting');
var items = [
    bullet1 = {name: "bullet1", icon: "url('textures/items/icon-bullet.png')", damage: 0, count_bullet: 7, in_inventory: false},
    bullet2 = {name: "bullet2", icon: "url('textures/items/icon-bullet.png')", damage: 0, count_bullet: 7, in_inventory: false},
    bullet3 = {name: "bullet3", icon: "url('textures/items/icon-bullet.png')", damage: 0, count_bullet: 7, in_inventory: false},
    pistol = {name: "pistol", icon: "url('textures/items/icon-pistol.png')", damage: 5, count_bullet: 0, in_inventory: false},
    gold_key = {name: "gold_key", icon: "url('textures/items/icon-gold-key.png')", damage: 0, count_bullet: '', in_inventory: false}
];
for (let i = 0; i<4; i++){
    chest_sell_sect[i].id = items[i].name;
    chest_sell_sect[i].querySelector('span').innerHTML = items[i].count_bullet;
};

class Items {
    constructor(name, icon, damage, count_bullet, in_inventory){
        this.name = name;
        this.icon = icon;
        this.damage = damage;
        this.count_bullet = count_bullet;
        this.in_inventory = in_inventory;
    }
};


inventory_sect.forEach((el)=>{
    el.addEventListener('dblclick', function add_to_chest(){
        if (open_chest_flag == 1){
            let name_obj = this.id;
            for (i of items){
                if (i.name == String(name_obj)){ // определяем, что за предмет 
                    var sam_obj = i;
                    var proverka_invent = i.in_inventory;
                    if (proverka_invent==true){
                        for (sect_ch of chest_sell_sect){
                            if (sect_ch.classList.contains('empty')){
                                sect_ch.id = name_obj;
                                sect_ch.querySelector('span').innerHTML = i.count_bullet;
                                sect_ch.classList.remove('empty')
                                sect_ch.classList.add('not_empty')
                                sam_obj.in_inventory = false
                                this.removeAttribute('id')
                                this.classList.add('empty')
                                this.querySelector('span').innerHTML = ' ';
                                break
                            }
                        }
                    }
                }
            }
        }
        
    });
});


//var bg_Offset = 0;
function scroll_bg(Size) {
    let vk = String(window.getComputedStyle(chest).getPropertyValue('left')).slice(0,-2);
    container.style.backgroundPositionX =  parseInt(vk)+540 + "px";
    princess.style.left = parseInt(vk)+1300 + "px";
    dialogue_frame_princess.style.left = parseInt(vk)+/* 200 */ 1390 + "px";
}
var Timer = window.setInterval("scroll_bg(350)", 10);

var run_sound = new Audio('sounds/run.mp3');
run_sound.volume = 0.7;
var function_run_sound = window.setInterval(function(){
    if (act_run == 1){
        run_sound.play()
    }
    else{
        run_sound.currentTime = 0
    }
},100);


var act_run = 0
var r = 1
document.addEventListener('keydown', actions_keyboards); 
function actions_keyboards(event){
    if(event.code=='KeyD'){
        act_run = 1;
        r = 1;
        document.removeEventListener('keydown', actions_keyboards);
        document.addEventListener('keydown', bhop);
        impos = setInterval('right()', 10)
    }
    if(event.code=='KeyA'){
        act_run = 1;
        r = 0;
        document.removeEventListener('keydown', actions_keyboards)
        document.addEventListener('keydown', bhop);
        impos = setInterval('left()', 10);
    }
    if(event.code=='KeyR'){
        Reloading_the_pistol();
    }
    if(event.code=='KeyE'){
        dialogue_with_princess();
    }
    switch(event.keyCode){
        case 49:
            activating_cell_inventory(0)
            break
        case 50:
            activating_cell_inventory(1)
            break
        case 51:
            activating_cell_inventory(2)
            break
        case 52:
            activating_cell_inventory(3)
            break
        case 53:
            activating_cell_inventory(4)
            break
    }
    if(event.code===' ' && r==1){
        jump_right();
    }
    if(event.code===' ' && r==0){
        jump_left();
    }
}



var firstReloadingPistol = 0; 
function Reloading_the_pistol(){
    for(i of inventory_sect){
        if((i.id=='bullet1' || i.id=='bullet2' || i.id=='bullet3') && pistol.count_bullet==0 && document.querySelector('.active_cell').id == 'pistol'){
            i.removeAttribute('id');
            i.classList.remove('not_empty');
            i.classList.add('empty');
            i.querySelector('span').innerHTML = '';
            items[0].count_bullet = 7;
            document.getElementById('pistol').querySelector('span').innerHTML = pistol.count_bullet;
            firstReloadingPistol = 1;
            new Audio('sounds/Reloading_the_pistol.mp3').play();
            break
        }
    }
}


var Reloading_the_pistol_Announce = window.setInterval(function(){
    if(document.querySelector('.active_cell').id == "pistol"){
        Reloading_the_pistol_Announce_sect.style.display = 'flex';
    }
    else{
        Reloading_the_pistol_Announce_sect.style.display = 'none';
    } 
    if(firstReloadingPistol==1){
        Reloading_the_pistol_Announce_sect.style.display = 'none';
        clearInterval(Reloading_the_pistol_Announce);
    }
    
}, 10);

function activating_cell_inventory(i){
    let active_cell = document.querySelector('.active_cell');
    active_cell.classList.remove('active_cell');
    active_cell.classList.add('noactive_cell');
    inventory_sect[i].classList.remove('noactive_cell');
    inventory_sect[i].classList.add('active_cell');
    /* if(inventory_sect[i].id=='pistol' && firstTakePistol == 0){
        Reloading_the_pistol_Announce_sect.style.display = 'flex';
    }
    else{
        Reloading_the_pistol_Announce_sect.style.display = 'none';
    } */
}


function bhop(event){
    if (event.key===' '){
        if(r == 1){
            chest.style.left = String(parseInt(chest.style.left)-5) + 'px';
            jump_right();
        }
        if(r == 0){
            chest.style.left = String(parseInt(chest.style.left)+5) + 'px';
            jump_left();
        }
}};

var x = 0, y = 0, z = 0;
function left(){
    let vk = String(window.getComputedStyle(chest).getPropertyValue('left')).slice(0,-2);
    chest.style.left = parseInt(vk)+3 +'px';
    if(player.classList.contains('jump')==0 && player.classList.contains('run_left')==0){
        player.classList.add('run_left');
    };

};
/* function leftArt(){
    if (x>=4 && y == 0){
        x = 0
        y = 1
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art1.png")';
    }
    if (x>=4 && y == 1){
        x = 0
        y = 2
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art2.png")';
    }
    if (x>=4 && y == 2){
        x = 0
        y = 3
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art3.png")';
    }
    if (x>=4 && y == 3){
        x = 0
        y = 4
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art4.png")';
    }
    if (x>=4 && y == 4){
        x = 0
        y = 5
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art5.png")';
    }
    if (x>=4 && y == 5){
        x = 0
        y = 6
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art6.png")';
    }
    if (x>=4 && y == 6){
        x = 0
        y = 7
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art7.png")';
    }
    if (x>=4 && y == 7){
        x = 0
        y = 8
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art8.png")';
    }
    if (x>=4 && y == 8){
        x = 0
        y = 9
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art9.png")';
    }
    if (x>=4 && y == 9){
        x = 0
        y = 0
        player.style.backgroundImage = 'url("textures/player/running animation/new left/art10.png")';
    }
    x += 1.4
}; */
function right(){   
    let vk = String(window.getComputedStyle(chest).getPropertyValue('left')).slice(0,-2);
    chest.style.left = parseInt(vk)-3 +'px';
    if(player.classList.contains('jump')==0 && player.classList.contains('run_right')==0){
        player.classList.add('run_right');
    }
    /* rightArt(); */      
};
/* function rightArt(){
    if (x>=4 && y == 0){
        x = 0
        y = 1
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art1.png")';
    }
    if (x>=4 && y == 1){
        x = 0
        y = 2
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art2.png")';
    }
    if (x>=4 && y == 2){
        x = 0
        y = 3
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art3.png")';
    }
    if (x>=4 && y == 3){
        x = 0
        y = 4
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art4.png")';
    }
    if (x>=4 && y == 4){
        x = 0
        y = 5
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art5.png")';
    }
    if (x>=4 && y == 5){
        x = 0
        y = 6
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art6.png")';
    }
    if (x>=4 && y == 6){
        x = 0
        y = 7
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art7.png")';
    }
    if (x>=4 && y == 7){
        x = 0
        y = 8
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art8.png")';
    }
    if (x>=4 && y == 8){
        x = 0
        y = 9
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art9.png")';
    }
    if (x>=4 && y == 9){
        x = 0
        y = 0
        player.style.backgroundImage = 'url("textures/player/running animation/new right/art10.png")';
    }
    x += 1.4
}; */

function jump_right(){
    if (!(player.classList.contains('jump_right'))){ //player.classList != 'jump')
        player.classList.add('jump_right');
        setTimeout(function(){
            player.classList.remove('jump_right')
        }, 600);
    }
};
function jump_left(){
    if (!(player.classList.contains('jump_left'))){ //player.classList != 'jump')
        player.classList.add('jump_left');
        setTimeout(function(){
            player.classList.remove('jump_left')
        }, 600);
    }
};


document.addEventListener('keyup', function(event){
    if(event.code=='KeyD' || event.code=='KeyA'){
        act_run = 0;
        clearInterval(impos)
        document.addEventListener('keydown', actions_keyboards);
        player.classList.remove('run_right');
        player.classList.remove('run_left');
        StandArt();
    };
});
function StandArt(){
    if (r == 1){
        player.style.backgroundImage = 'url("textures/player/running animation/stand/stand-right.png")';
        y = 0;
    }
    else{
        player.style.backgroundImage = 'url("textures/player/running animation/stand/stand-left.png")';
        y = 0;
    }
};

var open_chest_flag = 0;
var unlock_chest = 0;
chest.addEventListener('click', function(){
    let position_chest = parseInt(String(window.getComputedStyle(chest).getPropertyValue('left')).slice(0,-2)) + 50;
    let position_player = parseInt(String(window.getComputedStyle(player).getPropertyValue('left')).slice(0,-2)) + 90;
    if((0 <(position_chest-position_player) && (position_chest-position_player)<= 40)||( -250<= (position_chest-position_player) && (position_chest-position_player) < 0)){
        if(unlock_chest == 1){
            open_chest_flag = 1;
            playOpenChestSound();
            content_chest.style.display = 'flex';
            chest.style.backgroundImage = 'url("textures/chest/pixel-chest-open.png")';
        }
        else if(document.querySelector('.active_cell').id == gold_key.name){
            new Audio('sounds/opening the chest lock.mp3').play();
            unlock_chest = 1;
            document.querySelector('.active_cell').classList.remove('not_empty');
            document.querySelector('.active_cell').classList.add('empty');
            document.querySelector('.active_cell').removeAttribute('id');
        }
        else{
            new Audio('sounds/not_lock_chest.mp3').play();
        }
        
    }
});
function playOpenChestSound(){
    var open_chest_sound = new Audio('sounds/opening the chest.mp3');
    /* open_chest_sound.volume = 0.9; */
    open_chest_sound.play();
}
chest_sell_sect.forEach((el)=>{
    el.addEventListener('dblclick', function add_to_inventory(){
        let name_obj = this.id;
        for (i of items){
            if ((i.name == name_obj) && (i.in_inventory == false)){ 
                for (sect of inventory_sect){
                    if (sect.classList.contains('empty')){
                        sect.id = name_obj;
                        sect.classList.remove('empty');
                        sect.classList.add('not_empty');
                        sect.querySelector('span').innerHTML= i.count_bullet;
                        i.in_inventory = true;
                        this.removeAttribute('id');
                        this.classList.add('empty');
                        this.querySelector('span').innerHTML = " ";
                        break
                    }
                } 
            }
        }
    });
});
cancel_chest.addEventListener('click', function(){
    content_chest.style.display = 'none';
    chest.style.backgroundImage = 'url("textures/chest/pixel-chest.png")';
    playOpenChestSound();
    open_chest_flag = 0;
});


var chek_princess = window.setInterval(function(){
    let position_princess = parseInt(String(window.getComputedStyle(princess).getPropertyValue('left')).slice(0,-2)) + 95;
    let position_player = parseInt(String(window.getComputedStyle(player).getPropertyValue('left')).slice(0,-2)) + 90;
    if((-20 <(position_princess-position_player) && (position_princess-position_player)<= -10)||( -270<= (position_princess-position_player) && (position_princess-position_player) < 0)){
        dialogue_frame_princess.style.display = 'flex';
        if(active_dialogue==0){
            dialogue_frame_princess.style.background = 'none';
            dialogue_frame_princess.style.border = 'none';
            dialogue_frame_princess.innerHTML = '<p><span>E</span></p>';
        }
        else{
            dialogue_frame_princess.style.background = ' rgb(70, 69, 69)';
            dialogue_frame_princess.style.border = '2px double gold';
        }
    }
    else{
        dialogue_frame_princess.style.display = 'none';
    }
    if(position_princess<(position_player-126)){
        princess.style.backgroundImage = 'url("textures/princess/stand/stand-right.png")';
    }
    else{
        princess.style.backgroundImage = 'url("textures/princess/stand/stand-left.png")';
    }

}, 10)

var frames_of_dialogue_princess = [
    '<p><span>E</span></p>',
    '<p>Oh, thank goodness! Hello, Kyle! Listen... I have a <b>li-i-i-i-ittle</b> problem...</p><span>E</span>',
    '<p>There\'s something in my house... Something strange...</p><span>E</span>',
    '<p>And...</p><span>E</span>',
    '<p>I WANT YOU TO TAKE IT AWAY!!!</p><span>E</span>',
    '<p>Do whatever you want. Whatever you want! But don\'t let this stuff be in my house!</p><span>E</span>',
    '<p>And... Maybe you\'ll need it.</p><span>E</span>',
]


count_frames = 0
active_dialogue = 0
first_get_key = 0;
function dialogue_with_princess(){
    let position_princess = parseInt(String(window.getComputedStyle(princess).getPropertyValue('left')).slice(0,-2)) + 95;
    let position_player = parseInt(String(window.getComputedStyle(player).getPropertyValue('left')).slice(0,-2)) + 90;
    if((0 <(position_princess-position_player) && (position_princess-position_player)<= 40)||( -220<= (position_princess-position_player) && (position_princess-position_player) < 0)){
        if(count_frames >= 6){
            count_frames = 0
            active_dialogue = 0;
            dialogue_frame_princess.querySelector('span').style.left= '93px';
            for(sectc of inventory_sect) if(first_get_key ==0){
                if(sectc.classList.contains('empty')){
                    sectc.id = gold_key.name;
                    gold_key.in_inventory = true;
                    first_get_key = 1;
                    sectc.classList.remove('empty');
                    sectc.classList.add('not_empty');
                    new Audio('sounds/got_the_key.mp3').play();
                    announce_of_acting.style.display = 'flex';
                    setTimeout(()=>{
                        announce_of_acting.style.animation='none';
                        setTimeout(()=>{
                            announce_of_acting.style.animation='blinker 1s linear infinite';
                            announce_of_acting.style.fontSize = '18px';
                            announce_of_acting.firstChild.innerHTML = 'Help Frieda to expel the creature from her house, which is located in the East.';
                            setTimeout(()=>{
                                announce_of_acting.style.animation='none';
                                announce_of_acting.style.animation = 'opacity_out 10s linear forwards';
                            }, 3000)
                        }, 2000)
                    }, 3000);
                    break
                }
            }
        }
        else{
            count_frames += 1
            active_dialogue = 1;
            dialogue_frame_princess.innerHTML = frames_of_dialogue_princess[count_frames];
            dialogue_frame_princess.querySelector('span').style.left= '180px';
        }
    }
}