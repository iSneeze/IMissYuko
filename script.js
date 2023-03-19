

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

var timeSince;
let currentStreamInfo = fetchAsync("https://holodex.net/api/v2/users/live?channels=UCcIcMRVpNqWQn4WnDhRASAw&limit=1");
currentStreamInfo.then((response) => {
    console.log(response);
    //response = [{test: "lmao"}];
    if (response.length === 0) {
        let lastArchiveInfo = fetchAsync("https://holodex.net/api/v2/videos?channel_id=UCcIcMRVpNqWQn4WnDhRASAw&limit=1&status=past");
        lastArchiveInfo.then((archiveResponse) => {

            let dateUTC = new Date().toUTCString();
            let d = new Date(dateUTC);
            let delta = new Date(archiveResponse[0].available_at);
            timeSince = (d - delta) - archiveResponse[0].duration * 1000;
            let timer = new Date(timeSince);
            document.getElementById("timer").innerHTML = "Last seen: " + Math.floor(Math.abs(timeSince / (24*3600*1000))) + "d " + timer.getHours() + "h " + timer.getMinutes() + "m " + timer.getSeconds() + "s ago streaming:";
            document.getElementById("thumbnail").innerHTML = '<iframe src="https://www.youtube.com/embed/' + archiveResponse[0].id + '" title="YouTube video player" frameborder="0" allow="clipboard-write; web-share" allowfullscreen></iframe>';

            window.setInterval(function () {
                timeSince = timeSince + 1000
                let timer = new Date(timeSince);
                document.getElementById("timer").innerHTML = "Last seen: " + Math.floor(Math.abs(timeSince / (24*3600*1000))) + "d " + timer.getHours() + "h " + timer.getMinutes() + "m " + timer.getSeconds() + "s ago streaming:";
            }, 1000)
        })
    } else {
        if (response[0].status === "live") {
            document.getElementById("timer").innerHTML = "What are you doing here?! SHE'S LIVE NOW!";

            document.getElementById("thumbnail").innerHTML = '<iframe src="https://www.youtube.com/embed/' + response[0].id + '" title="YouTube video player" frameborder="0" allow="clipboard-write; web-share" allowfullscreen></iframe>';

        } else {
            let dateUTC = new Date().toUTCString();
            let d = new Date(dateUTC);
            let delta = new Date(response[0].start_scheduled);
            timeUntil = delta - d
            let timer = new Date(timeUntil);
            document.getElementById("timer").innerHTML = "Time until next stream: " + Math.floor(Math.abs(timeUntil / (24*3600*1000))) + "d " + timer.getHours() + "h " + timer.getMinutes() + "m " + timer.getSeconds() + "s";
            document.getElementById("thumbnail").innerHTML = '<iframe src="https://www.youtube.com/embed/' + response[0].id + '" title="YouTube video player" frameborder="0" allow="clipboard-write; web-share" allowfullscreen></iframe>';

            window.setInterval(function () {
                timeUntil = timeUntil - 1000
                let timer = new Date(timeUntil);
                if(timeUntil > 0){
                    document.getElementById("timer").innerHTML = "Time until next stream: " + Math.floor(Math.abs(timeUntil / (24*3600*1000))) + "d " + timer.getHours() + "h " + timer.getMinutes() + "m " + timer.getSeconds() + "s";
                } else {
                    document.getElementById("timer").innerHTML = "Stream about to start!"; 
                }
            }, 1000)
        }

    }
})

function getRandomFileName() {
    let files = ['beedo', 'brap', 'coom1', 'coom2', 'correction', 'crash1', 'cringe', 'dontmissmetoomuch', 'faq', 'hic1',
        'hic2', 'hic3', 'laugh1', 'laughsnort', 'memberwisp', 'nocrash', 'norubber', 'notafurry1', 'pee1', 'peepeepoopoo',
        'pickle2', 'picklefits', 'pink', 'putonthehoodie', 'rizz', 'spit', 'thatscrazy', 'touchtoes', 'wanau1', 'wanau2',
        'wanau3', 'wanau4', 'wanau5', 'wanau6', 'yukonade', 'yukosplain', 'whyamIlikethis'];
    return files[Math.floor(Math.random() * files.length)]
}

function playSound() {
    let file = getRandomFileName();
    var audio = new Audio('/assets/sound/' + file + '.ogg');
    audio.play();
    if (audio.src.includes("wanau")) {
        document.getElementById("wanau").style.display = "block";
        setTimeout(() => {
            document.getElementById("wanau").style.display = "none";
        }, 800);
    }

    if (audio.src.includes("hic")) {
        document.getElementById("hic").style.display = "block";
        setTimeout(() => {
            document.getElementById("hic").style.display = "none";
        }, 500);
    }

    if (audio.src.includes("faq") || audio.src.includes("rizz")) {
        document.getElementById("sob").style.display = "block";
        setTimeout(() => {
            document.getElementById("sob").style.display = "none";
        }, 1000);
    }
}