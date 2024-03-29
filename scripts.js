const form = document.getElementById("form");
const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  nameValidation();
  emailValidate();
  senhaValidate();
  compareSenha();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const conf_senha = document.getElementById("conf_senha").value;

  const user_data = {
    user: nome,
    email: email,
    senha: senha,
    Conf_senha: conf_senha,
  };

  try {
    const resposta = await fetch(
      "https://backneoaula.vercel.app/auth/cadastro",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user_data),
      }
    );

    const data = await resposta.json();
    if (resposta.ok) {
      alert("cadastro realiazado com sucesso!");
      window.location.href = `/`;
    } else {
      alert(data.msg);
    }
  } catch (err) {
    alert("Erro ao se cadastrar", error);
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

function nameValidation() {
  if (campos[0].value.length < 3) {
    setError(0);
  } else {
    removeError(0);
  }
}

function emailValidate() {
  if (!emailRegex.test(campos[1].value)) {
    setError(1);
  } else {
    removeError(1);
  }
}

function senhaValidate() {
  if (campos[2].value.length < 8) {
    setError(2);
  } else {
    removeError(2);
    compareSenha();
  }
}

function compareSenha() {
  if (campos[2].value == campos[3].value && campos[3].value.length) {
    removeError(3);
  } else {
    setError(3);
  }
}
