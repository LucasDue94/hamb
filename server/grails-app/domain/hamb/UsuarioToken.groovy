package hamb

class UsuarioToken {

    String login
    String valor

    Date ultimoAcesso = new Date()

    static mapping = {
        version false
    }

    def afterLoad() {
        Date agora = new Date()
        if (ultimoAcesso.time < agora.time - 1) {
            ultimoAcesso = agora
            save flush: true
        }
    }
}
