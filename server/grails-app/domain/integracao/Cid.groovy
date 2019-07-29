package integracao

class Cid {
    String id
    String diagnostico

    static constraints = {
        diagnostico nullable: false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
