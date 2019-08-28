package integracao

import hamb.Atendimento
import hamb.Origem

class RegistroAtendimento {

    String id
    Origem origem
    Convenio convenio
    Paciente paciente

    static hasMany = [atendimentos: Atendimento]

    static mapping = {
        id generator: 'assigned'
        version false
        origem enumType: 'identity'
        convenio nullable: false, blank: false
        paciente nullable: false, blank: false
    }
}
