function roulette(data) {
	var duration = 5000; // 돌아가는 시간
	var pieAngle = 360 * 5; // 전체 돌아가는 각도(5바퀴)
	var r = 0;
	var angle = 0;

    switch (data) {
        case 1:
		    r = Math.floor(Math.random() * 40) + 11; // 상품 위치에 대한 랜덤값
	    case 2:
		    r = Math.floor(Math.random() * 40) + 251; // 상품 위치에 대한 랜덤값
        case 3:
		    r = Math.floor(Math.random() * 40) + 131; // 상품 위치에 대한 랜덤값
        case 4:
		    r = Math.floor(Math.random() * 40) + 191; // 상품 위치에 대한 랜덤값
        case 5:
		    r = Math.floor(Math.random() * 40) + 71; // 상품 위치에 대한 랜덤값
        case 6:
		    r = Math.floor(Math.random() * 40) + 311; // 상품 위치에 대한 랜덤값
    }
	angle = (pieAngle - r); // 전체 각도에서 랜덤값을 빼 원하는 상품위치에 멈추도록 설정

	$(".roulette").rotate({
		duration: duration,
		animateTo: angle,
		callback: roulette()
		}
	});
}


