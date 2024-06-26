const express = require("express");
const path = require("path");
const pool = require("../assets/db/connection");

const router = express.Router();

// Rota para a página inicial
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "index.html"));
});

// Rota para a página de registro
router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "register.html"));
});

// Rota para a página inicial
router.get("./index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "index.html"));
});

// Rota para a página de sobre
router.get("./about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "about.html"));
});

// Rota para a página de preço
router.get("./price.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "price.html"));
});

// Rota para a página de suporte
router.get("./suport.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "suport.html"));
});

// Rota para a página de login
router.get("./login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "login.html"));
});


// Rota para lidar com o envio do formulário de login
router.post("./login.html", (req, res) => {
  const { email, senha } = req.body;

  // Verificar se o email e a senha estão presentes
  if (!email || !senha) {
    // Se algum campo estiver vazio, exibir mensagem de erro na mesma página
    return res.status(400).redirect("/login?mensagem=Preencha todos os campos");
  }

  // Consultar o banco de dados para verificar as credenciais do usuário
  pool.query(
    "SELECT * FROM tb_usuario WHERE email = ? AND senha = ?",
    [email, senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao consultar usuário:", err);
        return res.status(500).send("Erro interno do servidor");
      }

      // Verificar se o usuário foi encontrado
      if (results.length === 0) {
        // Se não encontrou usuário, exibir mensagem de erro na mesma página
        return res.status(401).redirect("/login?mensagem=Email ou senha incorretos");
      }

      // Definir a sessão de autenticação
      req.session.authenticated = true;
      req.session.user = results[0]; // Armazenar informações do usuário na sessão

      // Se as credenciais estiverem corretas, redirecionar para a página de workspace
      return res.redirect("/workspace");
    }
  );
});

// Rota para a tela de workspace
router.get("/workspace", (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.authenticated) {
    return res.status(401).send("Acesso não autorizado");
  }

  res.sendFile(path.join(__dirname, "..", "assets", "html", "workspace.html"));
});

// Rota para lidar com venda (sale)
router.get("/sale", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "assets", "html", "sale.html"));
});

