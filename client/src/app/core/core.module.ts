import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsuarioService} from './usuario/usuario.service';
import {PacienteService} from './paciente/paciente.service';
import {RegistroAtendimentoService} from './registroAtendimento/registroAtendimento.service';
import {AuthService} from "./auth/auth.service";
import {AgendaService} from './agenda/agenda.service';
import {AtendimentoService} from './atendimento/atendimento.service';
import {CidService} from './cid/cid.service';
import {ConvenioService} from './convenio/convenio.service';
import {PacienteAgendadoService} from './pacienteAgendado/pacienteAgendado.service';
import {AlertService} from "./alert/alert.service";
import {ErrorService} from "./error/error.service";
import {PerfilService} from './perfil/perfil.service';
import {ForgotService} from './forgot/forgot.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    UsuarioService,
    PacienteService,
    RegistroAtendimentoService,
    AuthService,
    AgendaService,
    AtendimentoService,
    CidService,
    ConvenioService,
    PacienteAgendadoService,
    AlertService,
    ErrorService,
    PerfilService,
    ForgotService
]
})
export class CoreModule {}
