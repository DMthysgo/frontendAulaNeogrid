document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get("user");
  const jwtToken = localStorage.getItem("jwtToken");

  try {
    const response = await fetch(
      `https://backneoaula.vercel.app/user/${user_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const userData = await response.json();
    if (response.ok) {
      const nome = userData.usuario.user;
      const titulo = document.getElementById("titulo");
      titulo.textContent = `Seja bem vindo ${nome}`;
    } else {
      const titulo = document.getElementById("titulo");
      titulo.textContent = `Acesso não autorizado`;
    }
  } catch (error) {
    console.error("Erro ao acessar a rota protegida:", error);
  }
});
