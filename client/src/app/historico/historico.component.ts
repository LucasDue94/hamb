import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {logger} from "codelyzer/util/logger";

@Component({
  selector: 'historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  paciente = [
    {
      id: 1, nome: 'Flávio dos Santos',
      historico: [
        {
          id: 1,
          laudo: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\n" +
            "        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make\n" +
            "        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,\n" +
            "        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing\n" +
            "        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions\n" +
            "        of Lorem Ipsum.\n" +
            "        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\n" +
            "        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make\n" +
            "        a type ,specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
          data: '01/07/2019',
          hora: '10:45',
          cid: 'Cefaléia',
          medico: 'Márcio Fernando Costa Medeiros',
          crm: 5331
        },
        {
          id: 2,
          laudo: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\n" +
            "        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make\n" +
            "        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,\n" +
            "        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing\n" +
            "        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions\n" +
            "        of Lorem Ipsum.\n" +
            "        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's\n" +
            "        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make\n" +
            "        a type ,specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.",
          data: '01/07/2019',
          hora: '10:45',
          cid: 'Cefaléia',
          medico: 'Márcio Fernando Costa Medeiros',
          crm: 5331
        }
      ],
    }
  ];

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }


  public toogle(e) {
    document.addEventListener("click", (evt) => {
      const combobox = e.target;
      const comboboxInfo = e.target.nextElementSibling;
      let targetElement = evt.target;

      do {
        if (targetElement == combobox) {
          this.render.setStyle(comboboxInfo, 'display', 'block');
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      this.render.setStyle(comboboxInfo, 'display', 'none');
    });

  }


}
