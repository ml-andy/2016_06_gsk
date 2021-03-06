﻿$(document).ready(function(){
	var webData ={};	

	//Init
	webData.wrp=$('.wrapper');
    webData.tvcID = 'YWQFfYIWUJE';
    webData.mainurl = 'http://2016parodontax.everydayhealth.com.tw/20160617/';
    webData.backendurl = 'http://2016parodontax.everydayhealth.com.tw/xml/';
    webData.mapimage = 'http://ml-andy.github.io/chinesechess/website/images/mapicon.png';
    webData.creatUsererrortxt = "請填寫完整資料";
	webData.pagespeed = 500;
    webData.page1scenes = 1;
    webData.page3scenes = 1;
    webData.HasComplet = 0;
    if(device.mobile()) webData.device="mobile";
    else webData.device="pc";
    
    $(".databoxin").mCustomScrollbar({scrollInertia:300,scrollEasing:'linear'});
    $(".page3 .scenes1 .content").mCustomScrollbar({scrollInertia:300,scrollEasing:'linear'});
    $(".page2 .content").mCustomScrollbar({scrollInertia:300,scrollEasing:'linear'});    

    //SCORE INIT
    webData.nowscore = 0;
    webData.nowscorepercent = 0;
    webData.prescore = 0;
    webData.dragscore = 0;
    webData.page1hasplay = false;

    //Canvas init
    webData.treeBigFrame = 0;
    webData.treeSmallFrame = 0;

    canvasIinit();
    //FB INIT
    webData.sharetitle = '【搶救】我的牙齦急診室！';
    webData.sharedes = '刷牙流血問題，隱藏健康大警訊。立即線上檢視，馬上索取【牙周適-牙齦護理牙膏】搶救牙齦！';
    var FBAppId = '1706959846220744';
    FB.init({
      appId      : FBAppId,
      channelUrl : webData.mainurl,
      status     : true,
      xfbml      : true,
      cookie     : true
    });


	//AddListener
    $('.menuaFbshare').click(function(){sharefb();});
    $('.fbshare_btn').click(function(){sharefb();});
    $('.fb_share_btn').click(function(){sharefb();});
    $('.agreebox .checkbox').click(function(){if($(this).hasClass('on')){$(this).removeClass('on');}else{$(this).addClass('on');}});
    $('.p3s1gobtn').click(function(){if(!$(this).hasClass('on')) sendData();});
    $('.sure_btn').click(function(){p1s2sure();});
    $('.databox .bar').each(databoxBar);
    $('.q1ans').click(function(){countScore($(this));});
    $('.start_btn').click(function(){$.address.value("/page1?scenes=2");});
    $('.gobtn').click(function(){if($('.menubtn').hasClass('on')) $('.menubtn').trigger('click');});
    $('.menua').click(function(){$('.menubtn').trigger('click');});	
	$('.menubtn').click(function(){
		if($(this).hasClass('on')){$(this).removeClass('on');showmenu(false);}
		else {$(this).addClass('on'); showmenu(true);}
	});
    $.address.change(addrChange);
	$(window).load(windowLoad);
	function windowLoad(){
        var _random = Math.round(Math.random()*1000)+1;
        $('.user_code').parent().prepend('<img src="'+ webData.backendurl +'api_vcode.ashx?'+_random+'" class="code">');
        createVideo(webData.tvcID);
        for(var i=0;i<$('.forload').length;i++) $('.forload').eq(i).css({'opacity':'1','display':'none'}).addClass('loadend');
        changePage();
        $.ajax({
            url: webData.backendurl + 'api_store.ashx',
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                webData.shopdata = data.DATA;
                if(data.RS=="OK"){
                    initMap();
                }else console.log(data.RS);            
            },error: function(xhr, textStatus, errorThrown) {                
                showLoading(false);
                console.log("error:", xhr, textStatus, errorThrown);
            }
        });
	}
    


    //Eevent
    function sharefb(){
        if(!device.mobile()){
            FB.ui({             
                method: 'feed',
                name: webData.sharetitle,
                caption: "",
                description: webData.sharedes,
                display:"popup",
                link: webData.mainurl
              }, function(response) {
                if (response && !response.error_code) {
                    // console.log('share ok');
                } else {
                    // console.log('share not ok');
                }
            });
        }
        $.ajax({
            url: webData.backendurl + 'api_share.ashx',
            type: 'POST',
            dataType: 'json',
            data:{
                device:webData.device
            },
            success: function(data) {
                console.log(data);
                if(data.RS=="OK"){

                }else console.log(data.RS);
                if(device.mobile()) sharefb_mobile();
            },error: function(xhr, textStatus, errorThrown) {
                if(device.mobile()) sharefb_mobile();
                console.log("error:", xhr, textStatus, errorThrown);
            }
        });        
    }
    function sharefb_mobile(){
        window.location.href='https://m.facebook.com/dialog/feed?app_id='+ FBAppId +'&caption=&name='+webData.sharetitle+'&description='+webData.sharedes+'&link='+ webData.mainurl +'&redirect_uri='+webData.mainurl;
    }
    function canvasIinit(){
        webData.treecanvas = document.getElementById("tree");
        images = images||{};
        ss = ss||{};
        var loader = new createjs.LoadQueue(false);
        loader.addEventListener("fileload", handleFileLoad);
        loader.addEventListener("complete", handleComplete);
        loader.loadFile({src:"images/treeAni_atlas_.txt", type:"spritesheet", id:"treeAni_atlas_"}, true);
        loader.loadManifest(lib.properties.manifest);
    }
    function handleFileLoad(evt) {
        if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
    }
    function handleComplete(evt) {
        var queue = evt.target;
        ss["treeAni_atlas_"] = queue.getResult("treeAni_atlas_");
        exportRoot = new lib.treeAni();

        webData.stage = new createjs.Stage(webData.treecanvas);
        webData.stage.addChild(exportRoot);
        webData.stage.update();

        createjs.Ticker.setFPS(lib.properties.fps);
        createjs.Ticker.addEventListener("tick", StageListenter);

        //smallTree
        webData.treesmall = document.getElementById("treeSmall"); 
        webData.treesmallStage = new createjs.Stage(webData.treesmall);
        webData.treesmallStagemovie = webData.treesmallStage.addChild(new lib.元件1_1());

        //light        
        webData.light = document.getElementById("light"); 
        webData.lightStage = new createjs.Stage(webData.light);
        webData.lightStagemovie = webData.lightStage.addChild(new lib.元件1複製());
        webData.lightStagemovie.setTransform(105,0);

        //gobtn        
        webData.gobtn = document.getElementById("gobtn"); 
        webData.gobtnStage = new createjs.Stage(webData.gobtn);
        webData.gobtnStagemovie = webData.gobtnStage.addChild(new lib.元件2_1());
        webData.gobtnStagemovie.setTransform(0,0);

        webData.HasComplet += 1;
        checkLoading();
    }
    function StageListenter(){
        webData.stage.update();
        if(webData.treesmallStage) webData.treesmallStage.update();
        if(webData.lightStage) webData.lightStage.update();
        if(webData.gobtnStage) webData.gobtnStage.update();

        if(webData.nowscorepercent > webData.treeBigFrame) webData.treeBigFrame+=1;
        else if(webData.nowscorepercent < webData.treeBigFrame) webData.treeBigFrame-=1;        
        
        exportRoot.instance_2.gotoAndStop(webData.treeBigFrame);
        webData.treesmallStagemovie.gotoAndStop(webData.treeSmallFrame);
    }   
    function p1s2sure(){
        //check record
        var _qes = [];
        for(var i=0; i<$('.databox li').length; i++){
            var _txt ='';
            if(i!=1){
                for(var j=0; j<$('.databox li').eq(i).find('.q1ans.on').length; j++){
                    var _tmp = '';
                    if(j!=0) _tmp = ',';
                    _txt = _txt + _tmp + $('.databox li').eq(i).find('.q1ans.on').eq(j).parent().text();
                }                    
            }else{
                if(webData.dragscore<=5) _txt = Math.round(webData.dragscore / 5 * 7);
                else _txt = 7 + Math.round((webData.dragscore - 5) / 15 * 7);
            }
            _qes.push(_txt);                
        }
        var _yes = true;
        for(var i=0; i<_qes.length; i++){
            if(i!=1){
                if(_qes[i] == ''){
                    var _num = i*1 +1;
                    _yes = false;
                    alert('別忘記填寫第' + _num + '題唷!');
                    break;
                }
            }            
        }
        if(!_yes) return;    
        $.ajax({
            url: webData.backendurl + 'api_game.ashx',
            type: 'POST',
            dataType: 'json',
            data:{
                Q1:_qes[0],
                Q2:_qes[1],
                Q3:_qes[2],
                Q4:_qes[3],
                Q5:_qes[4],
                device:webData.device
            },
            success: function(data) {                
                if(data.RS=="OK"){
                    // console.log(data);
                }else console.log(data.RS);            
            },error: function(xhr, textStatus, errorThrown) {                    
                console.log("error:", xhr, textStatus, errorThrown);
            }
        });
        $.address.value("/page1?scenes=3");
        $('.q1ans').removeClass('on');
        $('.databox .bar .light').attr('style','');
        $('.databox .bar .cover').attr('style','');
        $('.databoxin').mCustomScrollbar('scrollTo',0);
    }
    function resetUserdata(){
        var _user_data = $('.user_data');
        _user_data.find('.user_phone').val('');
        _user_data.find('.user_mail').val('');
        _user_data.find('.user_name').val('');
        _user_data.find('.user_code').val('');
    }
    function sendData(){
        $('.p3s1gobtn').addClass('on');
        var _user_data = $('.user_data');
        webData.senddata = {
            mob:_user_data.find('.user_phone').val(),
            email:_user_data.find('.user_mail').val(),
            name:_user_data.find('.user_name').val(),
            storeid:webData.shopdata[webData.nowCity].STORES[webData.nowArea].ID,
            ccc:_user_data.find('.user_code').val(),
            device:webData.device
        }
        if(!webData.senddata.mob || !webData.senddata.email || !webData.senddata.name || !webData.senddata.ccc || !$('.agreebox .checkbox').hasClass('on')){
            if(!$('.agreebox .checkbox').hasClass('on')) alert("請同意個資條款");
            else alert(webData.creatUsererrortxt);          
            $('.p3s1gobtn').removeClass('on');
            return;
        }
        showLoading(true);
        $.ajax({
            url: webData.backendurl + 'api_save.ashx',
            type: 'POST',
            dataType: 'json',
            data:webData.senddata,
            success: function(data) {
                resetUserdata();
                if(data.RS=="OK"){
                    webData.page3scenes=2;
                    changepage3Scenes();
                }else{
                    alert(data.RS);
                    var _random = Math.round(Math.random()*1000)+1;
                    $('.user_code').parent().find('.code').attr('src', webData.backendurl +'api_vcode.ashx?'+_random);
                }
                showLoading(false);
                $('.p3s1gobtn').removeClass('on');
            },error: function(xhr, textStatus, errorThrown) {
                $('.p3s1gobtn').removeClass('on');
                showLoading(false);
                console.log("error:", xhr, textStatus, errorThrown);
            }
        });
    }    
    function databoxBar(){
        var bar = $(this),
            drag = $(this).find('.light'),
            cover = $(this).find('.cover'),
            _width = bar.width() - 10,
            _width50 = _width / 2;

        var evdown;
        var evmove;
        var evup; 

        if(device.mobile()){
            evdown='touchstart';
            evmove='touchmove';
            evup='touchend';
        }else{
            evdown='mousedown';
            evmove='mousemove';
            evup='mouseup'; 
        }

        drag.bind(evdown,function(e){
            e.preventDefault();            
            if(!$('.forq2check').hasClass('on')) bar.bind(evmove, dragmove);
        });
        drag.bind(evup,function(e){
            e.preventDefault();            
            bar.unbind(evmove, dragmove);
        });
        drag.bind('mouseout',function(e){
            e.preventDefault();            
            bar.unbind(evmove, dragmove);
        });
        
        function dragmove(e){
            if(device.mobile()){e = e.originalEvent.touches[0];}
            var lft = Math.floor(e.pageX-bar.offset().left - (drag.width() / 2));
            _width = $('.databox .bar').width()-10;
            _width50 = _width / 2;
            if(lft>_width){
                bar.unbind('mousemove', dragmove);
                return
            }
            else if(lft<0){
                bar.unbind('mousemove', dragmove);
                return
            }
            drag.css('left',lft);
            cover.css('width',lft);
            if(cover.width() <= _width50) webData.dragscore = Math.round(cover.width() / _width50 * 5);
            else webData.dragscore = 5 + Math.round((cover.width()-_width50) / _width50 * 15);            
            countScore_true();
        }
    }
    function countScore_true(){
        webData.nowscore = 0;
        //item
        for(var i=0;i<$('.q1ans').length;i++){
            if($('.q1ans').eq(i).hasClass('on')) webData.nowscore = webData.nowscore + $('.q1ans').eq(i).attr('data-score')*1;
        }
        //drag
        webData.nowscore = webData.nowscore + webData.dragscore;
        webData.nowscorepercent = Math.round(webData.nowscore / 85  * 100) - 1;
        // console.log("webData.dragscore:" + webData.dragscore + "/" + "webData.nowscore:"+webData.nowscore + "/" + "webData.nowscorepercent:" +webData.nowscorepercent);
        webData.prescore = webData.nowscore;
    }
    function countScore(_o){
        if(_o.parent().parent().hasClass('multi')){
            //multiple 
            if(_o.hasClass('on')) _o.removeClass('on');
            else{
                if(_o.hasClass('forq3check')) _o.parent().parent().find('.q1ans').removeClass('on');
                else $('.forq3check').removeClass('on');
                _o.addClass('on');
            }
        }else{
            //single
            _o.parent().parent().find('.q1ans').removeClass('on');
            _o.addClass('on');
        }
        if($('.forq2check').hasClass('on')){
            $('.databox .bar .light').attr('style','');
            $('.databox .bar .cover').attr('style','');
            webData.dragscore = 0;
        }
        countScore_true();
    }
    function showmenu(_t){
    	if(_t){
    		$('.menuDom').addClass('on');
    	}else{
    		$('.menuDom').removeClass('on');
    	}
    }
    function changepage3Scenes(){
        var _tmp = '';        
        if(webData.page3scenes!=1) _tmp = ' scenes' + webData.page3scenes;
        else{setTimeout(function(){changeCity();},1500);}
        $('.wrapperin .page3 .scenes_all').attr('class','scenes_all' + _tmp);
        $('.wrapperin .page3 .scenes_all .scenes').stop().fadeOut().eq(webData.page3scenes - 1).stop().fadeIn(300,function(){
            $('.wrapperin .page3 .scenes_all .scenes').eq(webData.page3scenes-1).addClass('on');
        });
        $('.wrapperin .page3 .scenes_all .scenes .content').hide();
        if(webData.page1hasplay) $('.wrapperin .page3 .scenes_all .scenes2 .btn1 a').hide().eq(1).show();
        else $('.wrapperin .page3 .scenes_all .scenes2 .btn1 a').hide().eq(0).show();
        if(webData.pg3timeout) clearTimeout(webData.pg3timeout);
        webData.pg3timeout = setTimeout(function(){
            $('.wrapperin .page3 .scenes_all .scenes').eq(webData.page3scenes-1).find('.content').fadeIn();
        },1300);
    }
    function changepage1Scenes(){
        var _tmp = '';          
        if(webData.page1scenes!=1) _tmp = ' scenes' + webData.page1scenes;
        else{
            try{webData.lightStagemovie.gotoAndPlay(0);}catch(err){}
        }
        $('.wrapperin .page1 .scenes_all').attr('class','scenes_all' + _tmp);
        $('.wrapperin .page1 .scenes_all .scenes').stop().fadeOut().eq(webData.page1scenes - 1).stop().fadeIn(300,function(){
            $('.wrapperin .page1 .scenes_all .scenes').eq(webData.page1scenes-1).addClass('on');
        });        
        if(webData.page1scenes==2){
            webData.nowscore = 0;
            webData.nowscorepercent = 0;
            webData.prescore = 0;
            webData.dragscore = 0;
            webData.treeBigFrame = 0;            
        }
        if(webData.page1scenes==3){
            webData.treeSmallFrame = 0;
            page1secenes3ani(true);
        }
        else page1secenes3ani(false);
    }
    function page1secenes3ani(_t){
        var _scenes3 = $('.wrapperin .page1 .scenes_all .scenes3');        
        if(_t){
            webData.page1hasplay = true;
            _scenes3.find('.score').html(0);
            if(webData.nowscorepercent<=40) _scenes3.find('.s').hide().eq(0).show();
            else if(webData.nowscorepercent>40 && webData.nowscorepercent<=80) _scenes3.find('.s').hide().eq(1).show();
            else if(webData.nowscorepercent>80) _scenes3.find('.s').hide().eq(2).show();
            _scenes3.find('.content').hide();
            if(webData.pg1S3timeout) clearTimeout(webData.pg1S3timeout);
            webData.pg1S3timeout = setTimeout(function(){                
                _scenes3.find('.content').fadeIn(300,function(){
                    page1secenes3Scoreani();
                });
            },1300);            
        }else{
            _scenes3.find('.content').fadeOut();
        }        
    }
    function page1secenes3Scoreani(){
        var _score = $('.wrapperin .page1 .scenes_all .scenes3 .score');
        var _nownumber = _score.text();
        if(_nownumber < webData.nowscorepercent){
            _nownumber=_nownumber*1 + 1;
            webData.treeSmallFrame = _nownumber;
            webData.pg1S3timeout = setTimeout(function(){page1secenes3Scoreani();},33);
        }
        _score.html(_nownumber);
    }
    function changePage(){
        $('.scenes_all .scenes').removeClass('on');
        $('.forload').removeClass('on').stop().fadeOut();
        $('.page' + webData.nowpage).stop().fadeIn(300,function(){
            $('.page' + webData.nowpage).addClass('on');
        });
        try{webData.lightStagemovie.gotoAndStop(1);}catch(err){}
        if(webData.nowpage==1) changepage1Scenes();
        if(webData.nowpage==2){
            $('.page2').find('.content').hide();
            if(webData.pg3timeout) clearTimeout(webData.pg3timeout);
            webData.pg3timeout = setTimeout(function(){
                $('.page2').find('.content').fadeIn(300,function(){
                    if(webData.privacy){
                        if($(window).width()<=640) $('body,html').animate({scrollTop:$('.page2 .content .t_big').offset().top-90},500);
                        else $('.page2 .content').mCustomScrollbar('scrollTo',$('.page2 .content .t_big'));
                    }
                    else $('.page2 .content').mCustomScrollbar('scrollTo',0);
                });
            },1300);
        }
        if(webData.nowpage==4){
             $('.page4').find('.content').hide();
            if(webData.pg3timeout) clearTimeout(webData.pg3timeout);
            webData.pg3timeout = setTimeout(function(){
                $('.page4').find('.content').fadeIn();
                if(!device.mobile()) webData.player.playVideo();                
            },1300);
        }else{
            try{
                if(!device.mobile()) webData.player.pauseVideo();                
            }
            catch(err){}
        }
        if(webData.nowpage==5){
             $('.page5').find('.content').show();            
        }
        if(webData.nowpage==3){
            $('.footer .gobtn').fadeOut();
            changepage3Scenes();
        }
        else $('.footer .gobtn').fadeIn();
    	webData.wrp.attr('class','wrapper').addClass('page' + webData.nowpage);
    	webData.prepage = webData.nowpage;    	
    }
    function initMap(){
        //Insert City Data
        webData.nowCity = 0;        
        $('.mapdata .city').html('');
        for(i in webData.shopdata) $('.mapdata .city').append('<option>'+ webData.shopdata[i].city +'</option>');
        $('.mapdata .city').change(function(){
            webData.nowCity = $('.mapdata .city option:selected').index();
            changeCity();
        });
        $('.mapdata .area').change(function(){
            webData.nowArea = $('.mapdata .area option:selected').index();
            changeArea();
        });

        //Start
        webData.HasComplet += 1;
        checkLoading();
    }
    function changeCity(){
        webData.nowArea = 0;
        $('.mapdata .area').html('');
        for(i in webData.shopdata[webData.nowCity].STORES) $('.mapdata .area').append('<option>'+ webData.shopdata[webData.nowCity].STORES[i].STORE +'</option>');
        changeArea();
    }
    function changeArea(){
        $('.shop_addr').html(webData.shopdata[webData.nowCity].STORES[webData.nowArea].ADDRESS);
        $('.lastnumber').find('span').html(webData.shopdata[webData.nowCity].STORES[webData.nowArea].QTY);
        var _shop = webData.shopdata[webData.nowCity].STORES[webData.nowArea];
        webData.mapOptions = {zoom: 18,center: new google.maps.LatLng(_shop.LAT, _shop.LNG)}
        webData.map = new google.maps.Map(document.getElementById('mapCanvas'),webData.mapOptions); 
        var beachMarker = new google.maps.Marker({position: new google.maps.LatLng(_shop.LAT, _shop.LNG),map: webData.map,icon: webData.mapimage});
        webData.map.setCenter(new google.maps.LatLng(_shop.LAT, _shop.LNG));
    }
    function createVideo(_id){
        webData.player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: _id,
          playerVars:{
            'controls':1,
            'autoplay':false,
            'enablejsapi':'0',
            'hd':'1',
            'rel':'0',
            'showinfo':'0',
            'modestbranding':'1',
            'cc_load_policy':'1',
            'wmode':'transparent'      
          }
        });     
    }    
    function checkLoading(){
        if(webData.HasComplet >= 2) showLoading(false);
        else setTimeout(function(){checkLoading();},300);     
    }
    function addrChange(){
    	var value = $.address.value();
		switch(value) {
			case '/':
				window.location.href = "index.html#/page1";
			break;
			case '/page1':
				// console.log('牙齦急診室');
				webData.nowpage = 1;
                webData.page1scenes = 1;
			break;
            case '/page1?scenes=2':
                // console.log('牙齦緊急檢查');
                webData.nowpage = 1;
                webData.page1scenes = 2;
            break;
            case '/page1?scenes=3':
                // console.log('診斷結果');
                webData.nowpage = 1;
                webData.page1scenes = 3;
            break;
			case '/page2':
				// console.log('牙齦求診須知');
				webData.nowpage = 2;
                webData.privacy = false;
			break;
            case '/page2?scenes=2':
                // console.log('個人資料同意書');
                webData.nowpage = 2;
                webData.privacy = true;
            break;            
			case '/page3':
				// console.log('立即索取');
				webData.nowpage = 3;
                webData.page3scenes = 1;
			break;
            case '/page3?andy':
                // console.log('索取結果');
                webData.nowpage = 3;
                webData.page3scenes = 2;
            break;
            case '/page4':
                // console.log('救救牙齦TVC');
                webData.nowpage = 4;
            break;
            case '/page5':
                // console.log('牙齦健康自救法');
                webData.nowpage = 5;
            break;
            default:
                window.location.href = "index.html#/page1";
            break;
		}
        if(webData.HasComplet >= 2) changePage();		
    }
  	function showLoading(_t){
  		if(_t) $('.loading').fadeIn();
  		else $('.loading').fadeOut();
  	}
})//ready end  
function getUrlVars(){
    var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
    for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]}
    return vars
}
