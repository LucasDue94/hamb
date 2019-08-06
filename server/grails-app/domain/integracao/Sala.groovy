package integracao

class Sala implements Serializable {

    String codigo
    String unidade
    String nome

    static hasMany = [agendas: Agenda]

    static mapping = {
        id generator: 'assigned', composite: ['codigo', 'unidade']
        version false
    }
}
