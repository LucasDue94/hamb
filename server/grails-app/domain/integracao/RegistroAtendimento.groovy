package integracao
import hamb.Origem

class RegistroAtendimento {

    String id
    Origem origem
    Convenio convenio
    Paciente paciente

    static mapping = {
        id generator: 'assigned'
        version false
        origem enumType: 'identity'
        convenio nullable: false, blank: false
        paciente nullable: false, blank: false
    }
}
