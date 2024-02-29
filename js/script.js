const form = document.getElementById("form");
const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const userRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  senhaValidate();

  const user = document.getElementById("user").value;
  const senha = document.getElementById("senha").value;

  const login_Data = {
    user,
    senha,
  };

  try {
    const resposta = await fetch("https://backneoaula.vercel.app/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_Data),
    });

    const data = await resposta.json();

    if (resposta.ok) {
      console.log(data.msg);
      localStorage.setItem("jwtToken", data.token);
      const jwtToken = localStorage.getItem("jwtToken");
      try {
        const response = await fetch(
          `https://backneoaula.vercel.app/user/${user}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.ok) {
          const dados = await response.json();
          window.location.href = `/Home?user=${user}`;
        } else {
          alert("Não autorizado ou erro ao acessar a rota protegida");
        }
      } catch (error) {
        console.error("Erro ao acessar a rota protegida:", error);
      }
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error(error);
  }
});

function setError(index) {
  campos[index].style.border = "2px solid #e63636";
  spans[index].style.display = "block";
}

function removeError(index) {
  campos[index].style.border = "";
  spans[index].style.display = "none";
}

function senhaValidate() {
  if (campos[1].value.length < 8) {
    setError(1);
  } else {
    removeError(1);
  }
}
