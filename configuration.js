const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://test3-m3rz.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
  }
  
  function isLoggedIn() {
    const token = getTheToken();
    return token !== null;
  }
  
  function getTheToken() {
    const token = sessionStorage.getItem('token');
    return token;
  }
  //saving
  function saveTheToken(token) {
    sessionStorage.setItem('token', token);
    updateTheNavigationBar();
  }
  //removing
  function removeTheToken() {
    sessionStorage.removeItem('token');
    updateTheNavigationBar();
  }
  //config
  let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getTheToken()
  };
  
  updateTheNavigationBar();
  
  async function updateTheNavigationBar() {
    const navigation = document.getElementsByClassName("topnav")[0];
    let loginTag = navigation.children[navigation.children.length - 1];
  
    if (configuration.isLoggedIn()) {
      loginTag.innerHTML = `<li class="right"><a href="#" onclick="logout()">Logout</a></li>`;
    } else {
      loginTag.innerHTML = `<li class="right"><a href="login.html">Login</a></li>`;
    }
  }
  
  async function signUp() {
    let email = document.getElementById("signUpEmail").value;
    let username = document.getElementById("signUpUsername").value;
    let password = document.getElementById("signUpPassword").value;
  
    let customer = {email: email, username: username, password: password};
    let request = {
  
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    };
    try {
      let response = await fetch(getHost() + "/signup", request);
      if (response.status === 200) {
        alert("The registration was successful!");
        location.href = "login.html";
  
  
      } else {
        console.error(`Response status: ${response.status}`);
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
  
      alert("Something went wrong!");
    }
  }
  
  async function logout() {
    removeTheToken();
    location.href = 'login.html';
  }