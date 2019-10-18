package hamb

import org.apache.commons.codec.digest.DigestUtils

class Forgot {

    Usuario usuario
    String token
    Date dateCreated
    Date validade
    Boolean senhaAlterada = false

    static constraints = {
        token nullable: true, blank: false, unique: true
        senhaAlterada nullable: true, blank: false
        validade nullable: true, blank: false
    }

    def beforeValidate() {
        final now = new Date()
        final UMA_HORA = 3600000l
        this.validade = new Date(now.time + UMA_HORA)


        this.token = DigestUtils.sha1Hex(this.validade.time.toString() + this.usuarioId.toString())
    }
}
