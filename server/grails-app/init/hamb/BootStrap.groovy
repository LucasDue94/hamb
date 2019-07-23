package hamb

class BootStrap {

    def init = { servletContext ->
        Perfil.criarPerfis()
    }

    def destroy = {
    }
}
