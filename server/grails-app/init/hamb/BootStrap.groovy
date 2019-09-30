package hamb

import org.springframework.beans.factory.annotation.Autowired

class BootStrap {

    @Autowired
    UsuarioService usuarioService

    def init = { servletContext ->
        Perfil.criarPerfis()
        usuarioService.gerarSenhasPadrao()
    }

    def destroy = {
    }
}
