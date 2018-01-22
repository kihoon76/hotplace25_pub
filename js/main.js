$(function() {
	
	var registry = new naver.maps.MapTypeRegistry();
				
	var map = new naver.maps.Map($('#map')[0], {
		center: new naver.maps.LatLng(36.0207091, 127.9204629), //지도의 초기 중심 좌표(36.0207091, 127.9204629)
		zoom: 3, //지도의 초기 줌 레벨
		mapTypes: registry,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: naver.maps.MapTypeControlStyle.BUTTON,
			position: naver.maps.Position.TOP_RIGHT
		},
		minZoom: 3,
		logoControl: false,
		disableDoubleClickZoom: true
	});
	
	map.mapTypes.set(naver.maps.MapTypeId.NORMAL, naver.maps.NaverMapTypeOption.getNormalMap());
	map.mapTypes.set(naver.maps.MapTypeId.HYBRID, naver.maps.NaverMapTypeOption.getHybridMap());
	
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


	$('#dvIntro').hide();
	$('#dvTimeview').hide();
});

// 우측 버튼 active 관련
function showRightBtn(onOff, $btn) {		  
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
function showTimeviewLayer(onOff, $btn) {		  
	if(onOff == 'on') {
		$('#dvTimeview').hide();
	}
	else if(onOff == 'off') {
		$('#dvTimeview').show();
		$('#dvYearRange').rangeSlider('resize');
	}
}

//좌 검색영역 height 계산
