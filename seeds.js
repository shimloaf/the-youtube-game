var mongoose = require("mongoose"),
    Video = require('./models/video');

mongoose.connect("mongodb://localhost/yt_game_db");

var data = [ 
{  "link" : "https://www.youtube.com/embed/oKKvimHe_TY", "videoid" : 569, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/XJ-CxmQ9dWo", "videoid" : 325, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/5b7SoS6pjJw", "videoid" : 7115, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/c1lsilGq6EU", "videoid" : 182, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/vgAuKOxcr9Y", "videoid" : 1153, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/yxjNIghAwK8", "videoid" : 5732, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/t6G6E0esMrc", "videoid" : 2443, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/zMZHL2p_IK0", "videoid" : 6806, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/yuGQnLOjpaA", "videoid" : 3708, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/oKKvimHe_TY", "roomid" : "archive", "videoid" : 3755, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/5b7SoS6pjJw", "roomid" : "archive", "videoid" : 5454, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/t6G6E0esMrc", "roomid" : "archive", "videoid" : 6073, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/Nvf99hJzc4E", "videoid" : 3048, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/8EkmidibigU", "videoid" : 669, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/y8XF0LJF6jQ", "videoid" : 4167, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/4S9rH6Aj3IA", "videoid" : 4801, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/8EkmidibigU", "roomid" : "archive", "videoid" : 5099, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/v7biwGs_v9w", "videoid" : 9238, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/zESAHXszw5s", "videoid" : 2914, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/kGjh_B0MsSM", "videoid" : 9742, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/wDf2lDE1hRc", "videoid" : 5873, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/vB5qz_fwcLA", "videoid" : 6997, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/B39hDHxwpxM", "videoid" : 1807, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/g-XWd9zH6Is", "videoid" : 6263, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/5IKPQCdlNRM", "videoid" : 664, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/-0yFI6zt8gY", "videoid" : 2402, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/VzP2HfaseHw", "videoid" : 3357, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/pPlc-eCMCW8", "videoid" : 5079, "roomid" : "lubmynubinatubwithgrub", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/oWjxSkJpxFU", "videoid" : 1287, "roomid" : "Grap", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/oWjxSkJpxFU", "videoid" : 7303, "roomid" : "Grap", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/sN4dqmP46Gc", "videoid" : 5181, "roomid" : "brosi", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/oWjxSkJpxFU", "videoid" : 5464, "roomid" : "Grap", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/oWjxSkJpxFU", "videoid" : 3175, "roomid" : "Grap", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/oWjxSkJpxFU", "videoid" : 1945, "roomid" : "Grap", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/AFsfBBrnMYI", "videoid" : 3366, "roomid" : "brosi", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/Qefa05xKgEo", "videoid" : 8149, "roomid" : "Brosi", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/9QwvF0Z-8DI", "videoid" : 8910, "roomid" : "lubmynubinatubwithgrub", "__v" : 0},
{  "link" : "https://www.youtube.com/embed/DX-I5n8nhOk", "videoid" : 6137, "roomid" : "room8", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/DX-I5n8nhOk", "roomid" : "archive", "videoid" : 7201, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/QAH_np6HoTA", "videoid" : 8914, "roomid" : "room6668", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/_H0REZZN_z4", "videoid" : 3026, "roomid" : "room6668", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/W8QPcGDpAxQ", "videoid" : 8831, "roomid" : "room6668", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/_H0REZZN_z4", "roomid" : "archive", "videoid" : 7779, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/ePZzBVvyUS0", "videoid" : 5262, "roomid" : "paper", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/BGkKibWrruk", "videoid" : 4276, "roomid" : "paper", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/SpZO-LRw5-w", "videoid" : 7611, "roomid" : "paper", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/SpZO-LRw5-w", "roomid" : "archive", "videoid" : 9000, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/Kere1rS0J6E", "roomid" : "archive", "videoid" : 8894, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/HIB_wV8vaEY", "roomid" : "archive", "videoid" : 9224, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/4lyH7_atJMc", "roomid" : "archive", "videoid" : 8668, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/mPFgAKqd5_4", "roomid" : "archive", "videoid" : 6030, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/dDuVGsq0kQs", "roomid" : "archive", "videoid" : 4108, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/kv5_gcEOOuk", "roomid" : "archive", "videoid" : 2709, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/c8QGvqVRGtI", "roomid" : "archive", "videoid" : 9639, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/ixWj798kpsI", "roomid" : "archive", "videoid" : 7999, "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/CK4tfh6-1sk", "videoid" : 2943, "roomid" : "skooma", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/cuafLEm4zLM", "videoid" : 7418, "roomid" : "skooma", "__v" : 0 },
{  "link" : "https://www.youtube.com/embed/pjPaLzNPt7U", "videoid" : 9205, "roomid" : "skooma", "__v" : 0 },
{  "link"   : "https://www.youtube.com/embed/UBXH6weJ_cs", "videoid" : 1771, "roomid" : "skooma", "__v" : 0 }
];

seedDB();

function seedDB(){
   //Remove all videos
   Video.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed videos!");
            data.forEach(function(seed){
                Video.create(seed, function(err, video){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a video");
                    }
                });
            });
        });
}

module.exports = seedDB;