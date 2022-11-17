export enum formActionKind {
  ADDTEXT,
  CLEAR
}

interface InputAction {
  type: formActionKind
  payload: string
  field: string
}

interface IFormObject {
  firstname: string
  lastname: string
  street: string
  city: string
  zipcode: string
}
function formReducer (state: IFormObject, action: InputAction): IFormObject {
  const { type, field, payload } = action

  switch (type) {
    case formActionKind.ADDTEXT:
      return {
        ...state,
        [field]: payload
      }
    case formActionKind.CLEAR:
      return {
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zipcode: ''
      }
    default: return state
  }
}

export default formReducer
