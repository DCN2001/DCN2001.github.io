const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//16:9
canvas.width  = 1024//innerWidth - 200
canvas.height = 576//innerHeight - 100
const gravity = 0.7 //往下墜的速度

c.fillRect(0, 0, canvas.width, canvas.height)

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imagesource: './img/background1.png'
})

 const player = new Fighter({    //創建主角
    position:{
        x:200,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{      //attckbox朝向
        x: 0,
        y: 0
    },
    color: 'red',
    imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Idle.png',
    framesMax: 10,
    scale: 4.0,
    offset: {
        x: 200,      //人物初始位置(x, y)軸
        y: 170
    },
    sprites:{
        idle:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Idle.png',
            framesMax: 10
        },
        run:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Run.png',
            framesMax: 10
        },
        jump:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Jump.png',
            framesMax: 3
        },
        fall:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Fall.png',
            framesMax: 3
        },
        attack1:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Attack.png',
            framesMax: 4  //attack_ 2:6
        },
        attack2:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_AttackComboNoMovement.png',
            framesMax: 10  //attack_ 2:6
        },
        takehit:{
            imagesource: '.https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Hit.png',
            framesMax: 1  
        },
        death:{
            imagesource: 'https://raw.githubusercontent.com/DCN2001/dcn2001.github.io/main/fight_mod/_Death.png',
            framesMax: 10 
        }
    },
    attackbox:{
        offset:{
            x: 50,
            y: -20
        },
        width: 190,
        height: 60
    }


 }) 
 //player.draw()  不會動 

 const enemy = new Fighter({     //創建敵人
    position:{
        x:800,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x: -50,
        y: 0
    },
    color: 'blue',
    imagesource: './img/idle.png',
    framesMax: 10,
    scale: 3.0,
    offset: {
        x: 200,      //人物初始位置(x, y)軸
        y: 100
    },
    sprites:{
        idle:{
            imagesource: './img/idle.png',
            framesMax: 10
        },
        run:{
            imagesource: './img/run.png',
            framesMax: 8
        },
        jump:{
            imagesource: './img/jump.png',
            framesMax: 3
        },
        fall:{
            imagesource: './img/fall.png',
            framesMax: 3
        },
        attack1:{
            imagesource: './img/attack3.png',
            framesMax: 9  
        },
        attack2:{
            imagesource: './img/attack2.png',
            framesMax: 6  
        },
        takehit:{
            imagesource: './img/take_hit.png',
            framesMax: 3  
        },
        death:{
            imagesource: './img/death2.png',
            framesMax: 8
        }
    },
    attackbox:{
        offset:{
            x: -170, //-170
            y: 0    //0
        },
        width: 160,  //160
        height: 80}   //60
    })

 //enemy.draw() 不會動

 console.log(player)
 console.log(enemy)

 const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
 }


function determine_winner({player,enemy, count_controller}){
    clearTimeout(count_controller)
    document.querySelector('#display_result').style.display = 'flex'
    if(player.health===enemy.health){
        document.querySelector('#display_result').innerHTML = '平手'
    }
    else if(player.health > enemy.health){
        document.querySelector('#display_result').innerHTML = '阿楨贏了 !'
    }
    else if(player.health < enemy.health){
        document.querySelector('#display_result').innerHTML = '球恩贏了 !'
    }
}



let count = 100
let count_controller
function time_count(){
    count_controller = setTimeout(time_count, 1000)
    if(count>0){
        count--
        document.querySelector('#timer').innerHTML = count
    } 

    if(count === 0){
        determine_winner({player, enemy, count_controller})
    }
}

