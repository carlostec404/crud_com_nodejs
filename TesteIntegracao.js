function validarUsuario(usuario) {
    if (!usuario.name || !usuario.email || !usuario.password || !usuario._id) {
        throw new Error("Todos os campos são obrigatórios.");
    }
    if (usuario.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
    if (!usuario.email.includes("@")) {
        throw new Error("Email inválido.");
    }
    return "Usu\u00E1rio ".concat(usuario.name, " validado com sucesso!");
}
var usuarios = [
    {
        name: "Carlos Alberto",
        email: "carlos.dev404@gmail.com",
        password: "123456",
        _id: "JAHirnmCcs2JLzw7"
    },
    {
        name: "Teste",
        email: "teste@teste",
        password: "123487",
        _id: "NaIS1aGgXmYijHVZ"
    }
];
function gerarRelatorioUsuarios(usuarios) {
    var usuariosValidos = [];
    usuarios.forEach(function (usuario) {
        try {
            var mensagem = validarUsuario(usuario);
            console.log(mensagem);
            usuariosValidos.push(usuario);
        }
        catch (erro) {
            console.warn("Erro ao validar usu\u00E1rio ".concat(usuario.name, ": ").concat(erro.message));
        }
    });
    console.log("\nRelatório de Usuários Válidos:");
    usuariosValidos.forEach(function (usuario) {
        console.log("- Nome: ".concat(usuario.name, ", Email: ").concat(usuario.email, ", ID: ").concat(usuario._id));
    });
}
gerarRelatorioUsuarios(usuarios);