// Rota para lidar com chaves (seekeys)
router.get("/seekeys", (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.authenticated) {
    return res.status(401).send("Acesso não autorizado");
  }

  // Obter o ID do usuário da sessão
  const usuario_id = req.session.user.id;

  // Consultar o banco de dados para obter as chaves do usuário
  pool.query(
    "SELECT chave, compra, expiracao_key FROM tb_key WHERE usuario_id = ?",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.error("Erro ao consultar chaves do usuário:", err);
        return res.status(500).send("Erro interno do servidor");
      }

      // Renderize o template HTML com os dados das chaves
      const keysHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <!-- Basic -->
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <!-- Mobile Metas -->
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <!-- Site Metas -->
                <link rel="icon" href="../images/logo_name.png" type="image/gif" />
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="author" content="" />

                <title>Polibot</title>

                <!-- bootstrap core css -->
                <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />

                <!-- fonts style -->
                <link
                  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
                  rel="stylesheet"
                />

                <!-- font awesome style -->
                <link href="../css/font-awesome.min.css" rel="stylesheet" />

                <!-- Custom styles for this template -->
                <link href="../css/style.css" rel="stylesheet" />
                <!-- responsive style -->
                <link href="../css/responsive.css" rel="stylesheet" />
              </head>

              <body class="sub_page">
                <div class="hero_area">
                  <!-- header section strats -->
                  <header class="header_section">
                    <div class="container-fluid">
                      <nav class="navbar navbar-expand-lg custom_nav-container">
                        <a class="navbar-brand" href="./index.html">
                          <span>
                            <img src="../images/logo_name.png" alt="Logo" />
                            Polibot</span
                          >
                        </a>

                        <button
                          class="navbar-toggler"
                          type="button"
                          data-toggle="collapse"
                          data-target="#navbarSupportedContent"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          <span class=""> </span>
                        </button>

                        <div
                          class="collapse navbar-collapse"
                          id="navbarSupportedContent"
                        >
                          <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                              <a class="nav-link" href="./index.html"
                                >Home <span class="sr-only">(current)</span></a
                              >
                            </li>
                            <li class="nav-item active">
                              <a class="nav-link" href="./about.html"> Sobre</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="./price.html">Preços</a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" href="./suport.html">Suporte</a>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </header>
                </div>
                <!-- end header section -->

                <!-- See Keys section -->
                <section class="selection_panel">
                  <div class="selection_panel_container">
                    <ul>
                      <li><a href="./seeregistration.html">Ver Cadastro</a></li>
                      <li><a href="./seekeys.html">Minhas Chaves</a></li>
                      <li><a href="./myrequests.html">Meus Pedidos</a></li>
                      <li><a href="./sale.html">Adquirir Plano</a></li>
                    </ul>
                  </div>

                  <div class="purchase_container">
                    <div class="purchase_heading_container">
                      <h2>Minhas Chaves</h2>
                      <br />
                    </div>
                    <div class="purchase_row">
                      <div class="purchase_col-md-8 purchase_col-lg-6">
                        <div class="purchase_form_container">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Chave</th>
                                <th>Compra</th>
                                <th>Expiração</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${results
          .map(
            (key) => `
                                      <tr>
                                          <td>${key.chave}</td>
                                          <td>${key.compra}</td>
                                          <td>${key.expiracao_key}</td>
                                      </tr>
                                  `
          )
          .join("")}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <!-- End See Keys section -->
                <!-- info section -->

                <section class="info_section layout_padding2">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-3">
                        <div class="info_contact">
                          <h4>Endereço</h4>
                          <div class="contact_link_box">
                            <!-- <a href=""> -->
                            <a>
                              <i class="fa fa-map-marker" aria-hidden="true"></i>
                              <span> São Paulo - SP </span>
                            </a>
                            <a>
                              <i class="fa fa-phone" aria-hidden="true"></i>
                              <span> Telefone +55 (11) 90000-0000 </span>
                            </a>
                            <a>
                              <i class="fa fa-envelope" aria-hidden="true"></i>
                              <span> Polibot@gmail.com </span>
                            </a>
                          </div>
                        </div>
                        <div class="info_social">
                          <a>
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                          </a>
                          <a>
                            <i class="fa fa-twitter" aria-hidden="true"></i>
                          </a>
                          <a>
                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                          </a>
                          <a>
                            <i class="fa fa-instagram" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
            
                      <div class="col-md-3">
                        <div class="info_link_box">
                          <h4>Links</h4>
                          <div class="info_links">
                            <a class="active" href="./index.html">
                              <img src="../images/nav-bullet.png" alt="" />
                              Home
                            </a>
                            <a class="" href="./about.html">
                              <img src="../images/nav-bullet.png" alt="" />
                              Sobre
                            </a>
                            <a class="" href="./price.html">
                              <img src="../images/nav-bullet.png" alt="" />
                              Preços
                            </a>
                            <a class="" href="./login.html">
                              <img src="../images/nav-bullet.png" alt="" />
                              Login
                            </a>
                            <a class="" href="./suport.html">
                              <img src="../images/nav-bullet.png" alt="" />
                              Suporte
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
            
                <!-- end info section -->
                <!-- footer section -->
                <footer class="footer_section">
                  <div class="container">
                    <p>
                      &copy; <span id="displayYear"></span> Todos os direitos reservados por
                      <a href="./index.html">Polibot </a>
                    </p>
                    <br />
                  </div>
                </footer>
              </body>
            </html>
        `;

      // Envie o HTML como resposta
      res.send(keysHtml);
    }
  );
});

// Rota para lidar com o envio do formulário de registro

router.post("/register", (req, res) => {
  const { nome, email, senha, confirmar_senha } = req.body;

  // Verificar se todos os campos estão presentes
  if (!nome || !email || !senha || !confirmar_senha) {
    return res.status(400).send("Por favor, preencha todos os campos");
  }

  // Verificar se a senha e a confirmação de senha correspondem
  if (senha !== confirmar_senha) {
    return res
      .status(400)
      .send("A senha e a confirmação de senha não correspondem");
  }

  pool.query(
    "INSERT INTO tb_usuario (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir usuário:", err);
        return res.status(500).send("Erro interno do servidor");
      }
      // Redirecionar o usuário para a página de login com uma mensagem na URL
      return res.redirect("/login?mensagem=Cadastro efetuado com sucesso. \nFaça o login para acessar sua conta.");
    }
  );
});


// Rota para lidar com a visualização e atualização do registro do usuário
router.get("/seeregistration", (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.authenticated) {
    return res.status(401).send("Acesso não autorizado");
  }

  // Obter o ID do usuário da sessão
  const usuario_id = req.session.user.id;

  // Consultar o banco de dados para obter os detalhes do usuário
  pool.query(
    "SELECT nome, email FROM tb_usuario WHERE id = ?",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.error("Erro ao consultar detalhes do usuário:", err);
        return res.status(500).send("Erro interno do servidor");
      }

      // Renderize o template HTML com os detalhes do usuário
      const registrationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <!-- Basic -->
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!-- Mobile Metas -->
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <!-- Site Metas -->
          <link rel="icon" href="../images/logo_name.png" type="image/gif" />
          <meta name="keywords" content="" />
          <meta name="description" content="" />
          <meta name="author" content="" />
      
          <title>Polibot</title>
      
          <!-- bootstrap core css -->
          <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
      
          <!-- fonts style -->
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
      
          <!-- font awesome style -->
          <link href="../css/font-awesome.min.css" rel="stylesheet" />
      
          <!-- Custom styles for this template -->
          <link href="../css/style.css" rel="stylesheet" />
          <!-- responsive style -->
          <link href="../css/responsive.css" rel="stylesheet" />
        </head>
      
        <body class="sub_page">
          <div class="hero_area">
            <!-- header section strats -->
            <header class="header_section">
              <div class="container-fluid">
                <nav class="navbar navbar-expand-lg custom_nav-container">
                  <a class="navbar-brand" href="../html/index.html">
                    <span>
                      <img src="../images/logo_name.png" alt="Logo" />
                      Polibot</span
                    >
                  </a>
      
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class=""> </span>
                  </button>
      
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item active">
                        <a class="nav-link" href="./index.html"
                          >Home <span class="sr-only">(current)</span></a
                        >
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="./about.html"> Sobre</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="./price.html">Preços</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="./suport.html">Suporte</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </header>
            <!-- end header section -->
          </div>
      
          <!-- seeregistration section -->
      
          <section class="selection_panel">
            <div class="selection_panel_container">
              <ul>
                <li><a href="./seeregistration.html">Ver Cadastro</a></li>
                <li><a href="./seekeys.html">Minhas Chaves</a></li>
                <li><a href="./myrequests.html">Meus Pedidos</a></li>
                <li><a href="./sale.html">Adquirir Plano</a></li>
              </ul>
            </div>
          </section>
      
            <section class="seeregistration_sec">
              <div>
                <h2>Meus Dados</h2>
                <br />
                <form action="/updateRegistration" method="POST">
                  <div class="form-group">
                    <label for="nome">Nome</label>
                    <input
                      type="text"
                      class="form-control"
                      id="nome"
                      name="nome"
                      value="${results[0].nome}"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      value="${results[0].email}"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <label for="novaSenha">Nova Senha</label>
                    <input
                      type="password"
                      class="form-control"
                      id="novaSenha"
                      name="novaSenha"
                    />
                  </div>
                  <div class="form-group">
                    <label for="confirmarSenha">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      class="form-control"
                      id="confirmarSenha"
                      name="confirmarSenha"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Atualizar</button>
                </form>
              </div>
            </div>
          </section>
      
          <!-- end seeregistration section -->
      
          <!-- info section -->
      
          <section class="info_section layout_padding2">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <div class="info_contact">
                    <h4>Endereço</h4>
                    <div class="contact_link_box">
                      <!-- <a href=""> -->
                      <a>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <span> São Paulo - SP </span>
                      </a>
                      <a>
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <span> Telefone +55 (11) 90000-0000 </span>
                      </a>
                      <a>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <span> Polibot@gmail.com </span>
                      </a>
                    </div>
                  </div>
                  <div class="info_social">
                    <a>
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a>
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a>
                      <i class="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a>
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
      
                <div class="col-md-3">
                  <div class="info_link_box">
                    <h4>Links</h4>
                    <div class="info_links">
                      <a class="active" href="./index.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Home
                      </a>
                      <a class="" href="./about.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Sobre
                      </a>
                      <a class="" href="/price.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Preços
                      </a>
                      <a class="" href="./login.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Login
                      </a>
                      <a class="" href="./suport.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Suporte
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <!-- end info section -->
      
          <!-- footer section -->
          <footer class="footer_section">
            <div class="container">
              <p>
                &copy; <span id="displayYear"></span> Todos os direitos reservados por
                <a href="./index.html">Polibot</a>
              </p>
            </div>
          </footer>
          <!-- footer section -->
      
          <!-- jQery -->
          <script src="../js/jquery-3.4.1.min.js"></script>
          <!-- bootstrap js -->
          <script src="../js/bootstrap.js"></script>
          <!-- custom js -->
          <script src="../js/custom.js"></script>
        </body>
      </html>
    `;

      // Envie o HTML como resposta
      res.send(registrationHtml);
    }
  );
});

