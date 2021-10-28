    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const xbtn = document.getElementById('xBtn');
    const obtn = document.getElementById('oBtn');
    const grid = document.getElementsByClassName('grid-child');
    const input = document.getElementsByClassName('input');

    var input_id; 
    var input_value = []; 
    var current_status;
    var player1_choice;
    var hasil;
    var intervalId;


    for(var i = 0; i < grid.length; i++) {
        grid[i].addEventListener("click", function(e){
            input_id = this.id;
        });
    }
    

    xbtn.addEventListener("click", function(){
        var input = document.getElementById(input_id);                    
        if(!input.disabled){            
            play();
            input.innerHTML = "<span class='input' style='color:red'>X</span>"; 
            input.disabled = true;
            xbtn.disabled = true;    
            obtn.disabled = false;
        }
    });

    obtn.addEventListener("click", function(){
        var input = document.getElementById(input_id);     
        if(!input.disabled){
            play();
            input.innerHTML = "<span class='input' style='color:blue'>O</span>";
            input.disabled = true;
            input.disabled = true;
            xbtn.disabled = false;    
            obtn.disabled = true;
        }                       
    });

    function startGame(){        
        intervalId = setInterval(
            function(){
                if(check_grid(string_to_grid(input_to_string()))){
                    clearInterval(intervalId);
                    if(confirm(hasil+' Menang')){
                        reset();
                        startGame();
                    }else{
                        alert('stop');
                    };
                }
            },1
        );
    }

    function reset(){
        player1.style.backgroundColor = "red";        
        player2.style.backgroundColor = "white";        
        obtn.style.backgroundColor = "white";
        obtn.style.color = "white";
        xbtn.style.backgroundColor = "red";
        xbtn.style.color = "white";
        xbtn.disabled = false;    
        obtn.disabled = true;
        current_status = 0;
        player1_choice = '';
        input_id = ''; 
        input_value = []; 
        current_status = '';
        hasil = '';
        intervalId = '';
        for(let i = 0; i < grid.length; i++){
            grid[i].innerHTML = "<span class='input'>-</span>"; 
        }
    }

    function play(){
        if(current_status == 0){            
            player1.style.backgroundColor = "white";
            player2.style.backgroundColor = "blue";
            obtn.style.backgroundColor = "blue";
            obtn.style.color = "white";
            xbtn.style.backgroundColor = "white";
            xbtn.style.color = "white";
            current_status = 1;
        }else{            
            player1.style.backgroundColor = "red";
            player2.style.backgroundColor = "white";
            obtn.style.backgroundColor = "white";
            obtn.style.color = "white";
            xbtn.style.backgroundColor = "red";
            xbtn.style.color = "white";
            current_status = 0;
        }
    }

    function input_to_string(){
        var input_string = '';
        for(let i = 0; i < input.length; i++){
            var nilai = input[i].innerHTML;
            if(nilai == '-'){
                nilai = '.';
            }else if(nilai == 'X'){
                nilai = 1;
            }else{
                nilai = 2;
            }
            input_string += ''+nilai;
        }
        // trigger Draw
        if((input_string.match(/\./g) || []).length == 0){
                clearInterval(intervalId);
                if(confirm('Draw')){
                    reset();
                    startGame();
                }else{
                    alert('stop');
                };
        }
        return input_string;
    }
    
    function string_to_grid(input){
        input_value = [];
        var inputConvert = input.replaceAll('.',0);
        var array1 = inputConvert.split('');  
             
        while(array1[0]){
            input_value.push(array1.splice(0,3));
        }
        
        for (var i in input_value) {
            for(var j in input_value[0]){
                input_value[i][j] = +input_value[i][j];
            }
        }

        return input_value;
    }

    function check_grid(input){
        // check row
        for(let i = 0; i < input.length; i++){                
            if(input[i][0]==1 && input[i][1]==1 && input[i][2]==1){
                hasil = 'X';
                return true;
            }else if(input[i][0]==2 && input[i][1]==2 && input[i][2]==2){
                hasil = 'O';
                return true;
            }
        }

        // check column
        for(let i = 0; i < input[0].length; i++){                
            if(input[0][i]==1 && input[1][i]==1 && input[2][i]==1){
                hasil = 'X';
                return true;
            }else if(input[0][i]==2 && input[1][i]==2 && input[2][i]==2){
                hasil = 'O';
                return true;
            }
        }

        // check cross

        if(input[0][0]==1 && input[1][1]==1 && input[2][2]==1){
            hasil = 'X';
            return true;
        }else if(input[0][0]==2 && input[1][1]==2 && input[2][2]==2){
            hasil = 'O';
            return true;
        }else if(input[0][2]==1 && input[1][1]==1 && input[2][0]==1){
            hasil = 'X';
            return true;
        }else if(input[0][2]==2 && input[1][1]==2 && input[2][0]==2){
            hasil = 'O';
            return true;
        }

        return false;

    }    

    reset();
    startGame();