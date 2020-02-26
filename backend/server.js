const express = require("express")
const server = express()

//configurar o servidor para mostrar arquivos extras
server.use(express.static('../frontend/assets/'))

// Habilitar o corpo do formuláro
server.use(express.urlencoded({ extended: true }))

//Configurar configuração com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'Dol19sk8@',
    host: 'localhost',
    port: 5432,
    database: 'doesangue'
})

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("../frontend/", {
    express: server,
    noCache: true,
})

// Configurando página inicial
server.get("/", function( req, res){
    
    db.query("SELECT * FROM doadores ORDER BY id DESC", function(err, result){
        // Se der erro, mostre isso
        if(err) return res.send("Erro ao buscar os doadores cadastrados")

        // se não der erro, ok
        const doadores = result.rows
        // Manda pra página
        return res.render("./index.html", { doadores })
    })
})

server.post("/", function(req, res){
    //Pegar os dados do formulário
    const nome = req.body.nome
    const email = req.body.email
    const telefone = req.body.telefone
    const tipo = req.body.tipo

    if(nome == "" || email == "" || telefone == "" || tipo == ""){

        return res.send("Todos os campos são obrigatórios.")

    }        //Colocar valores dentro do banco de dados
        const query = `INSERT INTO doadores ("nome", "email", "telefone", "tipo") 
        VALUES ($1, $2, $3, $4)`

        const values = [nome, email, telefone, tipo]

        db.query(query, values, function(err){
            // Se der erro
            if(err) return res.send("Erro no banco de dados.")

            //Se tudo der certo
            return res.redirect("/")
        })
})

//Ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("Servidor Iniciado.")
})