time_count()

 function rectcollision({rect1, rect2}){
    return (
        rect1.attackbox.position.x + rect1.attackbox.width >= rect2.position.x &&     /*刀碰到敵人*/
        rect1.attackbox.position.x <= rect2.position.x + rect2.width &&                  /*p1需在敵人之左方*/
        rect1.attackbox.position.y + rect1.attackbox.height >= rect2.position.y &&    /*刀在下面碰到敵人*/
        rect1.position.y <= rect2.position.y + rect2.height
    )
 }

 function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //playerMove
    player.velocity.x = 0
    if(keys.a.pressed && player.lastkey==='a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if(keys.d.pressed && player.lastkey==='d'){
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else{
        player.switchSprite('idle')
    }
    //player jump
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

    //enemy Move
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastkey ==='ArrowLeft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }
    else if(keys.ArrowRight.pressed && enemy.lastkey ==='ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else{
        enemy.switchSprite('idle')
    }
    //enemy jump
    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if (enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }


    //player_attack1_detect
    if (
        rectcollision({
        rect1: player,
        rect2: enemy
    }) &&
        player.isattacking1 &&
        player.framesCurrent === 3   //4
    ){  
        enemy.take_hit1()
        player.isattacking1 = false
        //enemy.health -= 5
        document.querySelector('#p2_health').style.width = enemy.health + '%'
        console.log('player_attack1_sucess!')
    }
    //player_attack2_detect
    if (
        rectcollision({
        rect1: player,
        rect2: enemy
    }) &&
        player.isattacking2 &&
        player.framesCurrent === 6   //4
    ){  
        enemy.take_hit2()
        player.isattacking2 = false
        //enemy.health -= 5
        document.querySelector('#p2_health').style.width = enemy.health + '%'
        console.log('player_attack2_sucess!')
    }

    //if player a1 misses
    if(player.isattacking1 && player.framesCurrent===3){   //framesCurrent === 4
        player.isattacking1 = false
    }

    //if player a2 misses
    if(player.isattacking2 && player.framesCurrent===6){   //framesCurrent === 4
        player.isattacking2 = false
    }
    
    //enemy_attack1_detect
    if (
        rectcollision({
        rect1: enemy,
        rect2: player
    }) &&
        enemy.isattacking1 &&
        enemy.framesCurrent === 3  
    ){  
        console.log('lllllllllllllllllllllllllllll')
        player.take_hit1()
        enemy.isattacking1 = false
        //player.health -= 5
        document.querySelector('#p1_health').style.width = player.health + '%'
        console.log('enemy_attack1_sucess!')
    }
    //enemy_attack2_detect
    if (
        rectcollision({
        rect1: enemy,
        rect2: player
    }) &&
        enemy.isattacking2 &&
        enemy.framesCurrent === 3    //framesCurrent === 9
    ){
        player.take_hit2()
        enemy.isattacking2 = false
        //player.health -= 5
        document.querySelector('#p1_health').style.width = player.health + '%'
        console.log('enemy_attack2_sucess!')
    }

    ///if enemy a1misses
    if(enemy.isattacking1 && enemy.framesCurrent===3){   //framesCurrent === 4
        enemy.isattacking1 = false
    }

    //if enemy a2 misses
    if(enemy.isattacking2 && enemy.framesCurrent===3){   //framesCurrent === 4
        enemy.isattacking2 = false
    }

    //其中一方血量歸零，提早結束遊戲
    if(player.health<=0 || enemy.health<=0){
        determine_winner({player, enemy, count_controller})
    }
 }

 animate()

 window.addEventListener('keydown', (event) => {
    if(!player.dead){
        switch (event.key){        //按住某個key之反應
            //player1
            case 'd':
                keys.d.pressed = 1
                player.lastkey = 'd'
                break
            case 'a':
                keys.a.pressed = 1
                player.lastkey = 'a'
                break
            case 'w':
                player.velocity.y = -20
                break
            case ' ':
                player.attack1()
                break
            case 'b':
                player.attack2()
                break
    }
}
    if(!enemy.dead){
        switch (event.key){
            //player2
            case 'ArrowRight':
                keys.ArrowRight.pressed = 1
                enemy.lastkey = 'ArrowRight'  //避免覆寫player1
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed =1
                enemy.lastkey = 'ArrowLeft'
                break
            case 'ArrowUp':
                enemy.velocity.y = -20
                break
            case 'k':
                enemy.attack1()
                break
            case 'j':
                enemy.attack2()
                break
        }
}
    
    //console.log(event.key)

 })
 window.addEventListener('keyup', (event) => {
    switch (event.key){        //放開某個key之反應
        //player1
        case 'd':
            keys.d.pressed = 0
            player.lastkey = 'd'
            break
        case 'a':
            keys.a.pressed = 0
            player.lastkey = 'a'
            break
        //不用w的keyup，因為設定的gravity會自動往下掉
        //player2
        case 'ArrowRight':
            keys.ArrowRight.pressed = 0
            enemy.lastkey = 'ArrowRight'  //避免覆寫player1
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed =0
            enemy.lastkey = 'ArrowLeft'
            break

    }
    //console.log(event.key)

 })
