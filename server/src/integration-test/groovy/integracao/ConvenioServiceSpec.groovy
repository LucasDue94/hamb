package integracao

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ConvenioServiceSpec extends Specification {

    ConvenioService convenioService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Convenio(...).save(flush: true, failOnError: true)
        //new Convenio(...).save(flush: true, failOnError: true)
        //Convenio convenio = new Convenio(...).save(flush: true, failOnError: true)
        //new Convenio(...).save(flush: true, failOnError: true)
        //new Convenio(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //convenio.id
    }

    void "test get"() {
        setupData()

        expect:
        convenioService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Convenio> convenioList = convenioService.list(max: 2, offset: 2)

        then:
        convenioList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        convenioService.count() == 5
    }

    void "test delete"() {
        Long convenioId = setupData()

        expect:
        convenioService.count() == 5

        when:
        convenioService.delete(convenioId)
        sessionFactory.currentSession.flush()

        then:
        convenioService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Convenio convenio = new Convenio()
        convenioService.save(convenio)

        then:
        convenio.id != null
    }
}
