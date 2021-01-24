let ghub = document.getElementById("ghub");

async function callMe() {
    let { Octokit } = await import("https://cdn.skypack.dev/@octokit/core");
    console.log("fdfs");
    const octokit = new Octokit({ auth: `a22e4f1fa507f899bd00e769742bdf6d21ea51` + `79` });

    console.log('calling');
    const repos = await octokit.request("GET /users/{org}/repos", {
        org: "smwllyms"
    });
    
    for (let i = 0; i < repos.data.length; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("ghub_div");
        console.log(repos.data[i]);
        newDiv.innerHTML = "<a target='_blank' href='" + repos.data[i].html_url + "'><h3>" + repos.data[i].name + "</h3></a>";
        newDiv.innerHTML += "<br/>Last pushed on " + repos.data[i].pushed_at.slice(0,10);
        ghub.appendChild(newDiv);
    }
    // expected output: "resolved"
}

callMe();