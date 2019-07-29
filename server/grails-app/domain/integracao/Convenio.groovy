package integracao

class Convenio {
    String id
    String fantasia

    static constraints = {
        fantasia nullable:  false, blank: false
    }

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
