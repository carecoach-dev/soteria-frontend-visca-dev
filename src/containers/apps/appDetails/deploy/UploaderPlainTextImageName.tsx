import { ISoteriaDefinition } from '../../../../models/ISoteriaDefinition'
import UploaderPlainTextBase from './UploaderPlainTextBase'

export default class UploaderPlainTextImageName extends UploaderPlainTextBase {
    protected getPlaceHolderValue() {
        return `nginxdemos/hello:latest`
    }

    protected isSingleLine() {
        return true
    }

    protected convertDataToSoteriaDefinition(userEnteredValue: string) {
        const capDefinition: ISoteriaDefinition = {
            schemaVersion: 2,
            imageName: userEnteredValue.trim(),
        }

        return JSON.stringify(capDefinition)
    }
}
