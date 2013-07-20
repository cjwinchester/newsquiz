// start count of correct answers at zero
var correct = 0;

var red = {
        backgroundColor: "red",
        color: "white",
        padding: "2px",
        borderRadius: "2px"
        };

var green = {
        backgroundColor: "green",
        color: "white",
        padding: "2px",
        borderRadius: "2px"
        };
        
var dud = {
backgroundColor: "#ccc",
cursor: "default"
};

function getScore () {

var total = ($(":radio").length / 4);
var checked = $(":radio:checked").length;
var unchecked = total - checked;

// disable the button
$('.score').css(dud);

// highlight the correct answers
if (($(":radio").val()) == 1) {$(".frank").css(green);};

// loop through the checked buttons and add up the values
$(":radio:checked").each(function() {
correct += parseFloat($(this).val());
if (($(this).val()) == 1) {$(this).siblings().css(green);} else {$(this).siblings().css(red);};
});

// disable the radio buttons
$(":radio").each(function() {
var radioName = $(this).attr("name");
$(":radio[name='"+radioName+"']").attr("disabled", true);
});

// grab the percentage, or use zero if none was selected
if (checked !== 0) {correctpct = (correct / checked) * 100} else {correctpct = 0};

// nag them about unanswered questions, swap in AP-style numbers
if (unchecked == 0) {remainder = ''} else {remainder = ' (you left ' + (unchecked.toString()).replace("1","one").replace("2","two").replace("3","three").replace("4","four").replace("5","five").replace("6","six").replace("7","seven").replace("8","eight").replace("9","nine") + ' blank)'};

// prepend results to modal div
$('#modal').prepend('<h4>Your score: ' + parseInt(correctpct) + '&#37;' + remainder  + '</h4>');

// show the modal
$('#modal').show(300);

// reset the counter
correct = 0;

// break down and rebuild the Twitter button to customize data-text content
    $('#tweetBtn iframe').remove();
    var tweetBtn = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', 'http://omaha.com')
        .attr('data-count', 'none')
        .attr('data-text', 'I scored ' + parseInt(correctpct) + '% on this week\'s @OWHnews quiz:' );
    $('#tweetBtn').append(tweetBtn);
    twttr.widgets.load();
    
// kill submit button function
$('.score').attr('onclick','');
   
   }

function reset() {

// re-establish submit button function
$('.score').attr('onclick','getScore()');

// the css to make submit button pretty again
var undud = {
backgroundColor: "#006CBD",
cursor: "pointer"
};

// strip the highlights
$(".answer").attr("style", '');

// re-enable the buttons
$(":radio").removeAttr("disabled").removeAttr("checked");

// hide the modal and re-insert the close button
$('#modal').hide('slow');
$('#modal').html('<div class="closeout">&#10006;</div>');
$('.score').css(undud);
};

function hide() {
$('#modal').hide();
$('#modal').html('<div class="closeout">&#10006;</div>');
}

// fade in the button that takes you to the top
$(function() {
	$(window).scroll(function() {
	if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
 
	$('#toTop').click(function() {
		$('body,html').animate({scrollTop:0},200);
	});	
});