// Rota para lidar com a atualização do registro do usuário
router.post("/updateRegistration", (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.authenticated) {
    return res.status(401).send("Acesso não autorizado");
  }

  // Obter os dados do formulário
  const { nome, novaSenha, confirmarSenha } = req.body;

  // Verificar se a nova senha corresponde à confirmação da senha
  if (novaSenha !== confirmarSenha) {
    return res
      .status(400)
      .send("A nova senha e a confirmação da senha não correspondem");
  }

  // Obter o ID do usuário da sessão
  const usuario_id = req.session.user.id;

  // Atualizar o registro do usuário no banco de dados
  pool.query(
    "UPDATE tb_usuario SET nome = ?, senha = ? WHERE id = ?",
    [nome, novaSenha, usuario_id],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar registro do usuário:", err);
        return res.status(500).send("Erro interno do servidor");
      }

      // Redirecionar o usuário de volta para a página de visualização do registro
      res.redirect("/seeregistration");
    }
  );
});

// Rota para lidar com a compra do plano
router.post("/purchase", (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.authenticated || !req.session.user.id) {
    return res.status(401).send("Acesso não autorizado");
  }

  // Obter o ID do usuário da sessão
  const userId = req.session.user.id;

  // Obter os dados do formulário
  const { card_name, card_number, card_expiry, card_cvv, plano } = req.body;

  // Verificar se o plano selecionado é válido
  const planosValidos = ["standard", "premium", "business"];
  if (!planosValidos.includes(plano)) {
    return res.status(400).send("Plano selecionado inválido");
  }

  // Inserir os dados no banco de dados usando pool.query
  pool.query(
    "INSERT INTO tb_compra (usuario_id, nome_cartao, numero_cartao, data_validade, codigo_seguranca, plano) VALUES (?, ?, ?, ?, ?, ?)",
    [userId, card_name, card_number, card_expiry, card_cvv, plano],
    (err, results) => {
      if (err) {
        console.error(
          "Erro ao inserir detalhes da compra no banco de dados:",
          err
        );
        return res.status(500).send("Erro interno do servidor");
      }

      // Redirecionar o usuário
      res.redirect("/myrequests");
    }
  );
});

