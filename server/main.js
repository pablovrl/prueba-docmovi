import { Meteor } from 'meteor/meteor';
import {PacientesCollection} from '../imports/api/PacientesCollection'

const insertPaciente = paciente => PacientesCollection.insert({
  nombre: paciente.nombre,
  apellidoPaterno: paciente.apellidoPaterno,
  apellidoMaterno: paciente.apellidoMaterno,
  rut: paciente.rut,
  region: paciente.region,
  comuna: paciente.comuna
})

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (PacientesCollection.find().count() === 0) {
    insertPaciente({
      nombre: "Pablo",
      apellidoPaterno: "Villarroel",
      apellidoMaterno: "Antillanca",
      rut: "20.487.087-K",
      region: "Región del Bíobio",
      comuna: "Concepción"
    })
  }
});
