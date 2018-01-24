$(function() {
	
	var registry = new naver.maps.MapTypeRegistry();
				
	var map = new naver.maps.Map($('#map')[0], {
		center: new naver.maps.LatLng(36.0207091, 127.9204629), //지도의 초기 중심 좌표(36.0207091, 127.9204629)
		zoom: 3, //지도의 초기 줌 레벨
		/*mapTypes: registry,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: naver.maps.MapTypeControlStyle.BUTTON,
			position: naver.maps.Position.TOP_RIGHT
		},*/
		minZoom: 3,
		logoControl: false,
		mapDataControl: false,
		disableDoubleClickZoom: true
	});
	
	//map.mapTypes.set(naver.maps.MapTypeId.NORMAL, naver.maps.NaverMapTypeOption.getNormalMap());
	//map.mapTypes.set(naver.maps.MapTypeId.HYBRID, naver.maps.NaverMapTypeOption.getHybridMap());
	
	var cadastralLayer = new naver.maps.CadastralLayer();		

	function showJijeokLayer(onOff, $btn) {		  
		if(onOff == 'on') {
			cadastralLayer.setMap(null);
		}
		else if(onOff == 'off') {
			cadastralLayer.setMap(map);
		}
	}

	


	//지적도
	$('#btnJijeok').on('click', function() {
		var onOff = $(this).data('switch');
		showJijeokLayer(onOff, $(this));
		showRightBtn(onOff, $(this));
	});

	//타임뷰
	$('#btnTimeview').on('click', function() {
		var onOff = $(this).data('switch');
		showRightBtn(onOff, $(this));
		showTimeviewLayer(onOff, $(this));
	});

	//면적재기
	$('#btnCalcArea').on('click', function() {
		var onOff = $(this).data('switch');
		showRightBtn(onOff, $(this));
	});

	//거리재기
	$('#btnCalcDistance').on('click', function() {
		var onOff = $(this).data('switch');
		showRightBtn(onOff, $(this));
	});

	//일반보기
	$('#btnMapNormal').on('click', function()  {
		map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
		$(this).addClass('active');
		$('#btnMapSatellite').removeClass('active');
	});

	//위성보기
	$('#btnMapSatellite').on('click', function()  {
		map.setMapTypeId(naver.maps.MapTypeId.HYBRID);
		$(this).addClass('active');
		$('#btnMapNormal').removeClass('active');
	});
	
});


// 우측 버튼 active 관련
var showRightBtn = function(onOff, $btn) {		  
	if(onOff == 'on') {
		$btn.data('switch', 'off');
		$btn.removeClass('active');
	}
	else if(onOff == 'off') {
		$btn.data('switch', 'on');
		$btn.addClass('active');
	}
}

// Timeview show hide
var showTimeviewLayer = function(onOff, $btn) {		  
	if(onOff == 'on') {
		$('#dvTimeview').hide();
	}
	else if(onOff == 'off') {
		$('#dvTimeview').show();
		$('#dvYearRange').rangeSlider('resize');
	}
}


////////////////////////////////////////////////////////////////////////
// 좌메뉴 클릭시 해당 컨텐츠 노출
var showLnbCont = function(element) {
	this.$element  = $(element);
	this.$parent   = this.$element.parent('li');		
	var data       = this.$element.data('name');

	this.$parent.addClass('active');
	this.$parent.siblings('li').removeClass('active');

	$('#lnbCont > .lnbContWrap').hide();
	$('#lnbCont > #' + data).show();
}

// 노출된 좌메뉴 컨텐츠 close 
var hideLnbCont = function(obj){
	var divObj = null;
	var parents = $(obj).parents();
	
	for (var i=0;i<parents.length;i++) {
		var parent = parents[i];
		if ($(parent).hasClass('lnbContWrap')) {
			divObj = parent;
			break;
		}
	}

	var thisPopId = divObj.id; 
	$('#' + thisPopId).hide();
	$('#memuList > li').removeClass('active');

	
	var lnbWidth   = $('#lnbArea').outerWidth();
	$('.mapArea').animate({
		'left': lnbWidth 
	},100);
	$('.mapArea').css({'min-width':'964px'});
}

// 좌메뉴 컨텐츠 출력에 따른 mapArea 조정
var mapAreaPosition = function(element){
	this.$element  = $(element);
	this.$parent   = this.$element.parent('li');		
	var data       = this.$element.data('name');
    var contWidth  = $('#lnbCont > #' + data).outerWidth();
	var lnbWidth   = $('#lnbArea').outerWidth();
	
	var totalWidth = lnbWidth + contWidth

	$('.mapArea').animate({
		'left': totalWidth - 1
	},100);

	var minWidth = 964 - contWidth
	$('.mapArea').css({'min-width':minWidth});

}


////////////////////////////////////////////////////////////////////////
// modal 레이어팝업 띄우기
var commonPopup = function(url, param, width){
	var eWidth = width; //레이어 팝업의  width 강제설정
	
	if(width == null){
		eWidth = '';
	}else if (width == 'full'){
		eWidth = '96%';
	}else{
		eWidth = width;
	}	
	
	$.ajax({
		type : "get",
		url : url,
		data : param,
		async: true,
		success : function(data) {
			$("#modalPopup").html(data);
		},		
		complete : function(){
			$('#modalPopup').modal().find('.modal-dialog').css({
				'width': eWidth
			});
		}
	});	
};

// modal위에서 modal 레이어팝업 띄울때
var commonPopup2 = function(url, param, width){
	var eWidth = width; //레이어 팝업의  width 강제설정
	
	if(width == null){
		eWidth = '';
	}else if (width == 'full'){
		eWidth = '96%';
	}else{
		eWidth = width;
	}	
	
	$.ajax({
		type : "get",
		url : url,
		data : param,
		async: true,
		success : function(data) {
			$("#modalPopup2").html(data);
		},		
		complete : function(){
			$('#modalPopup2').modal().find('.modal-dialog').css({
				'width': eWidth
			});
		}
	});	
};

// modal layerpopup window기준 max-height 재설정 // modal-body에 스크롤 생성
var setModalMaxHeight = function(element) {
	this.$element     = $(element);  
	this.$content     = this.$element.find('.modal-content');
	var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
    var dialogMargin  = $(window).width() < 768 ? 20 : 60;
    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
    var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
    var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
    var maxHeight     = contentHeight - (headerHeight + footerHeight);

	this.$content.css({
		'overflow': 'hidden'
	});
  
	this.$element
		.find('.modal-body').css({
			'max-height': maxHeight,
			'overflow-y': 'auto'
	});
}


////////////////////////////////////////////////////////////////////////
// window resize시 액션
$(window).resize(function() {
	if ($('.modal.in').length != 0) {
		setModalMaxHeight($('.modal.in'));
	}
});


