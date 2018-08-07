define([],function(){
    return function(){
        var wrap = document.querySelector('.wrap'),
        list = document.querySelector('.list'),
        imgs = list.querySelectorAll('li'),
        left = document.querySelector('.left'),
        right = document.querySelector('.right'),
        page = document.querySelector('.page'),
        lis = page.querySelectorAll('li');
        var count = 0;
        var timer = null;
        timer = setInterval(function(){
            count++;
            if(count>imgs.length-1){
                count = 0;
            }
            changeImg();
        },2000);
        wrap.onmouseover = function(){
            clearInterval(timer);
        }
        wrap.onmouseout = function(){
            timer = setInterval(function(){
                count++;
                if(count>imgs.length-1){
                    count = 0;
                }
                changeImg();
            },2000);
        }
        for(var i=0;i<lis.length;i++){
            lis[i].index = i;
            lis[i].onmousedown = function(){
                count = this.index;
                changeImg();
            }
        }
        left.onclick = function(){
            count--;
            if(count<0){
                count = imgs.length-1;
            }
            changeImg();
        }
        right.onclick = function(){
            count++;
            if(count>imgs.length-1){
                count = 0;
            }
            changeImg();
        }
        function changeImg(){
            for(var i = 0;i<imgs.length;i++){
                imgs[i].style.display = 'none';
                lis[i].className = '';
            }
            imgs[count].style.display = 'block';
            lis[count].className = 'active';
        }
    }
})