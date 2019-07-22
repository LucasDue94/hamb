package hamb

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class AtendimentoServiceSpec extends Specification {

    AtendimentoService atendimentoService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Atendimento(...).save(flush: true, failOnError: true)
        //new Atendimento(...).save(flush: true, failOnError: true)
        //Atendimento atendimento = new Atendimento(...).save(flush: true, failOnError: true)
        //new Atendimento(...).save(flush: true, failOnError: true)
        //new Atendimento(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //atendimento.id
    }

    void "test get"() {
        setupData()

        expect:
        atendimentoService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Atendimento> atendimentoList = atendimentoService.list(max: 2, offset: 2)

        then:
        atendimentoList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        atendimentoService.count() == 5
    }

    void "test delete"() {
        Long atendimentoId = setupData()

        expect:
        atendimentoService.count() == 5

        when:
        atendimentoService.delete(atendimentoId)
        sessionFactory.currentSession.flush()

        then:
        atendimentoService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Atendimento atendimento = new Atendimento()
        atendimentoService.save(atendimento)

        then:
        atendimento.id != null
    }
}
