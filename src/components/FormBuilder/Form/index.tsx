import { useEffect, useState } from "react"
import FormField from "../FormField/FormFieldBuilder"
import { Box, Button, Skeleton, Snackbar } from "@mui/material"
import FindValue from "../../../functions/FindValue"
import IsNil from "../../../functions/IsNil"

type FormBuilderProps = {
    Data : any
    FormId : string
    AfterSubmitFunc? : Function
    FormSubmitButtonMsg? : string
}

type FormFieldBasic = {
    Id : string
    Value : any
    Name : string
    Type : string
    OptionsLen? : number
    MaxLen : number
}

export type { FormFieldBasic }

type SnackbarModel = {
    Msg : string
}

type FieldsControlsProps = {
    fields : FormField[]
    fieldsControls : FormFieldBasic[]
}

export default function FormBuilder({
    Data,
    FormId,
    AfterSubmitFunc = () => {},
    FormSubmitButtonMsg = "Enviar"
} : FormBuilderProps) {
    const [ disabled, setDisabled ] = useState<boolean>(false)
    const [ snackbars, setSnackbars ] = useState<SnackbarModel[]>([])
    const [ fields, setFields ] = useState<FieldsControlsProps>({
        fields: [],
        fieldsControls: []
    })
    const loading = fields.fields.length === 0 || IsNil(Data)

    useEffect(() => {
        if (IsNil(Data))
            return

        const fields : FormField[] = []
        const formFieldsBasic : FormFieldBasic[] = []

        Data.forEach((_field: any) => {
            const field = new FormField({
                Data: _field,
            })

            fields.push(field)
            formFieldsBasic.push({
                Id: field.Id,
                Name: field.Name,
                Type: field.Type,
                Value: undefined,
                OptionsLen: field.Options.length,
                MaxLen: field.MaxLen,
            })
        })

        setFields({
            fields: fields,
            fieldsControls: formFieldsBasic
        })
    }, [Data])

    const snackbarsNodes = () => { // TODO testar
        if (snackbars.length === 0)
            return null

        return snackbars.map(snackbar => {
            return <Snackbar message={ snackbar.Msg } autoHideDuration={ 6000 }/>
        })
    }

    function ValidateForm() {
        const messages : SnackbarModel[] = []
        fields.fieldsControls.forEach(fieldName => {
            if (String(fieldName.Value).length > fieldName.MaxLen) {
                messages.push({
                    Msg: `O campo ${ fieldName.Name } ultrapassou o limite de ${ fieldName.MaxLen } caracteres.`
                })
            }
        })

        return {
            "ok": messages.length === 0,
            "messages": messages
        }
    }

    /** Captura o valor do controle */
    function DefineFieldNameSubmitValue(type : string, field : any) {
        switch (type) {
            case "checkbox":
            case "switch":
                return field.checked
            case "radio":
                return field.checked
                    ? field.value
                    : undefined
            default:
                return field.value
        }
    }

    /** Recebe a função a ser executada após o submit. */
    const submitForm = async (event : React.FormEvent) => {
        event.preventDefault()
        setDisabled(true)

        // Armazena os campos puros do NODE.
        const fieldsNodes = (event.target as any).elements as HTMLFormControlsCollection[]

        const newFieldsNames : FormFieldBasic[] = []

        fields.fieldsControls.forEach((fieldName, i) => {
            let value : any = undefined

            switch (fieldName.Type) {
                case "radio":
                    const radioFieldsControls : FormFieldBasic[] = []

                    // O "radio" não possui obj padrão no return do form event
                    // necessita buscar individualmente seus controles
                    // exemplo; Name_0 Name_1
                    for (let i = 0; i < fieldName.OptionsLen!; i++) {
                        const name = `${ fieldName.Name }_${ i }`

                        const foundField = FindValue(fieldsNodes, [name])

                        // Caso o valor do radio encontrado NÃO esteja marcado, seu valor será undefined
                        value = DefineFieldNameSubmitValue(fieldName.Type, foundField)

                        radioFieldsControls.push({
                            ...fieldName,
                            Name: name,
                            Value: value
                        })
                    }

                    // Apenas o radio marcado possui valor, por isso, apenas este é extraido
                    const radioFieldValue = radioFieldsControls
                        .filter(radioFieldControl => !IsNil(radioFieldControl.Value) )
                        .map(radioFieldControlFiltered => { return radioFieldControlFiltered.Value} )[0]

                    value = radioFieldValue
                    break
                default:
                    const foundField = FindValue(fieldsNodes, [fieldName.Name])
                    value = DefineFieldNameSubmitValue(fieldName.Type, foundField)
                    break
            }

            newFieldsNames.push({
                Id: fieldName.Id,
                MaxLen: fieldName.MaxLen,
                Name: fieldName.Name,
                Type: fieldName.Type,
                Value: value,
                OptionsLen: fieldName.OptionsLen
            })
        })

        const { messages, ok } = ValidateForm()

        if (!ok) {
            setDisabled(false)
            setSnackbars(messages)
            return
        }

        setFields({
            fields: fields.fields,
            fieldsControls: newFieldsNames
        })

        await AfterSubmitFunc(newFieldsNames)

        setDisabled(false)
    }

    if (loading) { // FIXME não funciona
        return (
            <Box>
                <Skeleton variant="text" />
                <Skeleton variant="rectangular" />
                <Skeleton variant="rounded" />
            </Box>
        )
    }

    return (
        <>
            { snackbarsNodes() }
            <form
                onSubmit={ submitForm }
                id={ FormId }
            >
                {
                    fields.fields.map(field => {
                        return field.BuildField(disabled)
                    })
                }
                <Button
                    variant="contained"
                    color="success"
                    id={ `${ FormId }_submit` }
                    type="submit"
                    disabled={ disabled }
                >
                    { FormSubmitButtonMsg }
                </Button>
            </form>
        </>
    )
}