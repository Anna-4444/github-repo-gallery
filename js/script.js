const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repoData = document.querySelector(".repo-data");
const repoContainer = document.querySelector(".repos");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
const username = "Anna-4444";

const getProfileInfo = async function () {
    const results = await fetch(`https://api.github.com/users/${username}`);
    const profile = await results.json();
    displayProfileInfo(profile);
    // console.log(profile);
};

getProfileInfo();

const displayProfileInfo = function (profile) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${profile.avatar_url}>
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>`;
    overview.append(userInfo);
};

const getRepoInfo = async function () {
    const results = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await results.json();
    displayRepoInfo(repoData);
    // console.log(repoData);
};

getRepoInfo();

const displayRepoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for(let repo of repos){
        const li = document.createElement("li");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        li.classList.add("repo");
        repoList.append(li);
    }
};

repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName);
        getSpecificRepoInfo(repoName);
    } 
});

const getSpecificRepoInfo = async function (repoName){
    const results = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const specificRepo = await results.json();
    // console.log(specificRepo.name);
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
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    viewReposButton.classList.remove("hide");
    repoContainer.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${specificRepo.name}</h3>
    <p>Description: ${specificRepo.description}</p>
    <p>Default Branch: ${specificRepo.default_branch}</p>
    <p>Languages: ${languages}</p>
    <a class="visit" href="${specificRepo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
};

viewReposButton.addEventListener("click", function () {
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
    repoContainer.classList.remove("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = filterInput.value;
    const lowerCaseSearch = searchText.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    // console.log(repos);
    for(const repo of repos){
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(lowerCaseSearch)){
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});