let squarl = document.querySelector('.squarl');
let img = document.getElementById('squarl-1');

let squarl_props = squarl.getBoundingClientRect();

// This method returns DOMReact -> top, right, bottom, left, x, y, width and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if((e.key == '1' || e.key == 'Enter') && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        squarl.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        easy();
    }

    if(e.key == '2' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        squarl.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        mid();
    }

    if(e.key == '3' && game_state != 'Play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        squarl.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        hard();
    }
});


function easy(){
    let move_speed = 2, grativy = 0.3;
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            squarl_props = squarl.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(squarl_props.left < pipe_sprite_props.left + pipe_sprite_props.width && squarl_props.left + squarl_props.width > pipe_sprite_props.left && squarl_props.top < pipe_sprite_props.top + pipe_sprite_props.height && squarl_props.top + squarl_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = '鼠掉了'.fontcolor('red') + '<br>按enter重新選擇模式開始';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    return;
                }else{
                    if(pipe_sprite_props.right < squarl_props.left && pipe_sprite_props.right + move_speed >= squarl_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let squarl_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        squarl_dy = squarl_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'picture/lili-square.png';
                squarl_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'picture/lili-square.png';
            }
        });

        if(squarl_props.top <= 0 || squarl_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        squarl.style.top = squarl_props.top + squarl_dy + 'px';
        squarl_props = squarl.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 50;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 255){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}


function mid(){
    let move_speed = 3, grativy = 0.5;
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            squarl_props = squarl.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(squarl_props.left < pipe_sprite_props.left + pipe_sprite_props.width && squarl_props.left + squarl_props.width > pipe_sprite_props.left && squarl_props.top < pipe_sprite_props.top + pipe_sprite_props.height && squarl_props.top + squarl_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = '鼠掉了'.fontcolor('red') + '<br>按enter重新選擇模式開始';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    return;
                }else{
                    if(pipe_sprite_props.right < squarl_props.left && pipe_sprite_props.right + move_speed >= squarl_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let squarl_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        squarl_dy = squarl_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'picture/lili-square.png';
                squarl_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'picture/lili-square.png';
            }
        });

        if(squarl_props.top <= 0 || squarl_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        squarl.style.top = squarl_props.top + squarl_dy + 'px';
        squarl_props = squarl.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 50;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 135){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}


function hard(){
    let move_speed = 10, grativy = 0.8;
    function move(){
        if(game_state != 'Play') return;

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            squarl_props = squarl.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(squarl_props.left < pipe_sprite_props.left + pipe_sprite_props.width && squarl_props.left + squarl_props.width > pipe_sprite_props.left && squarl_props.top < pipe_sprite_props.top + pipe_sprite_props.height && squarl_props.top + squarl_props.height > pipe_sprite_props.top){
                    game_state = 'End';
                    message.innerHTML = '鼠掉了'.fontcolor('red') + '<br>按enter重新選擇模式開始';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    return;
                }else{
                    if(pipe_sprite_props.right < squarl_props.left && pipe_sprite_props.right + move_speed >= squarl_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let squarl_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        squarl_dy = squarl_dy + grativy;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'picture/lili-square.png';
                squarl_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'picture/lili-square.png';
            }
        });

        if(squarl_props.top <= 0 || squarl_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        squarl.style.top = squarl_props.top + squarl_dy + 'px';
        squarl_props = squarl.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 40;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_seperation > 40){
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}