$(function() {

	// 输入券号核销折叠js01
	// $('.chose-flag').click(function(event) {
	// var ht=$(this).parents('.tikes-sales').height();
	// if(ht<=40){
	// 	$(this).parents('.tikes-sales').css('height', '232px');
	// 	$(this).children().removeClass('fold fold-gray').addClass('open open-green');
	// }else{
	// 	$(this).parents('.tikes-sales').css('height', '40px');
	// 	$(this).children().removeClass('open open-green').addClass('fold fold-gray');
	// }
	// });

	// 输入券号核销折叠js02
		$('.chose-flag').click(function(event) {
			$(this).parents('.tikes-sales').children('dd').slideToggle(300);
			if($(this).children().hasClass('fold')){
				$(this).children().removeClass('fold fold-green').addClass('open open-green');
				$(this).parents('.tikes-sales').children('.sales-first').css('border-bottom-width', '0px');
			}else{
				$(this).children().removeClass('open open-green').addClass('fold fold-green');
				$(this).parents('.tikes-sales').children('.sales-first').css('border-bottom-width', '1px');
			}
		});

	//关闭弹层
	$('.pop').click(function(event) {
		event.preventDefault();
		$(this).fadeOut(300);
		$('.track-pop-mask').hide();
	});

	$('.bottom-menu li').click(function(event) {
		$(this).addClass('current').siblings('li').removeClass('current');
	});






});