$.ajaxSetup({
    headers: {
        'csrftoken': '{{ csrf_token() }}'
    }
});

// If random word is not already stored, generate one and store it

const possibleWords = ["apple", "beach", "chair", "dance", "eagle", "fairy", "grape", "happy", "image", "jolly",
    "knife", "lemon", "music", "novel", "oasis", "piano", "quiet", "roast", "sunny", "table",
    "umbra", "vault", "witty", "xenon", "young", "zebra", "acute", "baker", "camel", "dough",
    "elite", "flute", "globe", "heist", "igloo", "joker", "kiosk", "leash", "marsh", "onion",
    "peach", "quilt", "ruler", "snail", "tiger", "water", "abide", "braid", "cloud", "daisy",
    "enjoy", "flask", "heart", "inert", "jelly", "mango", "paste", "rugby", "snack", "toast",
    "upset", "whale", "amber", "brave", "candy", "drain", "emote", "flora", "green", "haste",
    "ivory", "jumbo", "knots", "major", "olive", "proud", "rival", "sweep", "trick", "agree",
    "bliss", "dream", "evoke", "fancy", "grass", "house", "input", "juicy", "karma", "lunch",
    "maple", "nurse", "opera", "round", "shock", "trend", "urban", "video", "angel", "bloom",
    "charm", "dusty", "event", "beach", "bland", "civic", "acute", "adore", "audio", "blend",
    "angel", "agree", "bliss", "dream", "evoke", "fancy", "agile", "audio", "blend", "bloom",
    "civic", "agile", "bland", "beach", "bloom", "charm", "civic", "dusty", "event", "agile",
    "bland", "beach", "bloom", "charm", "civic", "dusty", "event", "apple", "chair", "dance",
    "eagle", "fairy", "grape", "happy", "image", "jolly", "knife", "lemon", "music", "novel",
    "oasis", "piano", "quiet", "roast", "sunny", "table", "umbra", "vault", "witty", "xenon",
    "young", "zebra", "acorn", "badge", "chime", "delta", "elbow", "flame", "glove", "hefty",
    "idiot", "joust", "kayak", "laugh", "mirth", "nymph", "ovoid", "pique", "quash", "route",
    "sober", "talon", "ultra", "vouch", "whisk", "xenon", "yield", "zebra", "aglow", "bribe",
    "chess", "dwarf", "ember", "flake", "gauge", "hymen", "irate", "jaded", "klutz", "lunar",
    "merry", "nudge", "ocean", "pluck", "quest", "rusty", "savor", "taunt", "unify", "vista",
    "wedge", "xenon", "yield", "zebra", "abuzz", "balky", "cabin", "dusky", "edict", "flint",
    "gnarl", "haste", "irons", "jewel", "knell", "lance", "mirth", "nymph", "opine", "quail",
    "roost", "sloth", "tract", "unzip", "vomit", "witty", "xenon", "yield", "zebra", "alloy",
    "bland", "cloak", "dwell", "elude", "fluke", "glean", "humid", "irate", "joust", "kayak",
    "lucid", "mirth", "nymph", "omega", "quail", "roach", "serge", "twirl", "ultra", "vouch",
    "wedge", "xenon", "yield", "zebra", "adapt", "bleak", "chimp", "dusky", "eerie", "flora",
    "glide", "hatch", "inlay", "joust", "knack", "laser", "merge", "nifty", "optic", "quake",
    "rifle", "slash", "toast", "usurp", "vocal", "whims", "xenon", "yield", "zebra", "abate",
    "bluff", "cleft", "dusky", "elude", "flood", "girth", "havoc", "idyll", "jolly", "kebab",
    "latch", "merit", "nimble", "optic", "quart", "round", "stoke", "unzip", "vigor", "wreck",
    "xenon", "yield", "zebra", "align", "blurb", "climb", "dusky", "elixir", "fluid", "gizmo",
    "hover", "issue", "jumbo", "kudos", "latch", "mercy", "niche", "optic", "query", "rider",
    "sloth", "tweak", "ultra", "vivid", "wacky", "xenon", "yield", "zebra", "ambit", "brisk",
    "canto", "donut", "elide", "flora", "gusto", "honey", "irons", "joust", "kiosk", "latch",
    "melon", "noble", "optic", "quell", "rifle", "slash", "tweet", "umbra", "vocal", "whisk",
    "xenon", "yield", "zebra", "abbey", "blimp", "cadet", "drift", "elegy", "flour", "gnash",
    "hyper", "idyll", "joust", "karma", "lemon", "marsh", "noble", "optic", "quill", "rider",
    "smack", "trace", "ultra", "vocal", "whims", "xenon", "yield", "zebra", "aegis", "blink",
    "caped", "dusky", "elixir", "flood", "gnome", "hubby", "irate", "jolly", "kiosk", "latch",
    "mocha", "niche", "optic", "query", "round", "smirk", "thump", "ultra", "vocal", "whisk",
    "xenon", "yield", "zebra", "adorn", "bloat", "crane", "dusty", "elite", "flame", "gaffe",
    "horde", "irate", "joust", "karma", "laser", "marry", "niche", "optic", "quest", "rusty",
    "smite", "trail", "unzip", "vocal", "whims", "xenon", "yield", "zebra", "aggro", "blush",
    "crash", "dusky", "elope", "flair", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra", "abase", "blunt", "crave", "dusky", "elude", "flora", "gnash",
    "hyper", "idyll", "joust", "karma", "lemon", "marsh", "noble", "optic", "quest", "rusty",
    "smack", "trace", "ultra", "vocal", "whisk", "xenon", "yield", "zebra", "abash", "blurb",
    "crane", "dusky", "eager", "flash", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra", "addle", "bluff", "crisp", "dusky", "elope", "flame", "gaffe",
    "horde", "irate", "jolly", "kiosk", "latch", "mocha", "niche", "optic", "quest", "rusty",
    "smite", "trail", "unzip", "vocal", "whims", "xenon", "yield", "zebra", "aggro", "blush",
    "crisp", "dusky", "elope", "flair", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra", "abash", "blurb", "crane", "dusky", "eager", "flash", "gnome",
    "hubby", "irate", "jolly", "kebab", "leash", "marsh", "noble", "optic", "query", "rifle",
    "slash", "twirl", "ultra", "vocal", "whims", "xenon", "yield", "zebra", "addle", "bluff",
    "crisp", "dusky", "elope", "flame", "gaffe", "horde", "irate", "jolly", "kiosk", "latch",
    "mocha", "niche", "optic", "quest", "rusty", "smite", "trail", "unzip", "vocal", "whims",
    "xenon", "yield", "zebra", "aggro", "blush", "crisp", "dusky", "elope", "flair", "gnome",
    "hubby", "irate", "jolly", "kebab", "leash", "marsh", "noble", "optic", "query", "rifle",
    "slash", "twirl", "ultra", "vocal", "whims", "xenon", "yield", "zebra", "abash", "blurb",
    "crane", "dusky", "eager", "flash", "gnome", "hubby", "irate", "jolly", "kebab", "leash",
    "marsh", "noble", "optic", "query", "rifle", "slash", "twirl", "ultra", "vocal", "whims",
    "xenon", "yield", "zebra"];
const randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

// Include the random word in the request data

$(document).ready(function () {
    // Function to send data to backend and handle response
    function sendDataAndHandleResponse(inputs, index) {
        var inputData = [];
        var isEmpty = false;

        // Check if any input field is empty
        inputs.each(function () {
            if ($(this).val().trim() === '') {
                isEmpty = true;
                $(this).css('outline', '2px solid red');
            } else {
                inputData.push($(this).val());
                $(this).css('outline', '');
            }
        });

        if (isEmpty) {
            console.log('Please fill all the input fields.');
            return;
        }

        // Prepare the request payload
        var requestData = {
            data: inputData,
            randomword: randomWord
        };

        // Send the data to the backend
        $.ajax({
            type: 'POST',
            url: '/checkword',
            data: JSON.stringify(requestData),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            contentType: 'application/json',
            success: function (response) {
                console.log('Data sent successfully:', response);
                updateInputFieldColors(response, index);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    // Function to update input field colors based on response
    function updateInputFieldColors(response, index) {
        response.forEach(function (item, idx) {
            var inputField = $(`#otp-input-${index}${idx}`);
            if (item.state === 1) {
                inputField.css('background-color', '#D2DF19').prop('disabled', true);
            } else if (item.state === 0) {
                inputField.css('background-color', 'grey').prop('disabled', true);
            } else {
                inputField.css('background-color', '').prop('disabled', true);
            }

            setTimeout(function () {
                if (item.count !== 5) {
                    if (index == 4) {
                        Swal.fire({
                            title: randomWord,
                            text: 'Is the correct word',
                            icon: 'warning'
                        });
                    }
                    $(`.otp-input-${index + 1}`).prop('disabled', false);
                } else {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: 'Correct word guessed',
                        icon: 'success'
                    });
                    $(`.otp-input-${index + 1}`).prop('disabled', true);
                }
            }, 300);
        });
    }

    // Attach keypress event handler to all OTP inputs

    // Attach keypress event handler to all OTP inputs with index greater than 0
    for (let i = 0; i < 5; i++) {
        $(`.otp-input-${i}`).keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                sendDataAndHandleResponse($(this).closest('.otp-form').find('input'), i);
            }
        });
    }
});
