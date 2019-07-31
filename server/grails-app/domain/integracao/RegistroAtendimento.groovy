package integracao

class RegistroAtendimento {

    String id
    String origem
    Convenio convenio
    Paciente paciente

    static mapping = {
        id generator: 'assigned'
        version false
    }
}