// Rota para lidar com /myrequests
router.get("/myrequests", (req, res) => {
  // Verificar se o usuário está autenticado
  if (!req.session.authenticated) {
    return res.status(401).send("Acesso não autorizado");
  }

  // Obter o ID do usuário da sessão
  const usuario_id = req.session.user.id;

  // Consultar o banco de dados para obter os dados necessários
  pool.query(
    "SELECT plano, data_transacao FROM tb_compra WHERE usuario_id = ?",
    [usuario_id],
    (err, results) => {
      if (err) {
        console.error("Erro ao consultar dados do usuário:", err);
        return res.status(500).send("Erro interno do servidor");
      }

      // Renderizar o template HTML com os dados obtidos
      const htmlTemplate = `
      <!DOCTYPE html>
      <html>
        <head>
          <!-- Basic -->
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!-- Mobile Metas -->
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <!-- Site Metas -->
          <link rel="icon" href="../images/logo_name.png" type="image/gif" />
          <meta name="keywords" content="" />
          <meta name="description" content="" />
          <meta name="author" content="" />
      
          <title>Polibot</title>
      
          <!-- bootstrap core css -->
          <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
      
          <!-- fonts style -->
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
      
          <!-- font awesome style -->
          <link href="../css/font-awesome.min.css" rel="stylesheet" />
      
          <!-- Custom styles for this template -->
          <link href="../css/style.css" rel="stylesheet" />
          <!-- responsive style -->
          <link href="../css/responsive.css" rel="stylesheet" />
        </head>
      
        <body class="sub_page">
          <div class="hero_area">
            <!-- header section strats -->
            <header class="header_section">
              <div class="container-fluid">
                <nav class="navbar navbar-expand-lg custom_nav-container">
                  <a class="navbar-brand" href="../html/index.html">
                    <span>
                      <img src="../images/logo_name.png" alt="Logo" />
                      Polibot</span
                    >
                  </a>
      
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class=""> </span>
                  </button>
      
                  <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <a class="nav-link" href="./index.html"
                          >Home <span class="sr-only">(current)</span></a
                        >
                      </li>
                      <li class="nav-item active">
                        <a class="nav-link" href="./about.html"> Sobre</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="./price.html">Preços</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="./suport.html">Suporte</a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </header>
          </div>
          <!-- end header section -->
      
          <!-- See Keys section -->
          <section class="selection_panel">
            <div class="selection_panel_container">
              <ul>
                <li><a href="./seeregistration.html">Ver Cadastro</a></li>
                <li><a href="./seekeys.html">Minhas Chaves</a></li>
                <li><a href="./myrequests.html">Meus Pedidos</a></li>
                <li><a href="./sale.html">Adquirir Plano</a></li>
              </ul>
            </div>
      
            <div class="purchase_container">
              <div class="purchase_heading_container">
                <h2>Meus Pedidos</h2>
                <br />
              </div>
              <div class="purchase_row">
                <div class="purchase_col-md-8 purchase_col-lg-6">
                  <div class="purchase_form_container">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Plano</th>
                          <th>Data da Transação</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${results
          .map(
            (row) => `
                        <tr>
                          <td>${row.plano}</td>
                          <td>${row.data_transacao}</td>
                        </tr>
                        `
          )
          .join("")}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- End See Keys section -->
          <!-- info section -->

          <section class="info_section layout_padding2">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <div class="info_contact">
                    <h4>Endereço</h4>
                    <div class="contact_link_box">
                      <!-- <a href=""> -->
                      <a>
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                        <span> São Paulo - SP </span>
                      </a>
                      <a>
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        <span> Telefone +55 (11) 90000-0000 </span>
                      </a>
                      <a>
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <span> Polibot@gmail.com </span>
                      </a>
                    </div>
                  </div>
                  <div class="info_social">
                    <a>
                      <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a>
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a>
                      <i class="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a>
                      <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
      
                <div class="col-md-3">
                  <div class="info_link_box">
                    <h4>Links</h4>
                    <div class="info_links">
                      <a class="active" href="./index.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Home
                      </a>
                      <a class="" href="./about.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Sobre
                      </a>
                      <a class="" href="./price.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Preços
                      </a>
                      <a class="" href="./login.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Login
                      </a>
                      <a class="" href="./suport.html">
                        <img src="../images/nav-bullet.png" alt="" />
                        Suporte
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          <!-- end info section -->
          <!-- footer section -->
          <footer class="footer_section">
            <div class="container">
              <p>
                &copy; <span id="displayYear"></span> Todos os direitos reservados por
                <a href="./index.html">Polibot </a>
              </p>
              <br />
            </div>
          </footer>
        </body>
      </html>      
      `;

      // Enviar o HTML como resposta
      res.send(htmlTemplate);
    }
  );
});

module.exports = router;
