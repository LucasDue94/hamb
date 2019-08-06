package integracao

import hamb.UsuarioCid

class Cid {
    String id
    String diagnostico

    static hasMany = [usuarios: UsuarioCid]

    static constraints = {
        diagnostico nullable: false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
