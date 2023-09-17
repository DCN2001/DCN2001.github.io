class Sprite{
    constructor({position, imagesource, scale = 1, framesMax = 1, offset={x:0, y:0}}){
        this.position = position    //位置
        this.width = 50
        this.height = 150   
        this.image = new Image()
        this.image.src= imagesource
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage(this.image,
            this.framesCurrent * (this.image.width/this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y,
            (this.image.width/this.framesMax)*this.scale,
            this.image.height * this.scale
            )
    }

    animateFrame(){
        this.framesElapsed++

        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }else{
                this.framesCurrent = 0
            }
        }
    }

    update(){
        this.draw()
        this.animateFrame()
    }
 }

 class Fighter extends Sprite{
    constructor({position, velocity, color = 'red', 
    imagesource, scale = 1, framesMax = 1, 
    offset={x:0, y:0}, sprites, 
    attackbox={
        offset: {},
        width: undefined,
        height: undefined
    }}){
        super({
            position,
            imagesource,
            scale,
            framesMax,
            offset
        })

        //this.position = position    //位置
        this.velocity = velocity    //重力的速度
        this.color = color
        this.width = 50
        this.height = 150   
        this.lastkey
        this.attackbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackbox.offset,
            width: attackbox.width,
            height: attackbox.height
        }
        this.isattacking1
        this.isattacking2
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false

        for(const sprite in sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imagesource
        }
        console.log(this.sprites)
    }
    

    update(){
        this.draw()
        if(!this.dead) this.animateFrame()
        
        this.attackbox.position.x = this.position.x + this.attackbox.offset.x
        this.attackbox.position.y = this.position.y + this.attackbox.offset.y

        //draw attack box: 
        //c.fillStyle = 'black'
        //c.fillRect(this.attackbox.position.x, this.attackbox.position.y, this.attackbox.width, this.attackbox.height)  

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //位置+身高+速度大於畫布時，停止往下掉
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 75) {
            this.velocity.y = 0
            this.position.y = 351
        }else{
            this.velocity.y += gravity
        }
        //console.log(this.position.y)
    }
    
    take_hit1(){
        this.health -= 5

        if(this.health <= 0){
            this.switchSprite('death')
            console.log('dead')
        }else{
            this.switchSprite('takehit')
        }
    }

    take_hit2(){
        this.health -=15

        if(this.health <= 0){
            this.switchSprite('death')
            console.log('dead')
        }else{
            this.switchSprite('takehit')
        }
    }

    attack1(){
        this.switchSprite('attack1')
        this.isattacking1= true
        
    }

    attack2(){
        this.switchSprite('attack2')
        this.isattacking2 = true
        
    }

    switchSprite(sprite){
        //overwrite with death
        if(this.image === this.sprites.death.image){
            if(this.framesCurrent === this.sprites.death.framesMax - 1) this.dead = true
            return
        }

        //overweiting with attack
        if(this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1
            ) 
            return
        if(this.image === this.sprites.attack2.image && 
            this.framesCurrent < this.sprites.attack2.framesMax - 1
            ) 
            return

        //overwrite with take hit
        if(this.image === this.sprites.takehit.image && 
            this.framesCurrent < this.sprites.takehit.framesMax - 1
            ) 
            return

        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack2':
                if(this.image !== this.sprites.attack2.image){
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takehit':
                if(this.image !== this.sprites.takehit.image){
                    this.image = this.sprites.takehit.image
                    this.framesMax = this.sprites.takehit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
 }