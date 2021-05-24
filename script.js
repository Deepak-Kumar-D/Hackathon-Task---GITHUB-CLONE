const api = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");

//Fetching users
form.addEventListener("submit", ele => {
    ele.preventDefault();

    document.getElementById("repos").innerHTML = "";

    const users = search.value;

    if(users)
    {
        user(users);
        search.value = "";
    }
});

//Fetching users in mobile view
const form3 = document.getElementById("form3");
const search2 = document.getElementById("search2");
form3.addEventListener("submit", ele => {
    ele.preventDefault();

    document.getElementById("repos").innerHTML = "";

    const users = search2.value;

    if(users)
    {
        user(users);
        search2.value = "";
    }
});

//Fetching username from users
async function user(username){
    const data = await fetch(api + username);
    const obj = await data.json();

    createUser(obj);
    repositories(username);
}

user("deepak-kumar-d");

//Fetching Repositories
async function repositories(username){
    const url = await fetch(api + username + "/repos");
    const resp = await url.json();

    createRepos(resp);
    return resp;
}

//Fetching and Creating the name, location, followers and following
function createUser(create) {
    const img = document.querySelectorAll("img");

    for(i in img)
    {
        img[i].src = create.avatar_url;
    }    

    const name = document.querySelectorAll(".name");

    for(i in name)
    {
        name[i].innerHTML = create.name;
    }

    const userid = document.querySelector(".login");
    userid.innerHTML = create.login;

    const location = document.querySelector(".location");

    location.innerHTML = create.location;

    const followers = document.querySelector(".followers");
    followers.innerHTML = create.followers;

    const following = document.querySelector(".following");
    following.innerHTML = create.following;

    const repo = document.querySelectorAll(".repoCount");

    for(i in repo)
    {
        repo[i].innerHTML = create.public_repos;
    }
}

//Fetching and creating repositories/content lists
function createRepos(repos){
    const reps = document.getElementById("repos");
    const contentsApi = "https://api.github.com/repos/";    

    repos.sort((a,b) => b.name - a.name).forEach(repo => {
        const div = document.createElement("div");
        div.className = "list";
        const hr = document.createElement("hr");
        hr.className = "repoHr";
        reps.append(div);

        const create = document.createElement("a");
        create.classList.add("repo");
        create.id = repo.full_name;
        create.setAttribute("onclick", "show(this.id)")
        create.innerHTML = repo.name;

        async function list(){            
            const link = await fetch(contentsApi + repo.full_name + "/contents" );
            const dat = await link.json();
            let count = 0;

            const contdiv = document.createElement("div");
            contdiv.classList.add("contents", repo.full_name);
            div.append(contdiv);

            for(i=0;i<dat.length;i++)
            {
                const cont = document.createElement("a");
                cont.innerHTML = ++count + ". " + dat[i].name;
                cont.href = dat[i].html_url;
                cont.target = "_blank";
                
                const br = document.createElement("br");

                contdiv.append(cont, br);
            }
        }
        list();

        div.append(create);
        reps.append(hr);
    })
}

//Hiding and Showing the files under each repos
function show(ele){
    const watch = document.getElementsByClassName(ele)[0];
    const contents = document.querySelectorAll(".contents");

    for(j=0;j<contents.length;j++)
    {
        contents[j].style.display = "none";
    }
    
    watch.style.display = "block";
}

//Filter repos in repo search bar
const repSearch = () => {
    const searchRepo = document.querySelector("#searchRepo").value.toUpperCase();
    const repoName = document.querySelectorAll(".repo");
    const list = document.querySelectorAll(".list");
    const hr = document.getElementsByClassName("repoHr");

    console.log(hr);
    
    for(i=0;i<repoName.length;i++)
    {
        if(repoName[i].innerHTML.toUpperCase().indexOf(searchRepo) > -1)
        {
            list[i].style.display = "";
            hr[i].style.display = "";
        }
        else
        {
            list[i].style.display = "none";
            hr[i].style.display = "none";
        }
    }
}

//Responsive Menu Toggle
const burger = () => {
    const ham = document.querySelector(".ham");
    const nav = document.querySelector(".respnav");

    ham.addEventListener('click', () => {

        if(nav.style.display)
        {
            nav.style.display = "";
        }
        else{
            nav.style.display = "block";
        }
    })
}

burger();