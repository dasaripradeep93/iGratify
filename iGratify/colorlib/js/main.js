(function ($) {
    // USE STRICT
    "use strict";

    $(".form-radio .radio-item").click(function(){
        //Spot switcher:
        $(this).parent().find(".radio-item").removeClass("active");
        $(this).addClass("active");
    });
  
    $('#course_type').parent().append('<ul class="list-item" id="newcourse_type" name="course_type"></ul>');
    $('#course_type option').each(function () {
        console.log($(this).val());
        $('#newcourse_type').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
    });
    $('#course_type').remove();
    $('#newcourse_type').attr('id', 'course_type');
    $('#course_type li').first().addClass('init');
    $("#course_type").on("click", ".init", function() {
        $(this).closest("#course_type").children('li:not(.init)').toggle('slow');
    });

    $('#profession').parent().append('<ul class="list-item" id="newprofession" name="profession"></ul>');
    $('#profession option').each(function(){
        $('#newprofession').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
    });
    $('#profession').remove();
    $('#newprofession').attr('id', 'profession');
    $('#profession li').first().addClass('init');
    $("#profession").on("click", ".init", function() {
        $(this).closest("#profession").children('li:not(.init)').toggle('slow');
    });
    
    $('#domain').parent().append('<ul class="list-item" id="newdomain" name="domain"></ul>');
    $('#domain option').each(function(){
        $('#newdomain').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
    });
    $('#domain').remove();
    $('#newdomain').attr('id', 'domain');
    $('#domain li').first().addClass('init');
    $("#domain").on("click", ".init", function() {
        $(this).closest("#domain").children('li:not(.init)').toggle('slow');
    });

    $('#education').parent().append('<ul class="list-item" id="neweducation" name="education"></ul>');
    $('#education option').each(function(){
        $('#neweducation').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
    });
    $('#education').remove();
    $('#neweducation').attr('id', 'education');
    $('#education li').first().addClass('init');
    $("#education").on("click", ".init", function() {
        $(this).closest("#education").children('li:not(.init)').toggle('slow');
    });

    var allOptions = $("#course_type").children('li:not(.init)');
    $("#course_type").on("click", "li:not(.init)", function() {
        allOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#course_type").children('.init').html($(this).html());
        allOptions.toggle('slow');
    });

    var FoodOptions = $("#profession").children('li:not(.init)');
    $("#profession").on("click", "li:not(.init)", function() {
        FoodOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#profession").children('.init').html($(this).html());
        FoodOptions.toggle('slow');
    });

    var AppointmentOptions = $("#domain").children('li:not(.init)');
    $("#domain").on("click", "li:not(.init)", function() {
        AppointmentOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#domain").children('.init').html($(this).html());
        AppointmentOptions.toggle('slow');
    });

    var EducationOptions = $("#education").children('li:not(.init)');
    $("#education").on("click", "li:not(.init)", function () {
        EducationOptions.removeClass('selected');
        $(this).addClass('selected');
        $("#education").children('.init').html($(this).html());
        EducationOptions.toggle('slow');
    });
})(jQuery);