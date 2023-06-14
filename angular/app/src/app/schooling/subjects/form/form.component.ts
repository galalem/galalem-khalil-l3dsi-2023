import { Component, ViewChild } from '@angular/core';
import { AlertDialog, DataTableConfig, Student, Teacher } from 'ngx-core';
import { DataTableDialogComponent, dataTableColumnsFromDefault } from 'ngx-core';
import { PageComponent } from 'src/app/template/page/page.component';

@Component({
  selector: 'subject-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends PageComponent<any> {

  @ViewChild('sessionDialog') sessionDialog: AlertDialog;

  entity = {
    id: 0,
    label: "",
    color: "#ffffff",
    teacher: new Teacher,
    shared: true,
    students: [] as Student[],
    sessions: [] as any[]
  };
  teachers: Teacher[] = [];
  students: any[] = [];
  id: number = 0;
  classname: string = "";
  dataTableConfig: any;
  session = {
    id: 0,
    day: 0,
    start: "08:00",
    end: "09:00",
    place: "",
    group: null as null | number,
    fortnight: null as null | boolean
  };

  override ngOnInit(): void {

    this.service.setUsesContext(null);
    this.id = parseInt(this.getRouteParam('id'));
    this.dataTableConfig = this.getDataTableConfig();
    this.init('schooling/classes', 'schooling/classes/' + this.id + '/subjects', 'subject-list');
    this.default().read(this.id, (response) => {
      this.students = response.students.map((student: any) => { return { ...student } });
      this.http.resource("human-resources/teachers");
      this.http.browse().subscribe((response: Teacher[]) => this.teachers = response);
      this.http.resource("human-resources/students/export?ids=" + response.students.map((s: any) => s.id).join(','));
      this.http.browse().subscribe((response: any[]) => this.students = response);
    });
    super.ngOnInit();
  }

  showTeachersDialog() {
    this.dialog.open(DataTableDialogComponent, {
      data: {
        data: this.teachers,
        title: "Séléctionner l'Enseignant",
        columns: dataTableColumnsFromDefault({
          ref: "",
          label: "",
          visible: true,
          sortable: true,
          filter: {
            datatype: "string"
          }
        },
          [
            {
              ref: "id",
              label: "No.",
              filter: { datatype: "number" }
            },
            {
              ref: "code",
              label: "Code",
              visible: false
            },
            {
              ref: "firstName",
              label: "Prénom",
            },
            {
              ref: "lastName",
              label: "Nom"
            },
            {
              ref: "active",
              label: "Activé",
              visible: false,
              sortable: false,
              display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
              filter: { datatype: "boolean", init: true, checkbox: { labelOn: "activé", labelOff: "désactivé", labelIn: "ignoré" } }
            },
            {
              ref: "archived",
              label: "Archivé",
              visible: false,
              sortable: false,
              display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
              filter: { datatype: "boolean", init: false, checkbox: { labelOn: "archivé", labelOff: "désarchivé", labelIn: "ignoré" } },
            }
          ]),

        multipleSelection: false,
        pagination: true,

        onSelect: (value: any[]) => {
          Teacher.copy(value.length == 1 ? value[0] : new Teacher, this.entity.teacher); console.log(value);
        },
        preSelected: (item: any) => this.entity.teacher?.id === item.id
      }
    });
  }

  showStudentsDialog() {
    this.dialog.open(DataTableDialogComponent, {
      data: {
        data: this.students.filter(s => !this.entity.students.some(student => student.id == s.id)),
        title: "Ajouter des élèves",
        columns: dataTableColumnsFromDefault({
          ref: "",
          label: "",
          visible: true,
          sortable: true,
          filter: {
            datatype: "string"
          }
        },
          [
            {
              ref: "id",
              label: "No.",
              filter: { datatype: "number" }
            },
            {
              ref: "code",
              label: "Code",
              visible: false
            },
            {
              ref: "firstName",
              label: "Prénom",
            },
            {
              ref: "lastName",
              label: "Nom"
            },
            {
              ref: "active",
              label: "Activé",
              visible: false,
              sortable: false,
              display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
              filter: { datatype: "boolean", init: true, checkbox: { labelOn: "activé", labelOff: "désactivé", labelIn: "ignoré" } }
            },
            {
              ref: "archived",
              label: "Archivé",
              visible: false,
              sortable: false,
              display: function (value: boolean) { return `<span class="badge badge-pill bg-${value ? 'success' : 'danger'} text-md font-weight-normal">${value ? 'oui' : 'non'}</span>` },
              filter: { datatype: "boolean", init: false, checkbox: { labelOn: "archivé", labelOff: "désarchivé", labelIn: "ignoré" } },
            }
          ]),

        multipleSelection: true,
        pagination: true,

        onSelect: (value: any[]) => this.entity.students.push(...value)
      }
    });
  }
  showCreateSessionDialog() {
    this.sessionDialog.show();
  }
  createSession(s: any) {
    this.entity.sessions = [{ ...s, id: this.entity.sessions.length + 1 }, ...this.entity.sessions.filter(ss => s.id != ss.id)]
    this.session = {
      id: 0,
      day: 0,
      start: "08:00",
      end: "09:00",
      place: "",
      group: null as null | number,
      fortnight: null as null | boolean
    }
  }

  pluckStudent(id: number) {
    this.entity.students = this.entity.students.filter(s => s.id != id);
  }


  submit() {
    let formData = new FormData;
    formData.append('label', this.entity.label)
    formData.append('color', this.entity.color)
    formData.append('teacherId', this.entity.teacher.id + '')
    formData.append('classId', this.id + '')
    formData.append('shared', this.entity.shared ? '1' : '0')
    this.entity.students.forEach((s) => formData.append('students', '' + s.id))
    this.entity.sessions.forEach((s, i) => {
      let day = s.day * 1440; // 60 * 24
      let [startH, startM] = s.start.split(':');
      let [endH, endM] = s.end.split(':');
      formData.append('sessions[' + i + '].start', '' + ((parseInt(startH) * 60) + parseInt(startM) + day))
      formData.append('sessions[' + i + '].end', '' + ((parseInt(endH) * 60) + parseInt(endM) + day))
      formData.append('sessions[' + i + '].place', s.place)
      if (s.group !== null) formData.append('sessions[' + i + '].group', s.group)
      if (s.fortnight !== null) formData.append('sessions[' + i + '].fortnight', s.fortnight ? '1' : '0')
    })

    this.resource('schooling/subjects')
    if (this.entity.id)
      this.default().edit(this.entity.id, formData);
    else
      this.default().add(formData)
  }

  getDataTableConfig() {
    return {
      title: "Séances",
      columns: [
        {
          ref: "day",
          label: "Jour",
          visible: true,
          sortable: true,
          display: function (value: number) { return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'][value] },
        },
        {
          ref: "start",
          label: "De",
          visible: true,
          sortable: true,
        },
        {
          ref: "end",
          label: "À",
          visible: true,
          sortable: true,
        },
        {
          ref: "place",
          label: "Salle",
          visible: true,
          sortable: true,
        },
        {
          ref: "group",
          label: "Par Groupe",
          visible: true,
          sortable: false,
          display: function (value: number | null) { return `<span class="badge badge-pill bg-${value ? 'primary' : 'danger'} text-md font-weight-normal">${value === null ? 'non' : 'Groupe ' + value}</span>` },
        },
        {
          ref: "fortnight",
          label: "Par Quinzaine",
          visible: true,
          sortable: false,
          display: function (value: boolean | null) { return `<span class="badge badge-pill bg-${value !== null ? 'success' : 'danger'} text-md font-weight-normal">${value === null ? 'non' : 'Semaine ' + (value ? 'A' : 'B')}</span>` },
        },
      ],
      selection: true,
      pagination: true,
      actions: {
        enabled: true,
        add: {
          enabled: true,
          onClick: () => this.showCreateSessionDialog()
        },
        delete: { enabled: false },
        import: { enabled: false },
        export: { enabled: false },
        actions: (item: any) => [
          {
            label: "Modifier",
            icon: "pen-to-square",
            iconTheme: "warning",
            onClick: () => {
              this.session = item;
              this.showCreateSessionDialog();
            }
          },
          {
            divider: true
          },
          {
            label: "Supprimer",
            icon: "trash",
            theme: "danger",
            onClick: () => this.entity.sessions = this.entity.sessions.filter(s => s.id != item.id)
          }
        ],
      }
    };
  }
}
