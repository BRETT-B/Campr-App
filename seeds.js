const   mongoose    = require("mongoose"),
        Campground  = require("./models/campground"),
        Comment     = require("./models/comment");
        
var data = [
        {
            name: "Shellrock Creek",
            image: "http://loomisadventures.com/sites/default/files/images/blog/shellrock-creek-02-large-01.22.11.jpg",
            description: "Activated charcoal PBR&B subway tile, you probably haven't heard of them artisan kombucha 90's salvia synth beard viral. Swag vice etsy gastropub, chartreuse kale chips mlkshk affogato tacos woke mumblecore. Cray fap gochujang hashtag, snackwave brunch green juice brooklyn gastropub freegan small batch kinfolk subway tile fixie. Biodiesel cred hella actually, tbh echo park succulents pitchfork enamel pin cliche kickstarter mlkshk aesthetic. Roof party narwhal chambray hammock, brunch bitters vaporware. Before they sold out chia raw denim, sustainable 3 wolf moon listicle vice. Unicorn leggings semiotics godard ramps farm-to-table."
        },
        {
            name: "Lost Lake",
            image: "http://1.bp.blogspot.com/-PznxC16bW-Q/UhhI-WbZ22I/AAAAAAAAXPo/8BUZgDIuLCo/s1600/lostlake02.jpg",
            description: "Activated charcoal PBR&B subway tile, you probably haven't heard of them artisan kombucha 90's salvia synth beard viral. Swag vice etsy gastropub, chartreuse kale chips mlkshk affogato tacos woke mumblecore. Cray fap gochujang hashtag, snackwave brunch green juice brooklyn gastropub freegan small batch kinfolk subway tile fixie. Biodiesel cred hella actually, tbh echo park succulents pitchfork enamel pin cliche kickstarter mlkshk aesthetic. Roof party narwhal chambray hammock, brunch bitters vaporware. Before they sold out chia raw denim, sustainable 3 wolf moon listicle vice. Unicorn leggings semiotics godard ramps farm-to-table."
        },
        {
            name: "Redwood Canyon",
            image: "http://www.summitpost.org/images/original/182030.jpg",
            description: "Activated charcoal PBR&B subway tile, you probably haven't heard of them artisan kombucha 90's salvia synth beard viral. Swag vice etsy gastropub, chartreuse kale chips mlkshk affogato tacos woke mumblecore. Cray fap gochujang hashtag, snackwave brunch green juice brooklyn gastropub freegan small batch kinfolk subway tile fixie. Biodiesel cred hella actually, tbh echo park succulents pitchfork enamel pin cliche kickstarter mlkshk aesthetic. Roof party narwhal chambray hammock, brunch bitters vaporware. Before they sold out chia raw denim, sustainable 3 wolf moon listicle vice. Unicorn leggings semiotics godard ramps farm-to-table."
        }
    ];
 
function seedDB(){
    //remove all campgrounds
    Campground.remove({}, (err) => {
        // if(err){
        //     console.log(err);
        // }else{
        //     console.log("Campgrounds removed");
        //      //add in a few campgrounds
        //     data.forEach((seed) => {
        //         Campground.create(seed, (err, campground) => {
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log("Campground added");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This place is great, but no WiFi",
        //                         author: "Shamos Blaze"
        //                     }, (err, comment) => {
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         }); 
        //     });
        // }
    });
}

module.exports = seedDB;
