package hamb

class Forgot {

    Usuario usuario
    String token
    Date validade
    Boolean senhaAlterada

    static constraints = {
        token nullable: true, blank: false
        senhaAlterada nullable: true, blank: false
        validade nullable: true, blank: false
    }

    def beforeValidate() {
        final now = new Date()
        final UMA_HORA = 3600000l
        this.validade = new Date(now.time + UMA_HORA)
    }
}
