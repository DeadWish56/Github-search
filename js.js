const searchInput = document.querySelector('.search-input')
const autocomplete = document.querySelector('.autocomplete')
const repoCollection = document.querySelector('.repo-collection')

const getRepo = async function(repoName) {
  const data = await fetch(`https://api.github.com/search/repositories?q=${repoName}&per_page=5`)
  const response = await data.json()
  let result = response.items
  return result
}

const getCollection = function(elem) {  
  let li = document.createElement('li')
  li.classList.add('collection-item')
  const div = document.createElement('div')
  div.classList.add('info')
  const button = document.createElement('button')
  button.classList.add('remove-item')
  div.innerHTML = `<p>Name: ${elem.name}</p>
  <p>Owner: ${elem.owner.login}</p>
  <p>Stars: ${elem.stargazers_count}</p>`  
  li.append(div)
  li.append(button)
  repoCollection.append(li)
}

const createUsers = function(usersData) {
  if (searchInput.value) {
    usersData.forEach(function(el) {
      const userElement = document.createElement('li')
      userElement.classList.add('autocomplete-item')
      userElement.textContent = el.name
      autocomplete.append(userElement)
      userElement.addEventListener('click', function(e) {
        getCollection(el)
        searchInput.value = ""
        autocomplete.innerHTML = ""
      })
    })
  } else {
    autocomplete.innerHTML = ""
  }
}

const debounce = (fn, debounceTime) => {
  let timeout;
    return function() {
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), debounceTime);
    };
  };

  searchInput.addEventListener('input', debounce(async function(e){
    autocomplete.innerHTML = ''
    const repo = await getRepo(searchInput.value)
    createUsers(repo)
  }, 400))

  repoCollection.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
      e.target.closest('li').remove()
    }
  })