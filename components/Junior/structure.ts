import * as Yup from "yup";
import { pt } from 'yup-locale-pt';
import { cpfValidator } from "../../utils/cpfValidator";

Yup.setLocale(pt);

export const getValidationSchema = (hasSubareas, requiresDate) => {
  return Yup.object().shape({
    name: Yup.string()
      .min(3, "O campo Nome precisa ter no mínimo 3 caracteres.")
      .required("O campo Nome completo é obrigatório."),
    cpf: Yup.string()
    .matches(/^\d{11}$/, 'O CPF deve conter 11 dígitos numéricos.')
    .required("O campo CPF é obrigatório.")
    .test((value) => cpfValidator(value)),
    email: Yup.string()
      .email("E-mail inválido.")
      .required("O campo E-mail é obrigatório."),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email")], "O email deve ser o mesmo")
      .required("O campo Confirmar e-mail é obrigatório."),
    linkedin: Yup.string()
      .url("Link inválido.")
      .required("O campo Linkedin é obrigatório."),
    area: Yup.string()
      .required("* Escolha um opção por favor."),
    subarea: hasSubareas
      ? Yup.string().required("* Escolha uma subárea por favor.")
      : Yup.string().nullable(),
    availability: Yup.string()
      .required("Por favor assinale umas das opções pra prosseguir"),
    startDate: requiresDate
      ? Yup.date().required("Por favor, escolha uma data.")
      : Yup.date().nullable(),
    toolsKnowledge: Yup.string()
      .min(200, "O campo deve ter no mínimo 200 caracteres.")
      .max(500, "O campo deve ter no máximo 500 caracteres.")
      .required("O campo é obrigatório."),
    fieldKnowledge: Yup.string()
      .min(200, "O campo deve ter no mínimo 200 caracteres.")
      .max(500, "O campo deve ter no máximo 500 caracteres.")
      .required("O campo é obrigatório."),
    volunteerMotivation: Yup.string()
      .min(200, "O campo deve ter no mínimo 200 caracteres.")
      .max(500, "O campo deve ter no máximo 500 caracteres.")
      .required("O campo é obrigatório."),
    otherExperiences: Yup.string()
      .max(500, "O campo deve ter no máximo 500 caracteres."),
    contactAgreement: Yup.boolean().oneOf([true], "Você deve marcar esta opção."),
    volunteeringAgreement: Yup.boolean().oneOf([true], "Você deve marcar esta opção."),
    termsAgreement: Yup.boolean().oneOf([true], "Você deve marcar esta opção."),
  });
};

export const initialValues = {
  name: "",
  cpf: "",
  email: "",
  confirmEmail: "",
  linkedin: "",
  area: "",
  subarea: "",
  availability: "Até 5 horas semanais",
  turn: "turno-disponivel",
  startOption: "Imediato", 
  toolsKnowledge: "",
  fieldKnowledge: "",
  volunteerMotivation: "",
  otherExperiences: "",
  contactAgreement: false,
  volunteeringAgreement: false,
  termsAgreement: false
}