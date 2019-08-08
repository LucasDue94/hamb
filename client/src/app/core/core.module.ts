import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UsuarioService} from './usuario/usuario.service';
import {PacienteService} from './paciente/paciente.service';
import {RegistroAtendimentoService} from './registroAtendimento/registroAtendimento.service';
import {AuthService} from "./auth/auth.service";
import { AgendaService } from './agenda/agenda.service';
import { SalaService } from './sala/sala.service';

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
    SalaService,
]
})
export class CoreModule {
}
