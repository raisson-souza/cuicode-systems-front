import React from "react"
import FindValue from "../../functions/FindValue"
import IsNil from "../../functions/IsNil"
import FormField from "./FormField"

type FormBuilderProps = {
    data : any[],
    formId : string,
    formSubmitButtonMsg : string,
}

export default class FormBuilder
{
    /** Lista de campos de um form. */
    Fields : FormField[]
    /** Lista de ID e nome dos campos.  */
    FieldsNames : FieldName[]
    /** ID do botão de submit do form. */
    FormId : string
    /** Mensagem no botão de submit */
    FormSubmitButtonMsg : string

    constructor({
        data,
        formId,
        formSubmitButtonMsg = "Enviar",
    } : FormBuilderProps) {
        this.FormId = formId
        this.FormSubmitButtonMsg = formSubmitButtonMsg

        this.Fields = []
        this.FieldsNames = []

        data.forEach(_field => {
            const field = new FormField(_field)
            this.FieldsNames.push({
                FieldId: field.FieldId,
                FieldName: field.Name
            })
            this.Fields.push(field)
        })
    }

    BuildForm(fetchApi : (body : FormFieldsValues[]) => void) {
        /** Função que habilita / desabilita um node. */
        const disableInputAction = (id : string, action : boolean = true) => {
            const node = document.getElementById(id) as any
            node.disabled = action
        }

        /** Recebe a função a ser executada após o submit. */
        const submitForm = async (event : React.FormEvent) => {
            event.preventDefault()
            disableInputAction(this.FormId)

            // Armazena os campos puros do NODE.
            const fields = (event.target as any).elements as HTMLFormControlsCollection[]

            // Armazena apenas a filtragem nomeadas dos inputs.
            const formFieldsValues : FormFieldsValues[] = []

            this.FieldsNames.forEach(fieldName => {
                const foundField = FindValue(fields, [fieldName.FieldName])
                const formFieldValue = {
                    Id: fieldName.FieldId,
                    Value: foundField.value,
                } as FormFieldsValues

                if (!IsNil(foundField))
                    formFieldsValues.push(formFieldValue)
            })

            // Desabilita todos os campos, chama a função de submit e depois habilita novamente.
            formFieldsValues.forEach(_formFieldValue => {
                disableInputAction(_formFieldValue.Id)
            })

            await fetchApi(formFieldsValues)

            formFieldsValues.forEach(_formFieldValue => {
                disableInputAction(_formFieldValue.Id, false)
            })

            disableInputAction(this.FormId, false)
        }

        return (
            <form
                onSubmit={ submitForm }
                id={ this.FormId }
            >
                {
                    this.Fields!.map(field => {
                        return field.BuildField()
                    })
                }
                <input
                    type="submit"
                    value={ this.FormSubmitButtonMsg }
                    id={ `${ this.FormId }_submit` }
                />
            </form>
        )
    }
}

type FormFieldsValues = {
    Id : string,
    Value : any,
}

type FieldName = {
    FieldId : string
    FieldName : string
}

export type { FormFieldsValues }