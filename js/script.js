// overview div in the intro section right under the h1
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector("button");

const username = "Anna-4444";

const getProfileInfo = async function () {
    const results = await fetch(`https://api.github.com/users/${username}`);
    const profile = await results.json();
    displayProfileInfo(profile);
};

const displayProfileInfo = function (profile) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure><img alt="user avatar" src=${profile.avatar_url}></figure><div><p><strong>Name:</strong> ${profile.name}</p><p><strong>Bio:</strong> ${profile.bio}</p><p><strong>Location:</strong> ${profile.location}</p><p><strong>Number of public repos:</strong> ${profile.public_repos}</p></div>`;
    overview.append(userInfo);
};

getProfileInfo();

const getRepoInfo = async function () {
    const results = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await results.json();
    displayRepoInfo(repoData);
    // console.log(repoData);
};

const displayRepoInfo = function (repos) {
    for(let repo of repos){
        const li = document.createElement("li");
        li.innerHTML = `<h3 class=".repo">${repo.name}</h3>`;
        repoList.append(li);
    }
};

getRepoInfo();

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoData.classList.remove("hide");
        viewReposButton.classList.remove("hide");
        repoList.classList.add("hide");
        // console.log(repoName);
        getSpecificRepoInfo(repoName);
    } 
});

const getSpecificRepoInfo = async function (repoName){
    const results = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const specificRepo = await results.json();
    // console.log(specificRepo);
    const fetchLanguages = await fetch(specificRepo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    let languages = [];
        for(let key in languageData){
            languages.push(key);
        }
    // console.log(languages);
    displaySpecificRepoInfo(specificRepo, languages);
};

const displaySpecificRepoInfo = function (specificRepo, languages){
    repoData.HTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${specificRepo.name}</h3>
    <p>Description: ${specificRepo.description}</p>
    <p>Default Branch: ${specificRepo.default_branch}</p>
    <p>Languages: ${languages}</p>
    <a class="visit" href="${specificRepo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
};

viewReposButton.addEventListener("click", function (){
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
    repoList.classList.remove("hide");
});