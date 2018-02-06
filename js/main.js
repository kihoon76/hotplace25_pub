$(function() {
	
	var registry = new naver.maps.MapTypeRegistry();
				
	var map = new naver.maps.Map($('#map')[0], {
		//center: new naver.maps.LatLng(36.0207091, 127.9204629), //지도의 초기 중심 좌표(36.0207091, 127.9204629)
		center: cityhall,
		zoom: 10, //지도의 초기 줌 레벨
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

	///////////////////////////////////////////////////////////////
	// custom overlay 테스트
	var cityhall = new naver.maps.LatLng(37.5666805, 126.9784147);
	var marker = new naver.maps.Marker({
        map: map,
        position: cityhall
    });

	var contentString = [
        '<div class="mapInnerBox">',
        '   <div class="mibHeader">서울특별시 중구 세종대로 110 서울특별시청</div>',
        '   <div class="mibBody">',
		'		<div class="munuType">',
        '			<span class="link"><button type="button" class="mibIcon_01" onclick="javascript:mapInfowindowLink(this)" data-name="수지분석">수지분석</button></span>',
		'			<span class="link"><button type="button" class="mibIcon_02" onclick="javascript:mapInfowindowLink(this)" data-name="관심물건 등록">관심물건 등록</button></span>',
		'			<span class="link"><button type="button" class="mibIcon_03" onclick="javascript:mapInfowindowLink(this)" data-name="컨설팅 요청">컨설팅 요청</button></span>',
		'			<span class="link"><button type="button" class="mibIcon_04" onclick="javascript:mapInfowindowLink(this)" data-name="토지 이용 규제 현황 보기">토지 이용<br/>규제 현황 보기</button></span>',
		'		</div>',
        '   </div>',
        '</div>'
    ].join('');

	var infowindow = new naver.maps.InfoWindow({
		content: contentString,
		backgroundColor: "transparent",
		borderColor: "#666",
		borderWidth: 0,
		anchorSize: new naver.maps.Size(0, 0),
		anchorSkew: false,  
		pixelOffset: new naver.maps.Point(0, -12)
	});

	
	var HOME_PATH = window.HOME_PATH || '.';
	var marker = new naver.maps.Marker({
		position: cityhall,
		map: map,
		icon: {
			url: HOME_PATH + '/img/marker_search.png', //50, 68 크기의 원본 이미지
			size: new naver.maps.Size(25, 34),
			scaledSize: new naver.maps.Size(25, 34),
			origin: new naver.maps.Point(0, 0),
			anchor: new naver.maps.Point(12, 34)
		}
	});

	naver.maps.Event.addListener(marker, "click", function(e) {
		if (infowindow.getMap()) {
			infowindow.close();
		} else {
			infowindow.open(map, marker);
		}
	});	


	////////////////////////////////////////////
	var acceptbuildingMarker = new naver.maps.Marker({
		position: new naver.maps.LatLng(37.5620005, 126.9704147),
		map: map,
		title: '건축허가',
		icon: {
			content:'<img src="'+ HOME_PATH +'/img/marker/acceptbuilding.png" alt="" ' +
                 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
                 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
			size: new naver.maps.Size(22, 33),
			anchor: new naver.maps.Point(11, 33),
		}
	});

	var  acceptbuildingStr = [
        '<div class="mapInnerBox">',
        '   <div class="mibHeader">서울특별시 중구 세종대로 110 서울특별시청<input type="button" onclick="acceptbuildingHan()" value="X"></div>',
        '   <div class="mibBody">',
		'		<div class="munuType">',
        '			<span class="link"><button type="button" class="mibIcon_01" onclick="javascript:mapInfowindowLink(this)" data-name="수지분석">수지분석</button></span>',
		'			<span class="link"><button type="button" class="mibIcon_02" onclick="javascript:mapInfowindowLink(this)" data-name="관심물건 등록">관심물건 등록</button></span>',
		'			<span class="link"><button type="button" class="mibIcon_03" onclick="javascript:mapInfowindowLink(this)" data-name="컨설팅 요청">컨설팅 요청</button></span>',
		'			<span class="link"><button type="button" class="mibIcon_04" onclick="javascript:mapInfowindowLink(this)" data-name="토지 이용 규제 현황 보기">토지 이용<br/>규제 현황 보기</button></span>',
		'		</div>',
        '   </div>',
        '</div>'
    ].join('');
;
	//건축허가 윈도우 창
	var acceptbuildingInfowindow = new naver.maps.InfoWindow({
		content: acceptbuildingStr,
		backgroundColor: "transparent",
		borderColor: "#666",
		borderWidth: 0,
		anchorSize: new naver.maps.Size(0, 0),
		anchorSkew: false,  
		pixelOffset: new naver.maps.Point(0, -12)
	});

	
	window.acceptbuildingHan = function() {
			if (acceptbuildingInfowindow.getMap()) {
				acceptbuildingInfowindow.close();
			} else {
				acceptbuildingInfowindow.open(map, acceptbuildingMarker);
			}
		
	}

	//건축허가 마커 클릭 이벤트
	naver.maps.Event.addListener(acceptbuildingMarker, "click",window.acceptbuildingHan);	

	var bosangMarker = new naver.maps.Marker({
		position: new naver.maps.LatLng(37.5620005, 126.9734147),
		map: map,
		title: '보상물건',
		icon: {
			content:'<img src="'+ HOME_PATH +'/img/marker/bosang.png" alt="" ' +
                 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
                 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
			size: new naver.maps.Size(22, 33),
			anchor: new naver.maps.Point(11, 33),
		}
	});

	var gongmaeMarker = new naver.maps.Marker({
		position: new naver.maps.LatLng(37.5620005, 126.9764147),
		map: map,
		title: '공매',
		icon: {
			content:'<img src="'+ HOME_PATH +'/img/marker/gongmae.png" alt="" ' +
                 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
                 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
			size: new naver.maps.Size(22, 33),
			anchor: new naver.maps.Point(11, 33),
		}
	});

	var gyeongmaeMarker = new naver.maps.Marker({
		position: new naver.maps.LatLng(37.5620005, 126.9794147),
		map: map,
		title: '경매',
		icon: {
			content:'<img src="'+ HOME_PATH +'/img/marker/gyeongmae.png" alt="" ' +
                 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
                 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
			size: new naver.maps.Size(22, 33),
			anchor: new naver.maps.Point(11, 33),
		}
	});

	var pyeonibMarker = new naver.maps.Marker({
		position: new naver.maps.LatLng(37.5620005, 126.9824147),
		map: map,
		title: '편입물건',
		icon: {
			content:'<img src="'+ HOME_PATH +'/img/marker/pyeonib.png" alt="" ' +
                 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
                 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
			size: new naver.maps.Size(22, 33),
			anchor: new naver.maps.Point(11, 33),
		}
	});

	var silgeolaeMarker = new naver.maps.Marker({
		position: new naver.maps.LatLng(37.5620005, 126.9854147),
		map: map,
		title: '실거래가',
		icon: {
			content:'<img src="'+ HOME_PATH +'/img/marker/silgeolae.png" alt="" ' +
                 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
                 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
			size: new naver.maps.Size(22, 33),
			anchor: new naver.maps.Point(11, 33),
		}
	});

	////////////////////////////////////////////


	///////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////

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

	//거리뷰
	$('#btnStreetView').on('click', function() {
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


	//Bootstrap tabs 이벤트
	$('button[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
	});

	
	
});

///////////////////////////////////////////////////////////////
//map 마커 infoWindow 내부 링크클릭 테스트
var mapInfowindowLink = function(obj){
	var $this     = $(obj);
	var	linkName = $this.data('name');

	if (linkName == '수지분석'){
		alert('퍼블리싱 진행중입니다');
		//commonPopup('z_modalTest_full.html', '', 'full');
	} 
	else if (linkName == '관심물건 등록'){
		commonPopup('10_02_cateGwansim.html', '', '500');
	}
	else if (linkName == '컨설팅 요청'){
		commonPopup('10_03_consultRequest.html', '', '500');
	}
	else if (linkName == '토지 이용 규제 현황 보기'){
		commonPopup('10_04_tojiUseRegul.html', '', '1000');
	}
	
}
///////////////////////////////////////////////////////////////

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

	lnbContBodyAreaSet();
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

// 좌메뉴 컨텐츠 하단 footerEtcText 있을시 해당 bodyArea의 bottom재설정
var lnbContBodyAreaSet = function(){
	if ($('.footerEtcText').length != 0){
		$('.footerEtcText').each(function() {
			var thisBody = $(this).parents('.lnbContWrap').find('.bodyArea');
			var footerH = $(this).parents('.lnbContWrap').find('.footArea').outerHeight();;
			var thisH = $(this).outerHeight();

			thisBody.css({'bottom': thisH + footerH});
		});
	}
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
			$('#modalPopup').removeClass('in').data('bs.modal', null);
			$('#modalPopup')
			.modal({
				backdrop: 'static', 
				keyboard: false
			})
			.find('.modal-dialog')
			.css({
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
			$('#modalPopup2').removeClass('in').data('bs.modal', null);
			$('#modalPopup2')
			.modal({
				backdrop: 'static', 
				keyboard: false
			})
			.find('.modal-dialog')
			.css({
				'width': eWidth
			});
		}
	});	
};

// alert modal 레이어팝업 띄울때
var alertPopup = function(url, param, width){
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
			$("#alrtPopup").html(data);
		},		
		complete : function(){
			$('#alrtPopup').removeClass('in').data('bs.modal', null);
			$('#alrtPopup')
			.modal({
				backdrop: 'static', 
				keyboard: false
			})
			.find('.modal-dialog')
			.css({
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


