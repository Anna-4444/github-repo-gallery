// overview div in the intro section right under the h1
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");

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

const displayRepoInfo = function (repoData) {
    for(let repo of repoData){
        const li = document.createElement("li");
        li.innerHTML = `<h3 class=".repo">${repo.name}</h3>`;
        repoList.append(li);
    }
};

getRepoInfo();