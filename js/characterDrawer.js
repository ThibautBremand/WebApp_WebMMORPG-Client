//_.mixin(_.str.exports());
var params;
// Cache images
var images = {};
var cptDraw = 0;
var TIMER = 0;

function generate(char, json) {
    params = jQuery.parseJSON(json);
    var newCanvas = document.createElement("canvas");
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

    $("#chooser>ul").css("height", canvasChar.height);
    oversize = !!oversize;

    // save this in closure
    var $this = $(this);

    // Determine if male or female selected
    var sex = "";
    if ( params.sex == "female" ) {
        var isMale = false;
        var isFemale = true;
        sex = "female";
    }
    else if ( params.sex === undefined ) {
        var isMale = true;
        var isFemale = false;
        sex = "male";            
    }

    drawBody(ctx, char, canvasChar, sex, function() {

    drawEars(ctx, char, canvasChar, sex, function() {

    drawEyes(ctx, char, canvasChar, sex, function() {

    drawNose(ctx, char, canvasChar, sex, function() {

    drawHair(ctx, char, canvasChar, sex, function() {

    drawCape(ctx, char, canvasChar, sex, function() { 

    drawArmor(ctx, char, canvasChar, sex, function() {  

    drawJacket(ctx, char, canvasChar, sex, function() { 

    drawTie(ctx, char, canvasChar, sex, function() {

    drawArms(ctx, char, canvasChar, sex, function() {

    drawShoulders(ctx, char, canvasChar, sex, function() {

    drawMail(ctx, char, canvasChar, sex, function() {

    drawGown(ctx, char, canvasChar, sex, function() {

    drawClothes(ctx, char, canvasChar, sex, function() {

    drawLegs(ctx, char, canvasChar, sex, function() {

    drawGreaves(ctx, char, canvasChar, sex, function() {

    drawFormal(ctx, char, canvasChar, sex, function() {

    drawBracelet(ctx, char, canvasChar, sex, function() {

    drawBracers(ctx, char, canvasChar, sex, function() {

    drawGloves(ctx, char, canvasChar, sex, function() {

    drawShoes(ctx, char, canvasChar, sex, function() {

    drawBelt(ctx, char, canvasChar, sex, function() {

    drawBuckle(ctx, char, canvasChar, sex, function() {

    drawNecklace(ctx, char, canvasChar, sex, function() {

    drawCapeacc(ctx, char, canvasChar, sex, function() {

    drawHat(ctx, char, canvasChar, sex, function() {

    drawWeapon(ctx, char, canvasChar, sex, function() {

    drawAmmo(ctx, char, canvasChar, sex, function() {

    drawShield(ctx, char, canvasChar, sex, function() {

    drawQuiver(ctx, char, canvasChar, sex, function() {

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
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
    });
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

function drawBody(ctx, char, canvasChar, sex, callback) {
    var body;
    if ( params.body == null ) {
        body = "light";
    }
    else {
        body = params.body;
    }
    var imgName = "body/" + sex + "/" + body + ".png"
    var img = getImage(ctx, imgName, char, canvasChar, function() {
        drawImage(ctx, img);
        callback();
    });
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
                imgName = res[0] + "ears_" + skinColor;
                break; 
            case "elven":
                imgUrl = "body/" + sex + "/ears/";
                imgName = res[0] + "ears_" + skinColor;
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
                imgName = res[0] + "nose_" + skinColor;
                break; 
            case "button":
                imgUrl = "body/" + sex + "/nose/";
                imgName = res[0] + "nose_" + skinColor;
                break; 
            case "straight":
                imgUrl = "body/" + sex + "/nose/";
                imgName = res[0] + "nose_" + skinColor;
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
        var imgName = "hair/" + sex + "/" + res[0] + "/" + res[1];
        if (res[2] != null) {
            imgName +=  "-" + res[2];
        }
        imgName +=  ".png";
        var img = getImage(ctx, imgName, char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawCape(ctx, char, canvasChar, sex, callback) {
    if (params.cape != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.cape.split("_");
        switch(res[0]) {
            case "tattered":
                imgUrl = "torso/back/cape/" + res[0] + "/" + sex + "/";
                imgName = "tattercape_" + res[1];
                break;
            case "trimmed":
                imgUrl = "torso/back/cape/" + res[0] + "/" + sex + "/";
                imgName = "trimcape_" + res[1];
                if ( res[2] != null ) {
                    imgName += res[2];
                }
                break;
            default:
                imgUrl = "torso/back/cape/normal/" + sex + "/";
                imgName = "cape_" + res[0];
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

function drawArmor(ctx, char, canvasChar, sex, callback) {
    if (params.armor != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.armor.split("_");
        switch(res[0]) {
            case "chest":
                imgUrl = "torso/" + res[1] + "/";
                imgName = "chest_" + sex;
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

function drawJacket(ctx, char, canvasChar, sex, callback) {
    if (params.jacket != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.jacket.split("_");
        switch(res[0]) {
            case "tabard":
                imgUrl = "torso/chain/" + res[0] + "/";
                imgName = "jacket_" + sex;
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

function drawTie(ctx, char, canvasChar, sex, callback) {
    if (params.tie != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.tie.split("_");
        switch(res[0]) {
            case "on":
                imgUrl = "formal_" + sex + "_no_th-sh/";
                imgName = "tie";
                break; 
            case "bow":
                imgUrl = "formal_" + sex + "_no_th-sh/";
                imgName = "bowtie";
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

function drawArms(ctx, char, canvasChar, sex, callback) {
    if (params.arms != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.arms.split("_");

        imgUrl = "torso/" + res[0] + "/";
        imgName = "arms_" + sex;

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

function drawShoulders(ctx, char, canvasChar, sex, callback) {
    if (params.shoulders != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.shoulders.split("_");
        switch(res[0]) {
            case "leather":
                imgUrl = "torso/" + res[0] + "/";
                imgName = "shoulders_" + sex;
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

function drawMail(ctx, char, canvasChar, sex, callback) {  
    if (params.mail != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.mail.split("_");
        switch(res[0]) {
            case "chain":
                imgUrl = "torso/" + res[0] + "/";
                imgName = "mail_" + sex;
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

function drawGown(ctx, char, canvasChar, sex, callback) {
    if (params.mail != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.mail.split("_");

        imgUrl = "torso/dress_female/";
        imgName = res[0];
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

function drawClothes(ctx, char, canvasChar, sex, callback) {
    if (params.clothes != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.clothes.split("_");
        switch(res[0]) {           
            // Clothes
            case "dress":
                if (res[1] == "sash") { // (dress_female)
                    imgUrl = "torso/dress_female/";
                    imgName = "dress_w_" + res[1] + "_female";
                }
                break; 
            // Robe
            case "robe":
                imgUrl = "torso/robes_" + sex + "_no_th-sh/";
                imgName = res[1];
                if ( res[2] != null ) {
                    imgName += " " + res[2];
                }
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

function drawLegs(ctx, char, canvasChar, sex, callback) {
    if ( params.legs != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.legs.split("_");
        switch(res[0]) {
            case "pants":
                imgUrl = "legs/pants/" + sex + "/";
                imgName = res[1] + "_" + res[0] + "_" + sex;
                break;
            case "robe":
                imgUrl = "legs/skirt/" + sex + "/";
                imgName = res[0] + "_" + res[1] + "_" + sex + "_incomplete";
                break;
            case "sara":
                imgUrl = "legs/pants/" + sex + "/";
                imgName = "SaraLeggings";
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

function drawGreaves(ctx, char, canvasChar, sex, callback) {
    if ( params.greaves != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.greaves.split("_");
        switch(res[0]) {
            case "metal":
                imgUrl = "legs/armor/" + sex + "/";
                imgName = res[0] + "_pants_" + sex;
                break;
            case "golden":
                imgUrl = "legs/armor/" + sex + "/";
                imgName = res[0] + "_greaves_" + sex;
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

function drawFormal(ctx, char, canvasChar, sex, callback) {
    if ( params.formal != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.legs.split("_");

        imgUrl = "formal_" + sex + "_no_th-sh/";
        imgName = res[0];
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

function drawBracelet(ctx, char, canvasChar, sex, callback) {
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

function drawBracers(ctx, char, canvasChar, sex, callback) {
    if (params.bracers != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.bracers.split("_");
        if ( res[0] == "leather" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_bracers_" + sex;
        }
        else if ( res[1] == "cloth" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_cloth_" + res[2];
        }
        else if ( res[0] == "cloth" ) {
            imgUrl = "hands/bracers/" + sex + "/";
            imgName = res[0] + "_bracers_" + sex;      
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

function drawGloves(ctx, char, canvasChar, sex, callback) {
    if (params.gloves != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.gloves.split("_");
        imgUrl = "hands/gloves/" + sex + "/";
        imgName = res[0] + "_gloves_" + sex;

        var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawShoes(ctx, char, canvasChar, sex, callback) {
    if (params.shoes != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.shoes.split("_");
        if ( res[0] == "ghillies" ) {
            imgUrl = "feet/";
            imgName = "ghillies_" + sex + "_no_th-sh";
        }
        else if ( res[0] == "sara" ) {
            imgUrl = "feet/shoes/" + sex + "/";
            imgName = "SaraShoes";
        }
        else if ( res[0] == "boots" ) {
            imgUrl = "feet/armor/" + sex + "/";
            imgName = res[1] + "_boots_" + sex;
        }
        else if ( res[0] == "slippers" ) {
            imgUrl = "feet/slippers_" + sex + "/";
            imgName = res[1];
        }
        else {
            imgUrl = "feet/shoes/" + sex + "/";
            imgName = res[0] + "_shoes_" + sex;
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

function drawBelt(ctx, char, canvasChar, sex, callback) {
    if (params.belt != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.belt.split("_");
        if ( res[0] == "leather" ) {
            imgUrl = "belt/" + res[0] + "/" + sex + "/";
            imgName = "leather_" + sex;
        }
        else if ( res[0] == "cloth" ) {
            if ( res[1] == "teal" && sex == "female" ) {
                imgUrl = "belt/cloth/" + sex + "/";
                imgName = "teal2_cloth_" + sex;
            }
            else {
                imgUrl = "belt/" + res[0] + "/" + sex + "/";
                imgName = res[1] + "_" + res[0] + "_" + sex;
            }
        }
        else {
            imgUrl = "belt/metal/" + sex + "/";
            imgName = res[0] + "_" + sex + "_no_th-sh";
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

function drawBuckle(ctx, char, canvasChar, sex, callback) {
    if (params.buckle != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.buckle.split("_");

        imgUrl = "belt/buckles_" + sex + "_no_th-sh/";
        imgName = res[0];

        var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawNecklace(ctx, char, canvasChar, sex, callback) {
    if (params.necklace != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.necklace.split("_");

        imgUrl = "accessories/necklaces_" + sex + "_ no_th-sh/";
        imgName = res[0];

        var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawCapeacc(ctx, char, canvasChar, sex, callback) {
    if (params.capeacc != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.capeacc.split("_");

        imgUrl = "accessories/neck/cape" + res[0] + "/" + sex + "/";
        imgName = "cape" + res[0] + "_" + res[1];
        var img = getImage(ctx, imgUrl + imgName + ".png", char, canvasChar, function() {
            drawImage(ctx, img);
            callback();
        });
    }
    else {
        callback();
    }
}

function drawHat(ctx, char, canvasChar, sex, callback) {
    if (params.hat != null) {
        var imgUrl = "";
        var imgName = "";
        var res = params.hat.split("_");
        if ( res[0] == "bandana" ) {
            imgUrl = "head/" + res[0] + "s/" + sex + "/";
            imgName = res[1];
        }
        else if ( res[0] == "cap" ) {
            imgUrl = "head/" + res[0] + "s/" + sex + "/";
            imgName = res[1] + "_cap_" + sex;
        }
        else if ( res[0] == "chain" ) {
            imgUrl = "head/helms/" + sex + "/"
            imgName = "chainhat_" + sex;
        }
        else if ( res[0] == "hood" ) {
            imgUrl = "head/" + res[0] + "s/" + sex + "/";
            imgName = res[1] + "_hood_" + sex;
        }
        else if ( res[0] == "helmet" ) {
            imgUrl = "head/helms/" + sex + "/";
            imgName = res[1] + "_helm_" + sex;
        }
        else if ( res[0] == "tiara" ) {
            imgUrl = "head/tiaras_" + sex + "/";
            imgName = res[1];
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

function drawWeapon(ctx, char, canvasChar, sex, callback) {
    // todo
    callback();
}

function drawAmmo(ctx, char, canvasChar, sex, callback) {
    // todo
    callback();
}

function drawShield(ctx, char, canvasChar, sex, callback) {
    // todo
    callback();
}

function drawQuiver(ctx, char, canvasChar, sex, callback) {
    // todo
    callback();
}

function getImage(ctx, imgRef, char, canvasChar, callback) {
    var img = new Image();
    img.src = "sprites/Universal-LPC-Spritesheet-Character-Generator/Universal-LPC-spritesheet/" + imgRef;
    img.onload = callback;
    images[imgRef] = img;
    return img;
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
});