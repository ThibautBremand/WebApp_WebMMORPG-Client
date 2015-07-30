_.mixin(_.str.exports());
var params;
// Cache images
var images = {};
var cptDraw = 0;
var TIMER = 0;

function generate(char, json) {
    params = jQuery.parseJSON(json);
    console.log (params)
    //interpretParams();
    var newCanvas = document.createElement("canvas");
    document.body.appendChild(newCanvas);
    redraw(char, newCanvas);
}

function countProperties(obj) {
  var prop;
  var propCount = 0;

  for (prop in obj) {
    propCount++;
  }
  return propCount;
}

// Change checkboxes based on parameters
function interpretParams() {
    $("input[type=radio]").each(function() {
        var words = _.words($(this).attr('id'), '-');
        var initial = _.initial(words).join('-');
        $(this).prop("checked", $(this).attr("checked") || params[initial] == _.last(words));
    });
    $("input[type=checkbox]").each(function() {
        $(this).prop("checked", _.toBool(params[$(this).attr('id')]));
    });
}

// called each time redrawing
function redraw(char, canvasChar) {
    //var canvasChar = $("#charLoader").get(0);

    // If an oversize element is being used, expand canvas,
    // otherwise return it to normal size
    oversize = false;        
    if (oversize) {
        canvasChar.width = 1536;
        canvasChar.height = 1344 + 768;
    } else {
        canvasChar.width = 832;
        canvasChar.height = 1344;
    }
    var ctx = canvasChar.getContext("2d");

    // start over
    ctx.clearRect(0, 0, canvasChar.width, canvasChar.height);
    
    // determine if an oversize element is being used
    /*oversize = $("input[type=radio]:checked").filter(function() {
        return $(this).data("oversize");
    }).length > 0;*/

    $("#chooser>ul").css("height", canvasChar.height);
    oversize = !!oversize;
    
    // non oversize elements
    /*$("input[type=radio]:checked, input[type=checkbox]:checked").filter(function() {
        return !$(this).data("oversize");
    }).each(function(index) {*/

        // save this in closure
        var $this = $(this);
    
        // Determine if male or female selected
        if ( params.sex == "female" ) {
            var isMale = false;
            var isFemale = true;
        }
        else if ( params.sex === undefined ) {
            var isMale = true;
            var isFemale = false;            
        }
        
        // if data-file specified
        /*if ($(this).data("file")) {
            var img = getImage($(this).data("file"), char, canvasChar);
            
            // if data-behind specified, draw behind existing pixels
            if ($(this).data("behind")) {
                ctx.globalCompositeOperation = "destination-over";
                drawImage(ctx, img);
                ctx.globalCompositeOperation = "source-over";
            } else
                drawImage(ctx, img);
        }*/
        
        // if data-file_behind specified
        /*if ($(this).data("file_behind")) {
            var img = getImage($(this).data("file_behind"), char, canvasChar);
            ctx.globalCompositeOperation = "destination-over";
            drawImage(ctx, img);
            ctx.globalCompositeOperation = "source-over";
        }*/
        
        // Deal with shield/chain hat overlap issue
        /*if ($(this).data("file_hat") && $("#hat_chain").prop("checked")) {
            var img = getImage($(this).data("file_hat"), char, canvasChar);
            drawImage(ctx, img);
        }
        if ($(this).data("file_no_hat") && !$("#hat_chain").prop("checked")) {
            var img = getImage($(this).data("file_no_hat"), char, canvasChar);
            drawImage(ctx, img);
        }*/
        
        // if data-file_male and data-file_female is specified
        /*if (isMale) {
            var img = getImage($(this).data("file_male"), char, canvasChar);
            drawImage(ctx, img);
        }
        if (isFemale) {
            var img = getImage($(this).data("file_female"), char, canvasChar);
            drawImage(ctx, img);
        }*/
        
        // if data-file_male_light... and data-file_female_light... is specified
        //var bodytypes = ["light", "dark", "dark2", "tanned", "tanned2", "darkelf", "darkelf2"];
        if (isMale) {
            /*_.each(bodytypes, function(bodytype) {
                if ($("#body-" + bodytype).prop("checked") && $this.data("file_male_" + bodytype)) {
                    var img = getImage($this.data("file_male_" + bodytype), char, canvasChar);
                    drawImage(ctx, img);
                }
            });*/
            //if ( $this.data("file_male_" + params.body) ) {
                //var img = getImage($this.data("file_male_" + params.body), char, canvasChar);
                var img = getImage(ctx, "body/male/" + params.body + ".png", char, canvasChar, "body/male/" + params.body + ".png", function() {
                    drawImage(ctx, img);
                    console.log("Body drawn")
                    char.image.src = canvasChar.toDataURL('image/png');
                    connectedCharsToDraw.splice(0, 1);
                    if ( connectedCharsToDraw.length > 0 ) {
                        generate(connectedCharsToDraw[0][0], connectedCharsToDraw[0][1]);
                    }
                });
                //getImage(ctx, img);
            //}
        }
        if (isFemale) {
            /*_.each(bodytypes, function(bodytype) {
                if ($("#body-" + bodytype).prop("checked") && $this.data("file_female_" + bodytype)) {
                    var img = getImage($this.data("file_female_" + bodytype), char, canvasChar);
                    drawImage(ctx, img);
                }
            });*/
            //if ( $this.data("file_female_" + params.body) ) {
                //var img = getImage($this.data("file_female_" + params.body), char, canvasChar);
                
                /* Body */
            var img = getImage(ctx, "body/female/" + params.body + ".png", char, canvasChar, function() {
                drawImage(ctx, img);
                drawEars(ctx, char, canvasChar, "female", function() {

                    drawEyes(ctx, char, canvasChar, "female", function() {

                        drawNose(ctx, char, canvasChar, "female", function() {

                            drawHair(ctx, char, canvasChar, "female", function() {

                                drawClothes(ctx, char, canvasChar, "female", function() {

                                    drawBracelet(ctx, char, canvasChar, function() {

                                        drawBracers(ctx, char, canvasChar, function() {

                                            drawGloves(ctx, char, canvasChar, function() {

                                                char.image.src = canvasChar.toDataURL('image/png');
                                                connectedCharsToDraw.splice(0, 1);
                                                if ( connectedCharsToDraw.length > 0 ) {
                                                    generate(connectedCharsToDraw[0][0], connectedCharsToDraw[0][1]);
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        }
                    /* Hair */
                    /*if (params.hair != null) {
                        var res = params.hair.split("_");
                        getImage(ctx, "hair/female/" + res[0] + "/" + res[1] + ".png", char, canvasChar, "hair/female/" + res[0] + "/" + res[1] + ".png");
                    }

                    /* Clothes */
                    /*if (params.clothes != null) {
                        if ( params.clothes == "brown_pirate" || 
                        params.clothes == "brown_sleeveless" || 
                        params.clothes == "maroon_pirate" || 
                        params.clothes == "maroon_sleeveless" || 
                        params.clothes == "teal_pirate" || 
                        params.clothes == "teal_sleeveless" || 
                        params.clothes == "white_pirate" || 
                        params.clothes ==  "white_sleeveless") {
                            getImage(ctx, "torso/shirts/sleeveless/female/" + params.clothes + ".png", char, canvasChar, "torso/shirts/sleeveless/female/" + params.clothes + ".png");
                        }
                    }

                    /* Bracelet */
                    /*if (params.bracelet != null) {
                        if (params.bracelet == "on") {
                            getImage(ctx, "hands/bracelets/bracelet.png", char, canvasChar, "hands/bracelets/bracelet.png");
                        }
                    }

                    /* Bracers */
                    /*if (params.bracers != null) {
                        if (params.bracers == "cloth_bracers_female" ||
                        params.bracers == "leather_bracers_female" ||
                        params.bracers == "white_cloth_bandages" ||
                        params.bracers == "white_cloth_bracers" ) {
                            getImage(ctx, "hands/bracers/female/" + params.bracers + ".png", char, canvasChar, "hands/bracers/female/" + params.bracers + ".png");
                        }
                    }

                    char.image.src = canvasChar.toDataURL('image/bmp');
                });
            //}
        }
        
        // Draw shadows for plain or ponytail2 hairstyles appropriate to body color
        var id = $(this).attr("id");
        if (_.startsWith(id, "hair-")) {
            var style = id.substring(5, id.indexOf("-", 5));
            $("input[type=radio]:checked").filter(function() {
                return $(this).attr("id").substr(0, 5) == "body-";
            }).each(function() {
                var hsMale = "hs_" + style + "_male";
                var hsFemale = "hs_" + style + "_female";
                if (isMale && $(this).data(hsMale)) {
                    var img = getImage($(this).data(hsMale), char, canvasChar)
                    drawImage(ctx, img);
                }
                if (isFemale && $(this).data(hsFemale)) {
                    var img = getImage($(this).data(hsFemale), char, canvasChar)
                    drawImage(ctx, img);
                }
            });
        }
    //});
    
    // Oversize weapons: Copy existing canvas poses to new locations
    // with 192x192 padding rather than 64x64
    // data-oversize="1" means thrust weapon
    // data-oversize="2" means slash weapon
    // use appropriate thrust or slash pose
    /*if (oversize) {
        $("input[type=radio]:checked").filter(function() {
            return $(this).data("oversize");
        }).each(function(index) {
            var type = $(this).data("oversize");
            if (type == 1) {
                for (var i = 0; i < 8; ++i)
                    for (var j = 0; j < 4; ++j) {
                        var imgData = ctx.getImageData(64 * i, 264 + 64 * j, 64, 64);
                        ctx.putImageData(imgData, 64 + 192 * i, 1416 + 192 * j);
                    }
                if ($(this).data("file")) {
                    var img = getImage($(this).data("file"), char, canvasChar);
                    ctx.drawImage(img, 0, 1344);
                }
            } else if (type == 2) {
                for (var i = 0; i < 6; ++i)
                    for (var j = 0; j < 4; ++j) {
                        var imgData = ctx.getImageData(64 * i, 776 + 64 * j, 64, 64);
                        ctx.putImageData(imgData, 64 + 192 * i, 1416 + 192 * j);
                    }
                if ($("#sex-male").prop("checked") && $(this).data("file_male")) {
                    var img = getImage($(this).data("file_male"), char, canvasChar);
                    ctx.drawImage(img, 0, 1344);
                }
                if ($("#sex-female").prop("checked") && $(this).data("file_female")) {
                    var img = getImage($(this).data("file_female"), char, canvasChar);
                    ctx.drawImage(img, 0, 1344);
                }
            }
        });
    }*/
    
    // Clear everything if illegal combination used
    // Probably should try to prevent this
    /*$("input[type=radio], input[type=checkbox]").each(function(index) {
        if ($(this).data("required")) {
            var requirements = $(this).data("required").split(",");
            var passed = true;
            _.each(requirements, function(req) {
                var requirement = req.replace("=", "-");
                if (!$("#" + requirement).prop("checked"))
                    passed = false;
            });
            if (passed)
                $(this).prop("disabled", false);
            else {
                $(this).prop("disabled", true);
                if ($(this).prop("checked"))
                    ctx.clearRect(0, 0, canvasChar.width, canvasChar.height);
            }
        }
        if ($(this).data("prohibited")) {
            var requirements = $(this).data("prohibited").split(",");
            var passed = true;
            _.each(requirements, function(req) {
                var requirement = req.replace("=", "-");
                if ($("#" + requirement).prop("checked"))
                    passed = false;
            });
            if (passed)
                $(this).prop("disabled", false);
            else {
                $(this).prop("disabled", true);
                if ($(this).prop("checked"))
                    ctx.clearRect(0, 0, canvasChar.width, canvasChar.height);
            }
        }
    });
    if ( cptDraw >= countProperties(params) - 2 ) {
        //Canvas2Image.saveAsPNG(canvasChar);
        char.image.src = canvasChar.toDataURL('image/bmp');
        cptDraw = 0;
    }

    else {
        cptDraw ++;
    }*/

}

function drawEars(ctx, char, canvasChar, sex, callback) {
    var skinColor = "";
    if ( params.body != null ) {
        skinColor = params.body;
    }
    else {
        skinColor = "light";
    }
    if (params.ears != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.ears.split("_");
        switch(res[0]) {
            case "big":
                imgUrl = "body/" + sex + "/ears/";
                imgName = "bigears_" + skinColor;
                break; 
            case "elven":
                imgUrl = "body/" + sex + "/ears/";
                imgName = "elvenears_" + skinColor;
                break; 
        }
        var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawEyes(ctx, char, canvasChar, sex, callback) {
    if (params.eyes != null) {
        var img = getImage(ctx, "body/" + sex + "/eyes/" + params.eyes + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawNose(ctx, char, canvasChar, sex, callback) {
    var skinColor = "";
    if ( params.body != null ) {
        skinColor = params.body;
    }
    else {
        skinColor = "light";
    }
    if (params.nose != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.nose.split("_");
        switch(res[0]) {
            case "big":
                imgUrl = "body/" + sex + "/nose/";
                imgName = "bignose_" + skinColor;
                break; 
            case "button":
                imgUrl = "body/" + sex + "/nose/";
                imgName = "buttonnose_" + skinColor;
                break; 
            case "straight":
                imgUrl = "body/" + sex + "/nose/";
                imgName = "straightnose_" + skinColor;
                break; 
        }
        var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawHair(ctx, char, canvasChar, sex, callback) {
    if (params.hair != null) {
        var res = params.hair.split("_");
        var img = getImage(ctx, "hair/" + sex + "/" + res[0] + "/" + res[1] + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawClothes(ctx, char, canvasChar, sex, callback) {
    if (params.clothes != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.clothes.split("_");
        switch(res[0]) {
            // Jacket
            case "jacket":
                if (params.clothes == "tabard") {
                    imgUrl = "torso/chain/tabard/";
                    imgName = "jacket_" + sex;
                }
                break; 
            // Mail
            case "mail":
                if (params.clothes == "chain") {
                    imgUrl = "torso/chain/";
                    imgName = "mail_" + sex;
                }
                break;             
            // Clothes
            case "clothes":
                if (params.clothes == "dress_sash") { // (dress_female)
                    imgUrl = "torso/dress_female/";
                    imgName = "dress_w_sash_female";
                }
                break; 
            // Gown (dress_female)
            case "gown":
                if (params.clothes == "underdress") {
                    imgUrl = "torso/dress_female/";
                    imgName = "underdress";
                }
                if (params.clothes == "overskirt") {
                    imgUrl = "torso/dress_female/";
                    imgName = "overskirt";
                }
                if (params.clothes == "blue-vest") {
                    imgUrl = "torso/dress_female/";
                    imgName = "blue-vest";
                }
                break; 
            // Robe
            case "robe":
                imgUrl = "torso/robes_female_no_th-sh/";
                imgName = res[1];
                break;            
            // Shirts
            case "pirate":
                imgUrl = "torso/shirts/sleeveless/" + sex + "/";
                imgName = res[1] + "_" + res[0];
                break;
            case "sleeveless":
                imgUrl = "torso/shirts/sleeveless/" + sex + "/";
                imgName = res[1] + "_" + res[0];
                break;
            case "longsleeve":
                imgUrl = "torso/shirts/longsleeve/" + sex + "/";
                imgName = res[1] + "_" + res[0];
                break;
            // Tunics
            case "tunic":
                imgUrl = "torso/tunics/" + sex + "/";
                imgName = res[1] + "_" + res[0];
                break;
        }

        if ( imgUrl != "" ) {
            var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
                drawImage(ctx, img);
                callback();
            });
        }  
        else {
            callback();
        } 
    }
    else {
        callback();
    }
}

function drawBracelet(ctx, char, canvasChar, callback) {
    if (params.bracelet != null) {
        if (params.bracelet == "on") {
            var img = getImage(ctx, "hands/bracelets/bracelet.png", char, canvasChar, function() {
                drawImage(ctx, img);
                callback();
            });
        }
    }
    else {
        callback();
    }
}

function drawBracers(ctx, char, canvasChar, callback) {
    if (params.bracers != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.bracers.split("_");
        if ( res[0] == "leather" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_bracers_" + sex;
            break;
        }
        else if ( res[1] == "cloth" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_cloth_" + res[2];
            break;
        }
        else if ( res[0] == "cloth" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_bracers_" + sex;
            break;            
        }
        var img = getImage(ctx, "hands/bracers/" + sex + "/" + params.bracers + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawGloves(ctx, char, canvasChar, callback) {
    if (params.gloves != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.bracers.split("_");
        if ( res[0] == "golden" ) {
            imgUrl = "hands/gloves/" + sex + "/";
            imgName = res[0] + "_gloves_" + sex;
            break;
        }
        else if ( res[1] == "metal" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_gloves_" + sex;
            break;
        }
        var img = getImage(ctx, "hands/gloves/" + sex + "/" + params.bracers + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

/*drawTrucs

            // Chest
            case "chest":
                    imgUrl = "torso/" + res[1] + "/";
                    imgName = "chest_" + sex;
                    break;
            // Shoulders
            case "shoulders":
                    imgUrl = "torso/" + res[1] + "/";
                    imgName = "spikes_" + sex;
                    break; 
            // Spikes
            case "spikes":
                    imgUrl = "torso/" + res[1] + "/";
                    imgName = "spikes_" + sex;
                    break;   

*/


function getImage(ctx, imgRef, char, canvasChar, callback) {
    //if (images[imgRef]) {}
        //return images[imgRef];
    //else {
        // Load image if not in cache
        var img = new Image();
        img.src = "sprites/Universal-LPC-Spritesheet-Character-Generator/Universal-LPC-spritesheet/" + imgRef;
        //img.onload = function() { redraw(char, canvasChar); }
        img.onload = callback;
        images[imgRef] = img;
        return img;
    //}
}

// Do not stop running all javascript if image not available
function drawImage(ctx, img) {
    try {
        ctx.drawImage(img, 0, 0);
    } catch(err) {
        console.error("Error: could not find " + img.src);
    }
}

$(document).ready(function() {

    // Get querystring paramters
    //var params = jHash.val();
    
    // on hash (url) change event, interpret and redraw

    /*jHash.change(function() {
        params = jHash.val();
        interpretParams();
        redraw();
    });*/

    // set params and redraw when any radio button or checkbox is clicked on
    /*$("input[type=radio], input[type=checkbox]").each(function() {
        $(this).click(function() {
            setParams();
            redraw();
        });
    });*/
    
    // When radio button is unchecked, its children should be too. 
    /*$("input[type=radio]").each(function() {
        $(this).change(function() {
            var name = $(this).attr("name");
            // Sadly we need to use setTimeout
            window.setTimeout(function() {
                $("li>span>input[name=" + name + "]").each(function() {
                    if (!($(this).prop("checked"))) {
                        var $this = $(this).parent();
                        $this.removeClass("expanded").addClass("condensed");
                        $this = $this.parent();
                        var $ul = $this.children("ul");
                        $ul.hide('slow');
                        $ul.find("input[type=checkbox]").each(function() {
                            $(this).prop("checked", false);
                        });
                    }
                });
                redraw();
            }, 0);
        });
    });*/
    
    // Do not multiple toggle when clicking on children
    /*$("#chooser>ul>li>ul>li>ul>li").click(function(event) {
        event.stopPropagation();
    });*/
    
    // Toggle display of a list elements children when clicked
    // Do not do so twice, once on label then on input
    // Again, do not multiple toggle when clicking on children
    /*$("#chooser>ul>li>ul>li").click(function(event) {
        if (!($(event.target).get(0).tagName == "LABEL")) {
            $(this).children("span").toggleClass("condensed").toggleClass("expanded");
            var $ul = $(this).children("ul");
            $ul.toggle('slow').promise().done(drawPreviews);
        }
        event.stopPropagation();
    });*/
    
    // Toggle display of a list elements children when clicked
    // Again, do not multiple toggle when clicking on children
    /*$("#chooser>ul>li").click(function(event) {
        $(this).children("span").toggleClass("condensed").toggleClass("expanded");
        var $ul = $(this).children("ul");
        $ul.toggle('slow').promise().done(drawPreviews);
        event.stopPropagation();
    });*/
    
    // When clicking on collapse all link, collapse all uls in #chooser
    /*$("#collapse").click(function() {
        $("#chooser>ul ul").hide('slow');
        $("#chooser>ul span.expanded").removeClass("expanded").addClass("condensed");
    });*/
    
    // Redraw afer reset
    /*$("input[type=reset]").click(function() {
        // Sadly we need to use setTimeout
        window.setTimeout(function() {
            params = {};
            jHash.val(params);
            redraw();
        }, 0, false);
    });*/
    
    /*var canvas = $("#spritesheet").get(0);
    var ctx = canvas.getContext("2d");*/
    
    // Save canvas as PNG
    /*$("#saveAsPNG").click(function() {
        Canvas2Image.saveAsPNG(canvasChar);
    });*/
    
    // Determine if an oversize element used
    /*var oversize = $("input[type=radio]").filter(function() {
        return $(this).data("oversize");
    }).length > 0;*/
    
    // Expand canvas if oversize element used
    /*if (oversize) {
        canvasChar.width = 1536;
        canvasChar.height = 1344 + 768;
    } else {
        canvasChar.width = 832;
        canvasChar.height = 1344;
    }
    $("#chooser>ul").css("height", canvasChar.height);*/
    
    // Set parameters in response to click on any radio button or checkbox
    function setParams() {
        $("input[type=radio]:checked").each(function() {
            var words = _.words($(this).attr('id'), '-');
            var initial = _.initial(words).join('-');
            if (!$(this).attr("checked") || params[initial]) {
                params[initial] = _.last(words);
            }
        });
        $("input[type=checkbox]").each(function() {
            if (_.toBool($(this).attr("checked")) != $(this).prop("checked") ||
                    _.toBool(params[$(this).attr('id')]) != $(this).prop("checked"))
                params[$(this).attr('id')] = $(this).prop("checked") ? 1 : 0;
        });
        jHash.val(params);
    }
    
    function getImage2(imgRef, callback) {
        if (images[imgRef]) {
            callback(images[imgRef]);
            return images[imgRef];
        } else {
        
            // Load image if not in cache
            var img = new Image();
            img.src = "Universal-LPC-spritesheet/" + imgRef;
            img.onload = function() { callback(img) };
            images[imgRef] = img;
            return img;
        }
    }
    
    // Draw now - on ready
    //interpretParams();
    /*if (Object.keys(params).length == 0) {
        $("input[type=reset]").click();
        setParams();
    }*/
    //redraw();    

    // Draw preview images
    /*function drawPreviews() {
        this.find("input[type=radio], input[type=checkbox]").filter(function() {
            return $(this).is(":visible");
        }).each(function() {
            if (!$(this).parent().hasClass("hasPreview")) {
                var prev = document.createElement("canvas");
                var oversize = $(this).data("oversize");
                if (!oversize) {
                    prev.setAttribute("width", 64);
                    prev.setAttribute("height", 64);
                } else {
                    prev.setAttribute("width", 192);
                    prev.setAttribute("height", 192);
                }
                var prevctx = prev.getContext("2d");
                var img = null;
                var previewRow = $(this).data("preview_row");
                if (!previewRow)
                    previewRow = 10;
                else
                    previewRow = parseInt(previewRow);
                var callback = function(img) {
                    try {
                        if (oversize)
                            prevctx.drawImage(img, 0, 2 * 192, 192, 192, 0, 0, 192, 192);
                        else
                            prevctx.drawImage(img, 0, previewRow * 64, 64, 64, 0, 0, 64, 64);
                    } catch (err) {
                        console.log(err);
                    }
                };
                if ($(this).data("file"))
                    img = getImage2($(this).data("file"), callback);
                else if ($(this).data("file_male"))
                    img = getImage2($(this).data("file_male"), callback);
                else if ($(this).data("file_female"))
                    img = getImage2($(this).data("file_female"), callback);
                else if ($(this).data("file_male_light"))
                    img = getImage2($(this).data("file_male_light"), callback);
                else if ($(this).data("file_no_hat"))
                    img = getImage2($(this).data("file_no_hat"), callback);
                if (img != null) {
                    this.parentNode.insertBefore(prev, this);
                    $(this).parent().addClass("hasPreview").parent().addClass("hasPreview");
                }
            }
        });
    };*/
    
});