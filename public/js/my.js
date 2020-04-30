$(function()
{
	$('.my-dialog-open').on('click',function() 
    {
    	// $('.my-dialog-open').hide()
	    $('.my-dialog-box, .my-container-fullscreen').fadeIn()
	});
	$(".my-dialog-close").click(function(e)
	{
		$('.my-dialog-open').show()
		$('.my-dialog-box, .my-container-fullscreen').fadeOut()
	});
})