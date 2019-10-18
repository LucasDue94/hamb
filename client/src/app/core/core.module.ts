import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsuarioService} from './usuario/usuario.service';
import {PacienteService} from './paciente/paciente.service';
import {RegistroAtendimentoService} from './registroAtendimento/registroAtendimento.service';
import {AuthService} from "./auth/auth.service";
import {AgendaService} from './agenda/agenda.service';
import {SalaService} from './sala/sala.service';
import {AtendimentoService} from './atendimento/atendimento.service';
import {CidService} from './cid/cid.service';
import {ConvenioService} from './convenio/convenio.service';
import {PacienteAgendadoService} from './pacienteAgendado/pacienteAgendado.service';
import {RedefineSenhaService} from "./redefineSenha/redefine-senha.service";

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
    RedefineSenhaService,
    AuthService,
    AgendaService,
    SalaService,
    AtendimentoService,
    CidService,
    ConvenioService,
    PacienteAgendadoService
]
})
export class CoreModule {}
