import UploaderPlainTextBase from './UploaderPlainTextBase'

export default class UploaderPlainTextSoteriaDefinition extends UploaderPlainTextBase {
    protected getPlaceHolderValue() {
        return `{
    "schemaVersion" :2 ,
    "imageName" : "mysql:5.7
}`
    }

    protected convertDataToSoteriaDefinition(userEnteredValue: string) {
        return userEnteredValue.trim()
    }
}
